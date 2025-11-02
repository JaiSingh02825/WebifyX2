import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type { Course, Lesson, UserProgress, QuizAttempt, Exercise } from '@/types'

interface CoursesState {
  // Data
  courses: Course[]
  currentCourse: Course | null
  currentLesson: Lesson | null
  userProgress: UserProgress[]
  quizAttempts: QuizAttempt[]

  // UI State
  isLoading: boolean
  error: string | null
  searchQuery: string
  selectedDifficulty: string[]
  selectedTags: string[]

  // Editor state
  exerciseCode: Record<string, string>
  editorOutput: Record<string, string>
  isRunningExercise: boolean
}

interface CoursesStore extends CoursesState {
  // Course actions
  fetchCourses: () => Promise<void>
  fetchCourse: (slug: string) => Promise<void>
  enrollInCourse: (courseId: string) => Promise<void>

  // Lesson actions
  setCurrentLesson: (lesson: Lesson | null) => void
  completeLesson: (lessonId: string) => Promise<void>
  updateProgress: (courseId: string, lessonId: string, progress: Partial<UserProgress>) => Promise<void>

  // Quiz actions
  submitQuiz: (quizId: string, answers: Record<string, string | number>, timeSpent: number) => Promise<QuizAttempt>
  getQuizAttempts: (quizId: string) => Promise<void>

  // Exercise actions
  setExerciseCode: (exerciseId: string, code: string) => void
  runExercise: (exercise: Exercise) => Promise<void>
  resetExercise: (exerciseId: string) => void

  // Filter actions
  setSearchQuery: (query: string) => void
  setSelectedDifficulty: (difficulties: string[]) => void
  setSelectedTags: (tags: string[]) => void

  // Utility actions
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

export const useCoursesStore = create<CoursesStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    courses: [],
    currentCourse: null,
    currentLesson: null,
    userProgress: [],
    quizAttempts: [],
    isLoading: false,
    error: null,
    searchQuery: '',
    selectedDifficulty: [],
    selectedTags: [],
    exerciseCode: {},
    editorOutput: {},
    isRunningExercise: false,

    // Course actions
    fetchCourses: async () => {
      const { setLoading, setError } = get()

      setLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/courses')

        if (!response.ok) {
          throw new Error('Failed to fetch courses')
        }

        const courses = await response.json()
        set({ courses })
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    },

