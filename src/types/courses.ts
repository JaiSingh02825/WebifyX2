export interface Course {
  id: string
  title: string
  slug: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: number // in minutes
  thumbnail: string
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
  lessons: Lesson[]
  tags: string[]
  prerequisites?: string[]
}

export interface Lesson {
  id: string
  courseId: string
  title: string
  description: string
  content: LessonContent
  videoUrl?: string
  orderIndex: number
  duration: number // in minutes
  exercises: Exercise[]
  quiz?: Quiz
}

export interface LessonContent {
  sections: ContentSection[]
}

export interface ContentSection {
  id: string
  type: 'text' | 'code' | 'exercise' | 'video'
  title: string
  content: string
  codeExample?: CodeExample
  exercise?: Exercise
}

export interface CodeExample {
  language: 'html' | 'css' | 'javascript' | 'typescript' | 'jsx' | 'tsx'
  code: string
  description?: string
  isRunnable?: boolean
}

export interface Exercise {
  id: string
  title: string
  description: string
  instructions: string
  startingCode: CodeExample
  solution: CodeExample
  hints: string[]
  testCases: TestCase[]
}

export interface TestCase {
  id: string
  input?: string
  expectedOutput: string
  description: string
}

export interface Quiz {
  id: string
  lessonId: string
  title: string
  questions: Question[]
  passingScore: number
  timeLimit?: number // in minutes
  shuffleQuestions: boolean
}

export interface Question {
  id: string
  type: 'multiple-choice' | 'code-completion' | 'practical' | 'true-false'
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
  points: number
  codeContext?: CodeExample
}

export interface UserProgress {
  id: string
  userId: string
  courseId: string
  lessonId?: string
  status: 'not-started' | 'in-progress' | 'completed'
  completionDate?: Date
  quizScore?: number
  timeSpent: number // in minutes
  bookmarks: string[]
  notes: string
}

export interface QuizAttempt {
  id: string
  userId: string
  quizId: string
  answers: QuizAnswer[]
  score: number
  totalPoints: number
  passed: boolean
  startedAt: Date
  completedAt: Date
  timeSpent: number // in minutes
}

export interface QuizAnswer {
  questionId: string
  answer: string | number
  isCorrect: boolean
  timeSpent: number // in seconds
}

export interface Certificate {
  id: string
  userId: string
  courseId: string
  issuedAt: Date
  certificateUrl: string
  verificationCode: string
}