    fetchCourse: async (slug) => {
      const { setLoading, setError } = get()

      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/courses/${slug}`)

        if (!response.ok) {
          throw new Error('Failed to fetch course')
        }

        const course = await response.json()
        set({ currentCourse: course })

        // Load user progress for this course
        await get().loadUserProgress(course.id)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    },

    enrollInCourse: async (courseId) => {
      try {
        const response = await fetch(`/api/courses/${courseId}/enroll`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        })

        if (!response.ok) {
          throw new Error('Failed to enroll in course')
        }

        // Refresh course data
        const { currentCourse } = get()
        if (currentCourse) {
          await get().fetchCourse(currentCourse.slug)
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to enroll')
      }
    },

    // Lesson actions
    setCurrentLesson: (lesson) => {
      set({ currentLesson: lesson })
    },

    completeLesson: async (lessonId) => {
      const { currentCourse } = get()

      if (!currentCourse) return

      try {
        const response = await fetch('/api/progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            courseId: currentCourse.id,
            lessonId,
            status: 'completed',
            completionDate: new Date().toISOString()
          })
        })

        if (!response.ok) {
          throw new Error('Failed to mark lesson as complete')
        }

        await get().loadUserProgress(currentCourse.id)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to complete lesson')
      }
    },

    updateProgress: async (courseId, lessonId, progress) => {
      try {
        const response = await fetch('/api/progress', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            courseId,
            lessonId,
            ...progress
          })
        })

        if (!response.ok) {
          throw new Error('Failed to update progress')
        }

        await get().loadUserProgress(courseId)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to update progress')
      }
    },

    // Quiz actions
    submitQuiz: async (quizId, answers, timeSpent) => {
      try {
        const response = await fetch('/api/quizzes/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quizId,
            answers: Object.entries(answers).map(([questionId, answer]) => ({
              questionId,
              answer
            })),
            timeSpent
          })
        })

        if (!response.ok) {
          throw new Error('Failed to submit quiz')
        }

        const attempt = await response.json()

        // Update quiz attempts
        const { quizAttempts } = get()
        set({ quizAttempts: [attempt, ...quizAttempts] })

        return attempt
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to submit quiz')
        throw error
      }
    },

    getQuizAttempts: async (quizId) => {
      try {
        const response = await fetch(`/api/quizzes/${quizId}/attempts`)

        if (!response.ok) {
          throw new Error('Failed to fetch quiz attempts')
        }

        const attempts = await response.json()
        set({ quizAttempts: attempts })
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch attempts')
      }
    },

    // Exercise actions
    setExerciseCode: (exerciseId, code) => {
      const { exerciseCode } = get()
      set({
        exerciseCode: {
          ...exerciseCode,
          [exerciseId]: code
        }
      })
    },

    runExercise: async (exercise) => {
      const { exerciseCode, setExerciseCode } = get()

      set({ isRunningExercise: true })

      try {
        const code = exerciseCode[exercise.id] || exercise.startingCode.code

        // Create a sandboxed execution environment
        const result = await get().executeCode(code, exercise.startingCode.language)

        set({
          editorOutput: {
            ...get().editorOutput,
            [exercise.id]: result
          }
        })
      } catch (error) {
        set({
          editorOutput: {
            ...get().editorOutput,
            [exercise.id]: `Error: ${error instanceof Error ? error.message : 'Execution failed'}`
          }
        })
      } finally {
        set({ isRunningExercise: false })
      }
    },

    resetExercise: (exerciseId) => {
      const { exerciseCode, editorOutput } = get()

      set({
        exerciseCode: {
          ...exerciseCode,
          [exerciseId]: ''
        },
        editorOutput: {
          ...editorOutput,
          [exerciseId]: ''
        }
      })
    },

    // Helper method for code execution
    executeCode: async (code: string, language: string): Promise<string> => {
      // This is a simplified code execution
      // In a real app, you'd want to use a proper sandboxing service

      if (language === 'javascript' || language === 'typescript') {
        try {
          // Create a safe execution context
          const func = new Function('console', code)
          const logs: string[] = []
          const mockConsole = {
            log: (...args: any[]) => logs.push(args.join(' ')),
            error: (...args: any[]) => logs.push('ERROR: ' + args.join(' ')),
            warn: (...args: any[]) => logs.push('WARNING: ' + args.join(' '))
          }

          func(mockConsole)

          return logs.length > 0 ? logs.join('\n') : 'Code executed successfully'
        } catch (error) {
          return `Error: ${error instanceof Error ? error.message : 'Execution failed'}`
        }
      }

      if (language === 'html') {
        // For HTML, return the HTML as-is (would be rendered in an iframe)
        return code
      }

      return `Code execution for ${language} not implemented in demo`
    },

    // Filter actions
    setSearchQuery: (query) => {
      set({ searchQuery: query })
    },

    setSelectedDifficulty: (difficulties) => {
      set({ selectedDifficulty: difficulties })
    },

    setSelectedTags: (tags) => {
      set({ selectedTags: tags })
    },

    // Utility actions
    setLoading: (loading) => {
      set({ isLoading: loading })
    },

    setError: (error) => {
      set({ error })
    },

    clearError: () => {
      set({ error: null })
    },

    // Helper method to load user progress
    loadUserProgress: async (courseId: string) => {
      try {
        const response = await fetch(`/api/progress/${courseId}`)

        if (response.ok) {
          const progress = await response.json()
          set({ userProgress: progress })
        }
      } catch (error) {
        console.error('Failed to load user progress:', error)
      }
    }
  }))
)

// Selectors for computed values
export const useFilteredCourses = () => {
  const { courses, searchQuery, selectedDifficulty, selectedTags } = useCoursesStore()

  return courses.filter(course => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.tags.some(tag => tag.toLowerCase().includes(query))

      if (!matchesSearch) return false
    }

    // Difficulty filter
    if (selectedDifficulty.length > 0 && !selectedDifficulty.includes(course.difficulty)) {
      return false
    }

    // Tags filter
    if (selectedTags.length > 0) {
      const hasMatchingTag = course.tags.some(tag => selectedTags.includes(tag))
      if (!hasMatchingTag) return false
    }

    return true
  })
}

export const useCourseProgress = (courseId: string) => {
  const { userProgress } = useCoursesStore()

  const courseProgress = userProgress.filter(progress => progress.courseId === courseId)
  const completedLessons = courseProgress.filter(progress => progress.status === 'completed')
  const totalProgress = courseProgress.length > 0
    ? (completedLessons.length / courseProgress.length) * 100
    : 0

  return {
    progress: courseProgress,
    completedLessons: completedLessons.length,
    totalLessons: courseProgress.length,
    percentage: totalProgress
  }
}