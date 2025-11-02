'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'next/navigation'
import {
  Play,
  BookOpen,
  Clock,
  Star,
  CheckCircle,
  Lock,
  FileText,
  Code,
  Trophy,
  Users,
  Download,
  Share2,
  ChevronRight,
  ChevronDown,
  PlayCircle,
  PauseCircle,
  Volume2,
  VolumeX,
  Maximize,
  Settings
} from 'lucide-react'
import { useCoursesStore } from '@/lib/courses'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeEditor } from '@/components/editor/CodeEditor'
import { cn } from '@/lib/utils'

// Sample lesson data
const sampleLessons = [
  {
    id: '1',
    courseId: 'html-fundamentals',
    title: 'Introduction to HTML',
    description: 'Learn what HTML is and how it forms the foundation of web development.',
    content: {
      sections: [
        {
          id: '1',
          type: 'text',
          title: 'What is HTML?',
          content: `HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure and content of a web page using elements and tags.

HTML elements are represented by tags, which are written using angle brackets. Tags usually come in pairs, like <p> and </p>.`
        },
        {
          id: '2',
          type: 'code',
          title: 'Basic HTML Structure',
          content: 'Every HTML document has a basic structure that includes DOCTYPE, html, head, and body elements.',
          codeExample: {
            language: 'html',
            code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first HTML page.</p>
</body>
</html>`,
            description: 'This is the basic structure of an HTML document.',
            isRunnable: true
          }
        },
        {
          id: '3',
          type: 'exercise',
          title: 'Create Your First HTML Page',
          content: 'Now it\'s your turn! Create a simple HTML page with a heading and a paragraph.',
          exercise: {
            id: 'ex1',
            title: 'Create Your First HTML Page',
            description: 'Create an HTML page that includes a heading and a paragraph about yourself.',
            instructions: `1. Create a heading that says "About Me"
2. Add a paragraph that describes yourself
3. Include a subheading for your hobbies
4. Add a list of your top 3 hobbies`,
            startingCode: {
              language: 'html',
              code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>About Me</title>
</head>
<body>
    <!-- Add your code here -->

</body>
</html>`
            },
            solution: {
              language: 'html',
              code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>About Me</title>
</head>
<body>
    <h1>About Me</h1>
    <p>I am learning web development and excited to build amazing websites!</p>

    <h2>My Hobbies</h2>
    <ul>
        <li>Coding</li>
        <li>Reading</li>
        <li>Gaming</li>
    </ul>
</body>
</html>`
            },
            hints: [
              'Use the <h1> tag for your main heading',
              'Use the <p> tag for your paragraph',
              'Use <h2> for your subheading',
              'Use <ul> and <li> tags for your list'
            ],
            testCases: [
              {
                id: '1',
                expectedOutput: 'Contains h1 element',
                description: 'The page should have an h1 element'
              },
              {
                id: '2',
                expectedOutput: 'Contains paragraph element',
                description: 'The page should have at least one paragraph'
              }
            ]
          }
        }
      ]
    },
    videoUrl: 'https://example.com/video.mp4',
    orderIndex: 1,
    duration: 15,
    exercises: [],
    quiz: {
      id: 'quiz1',
      lessonId: '1',
      title: 'HTML Basics Quiz',
      questions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: 'What does HTML stand for?',
          options: [
            'HyperText Markup Language',
            'High Tech Modern Language',
            'Home Tool Markup Language',
            'Hyperlinks and Text Markup Language'
          ],
          correctAnswer: 0,
          explanation: 'HTML stands for HyperText Markup Language.',
          points: 10
        },
        {
          id: 'q2',
          type: 'true-false',
          question: 'HTML tags are case sensitive.',
          correctAnswer: 'False',
          explanation: 'HTML tags are not case sensitive. <h1> and <H1> mean the same thing.',
          points: 10
        }
      ],
      passingScore: 70,
      timeLimit: 10,
      shuffleQuestions: false
    }
  },
  {
    id: '2',
    courseId: 'html-fundamentals',
    title: 'HTML Elements and Tags',
    description: 'Deep dive into HTML elements, tags, attributes, and semantic markup.',
    content: {
      sections: [
        {
          id: '1',
          type: 'text',
          title: 'Understanding HTML Elements',
          content: `HTML elements are the building blocks of HTML pages. They are defined by a start tag, some content, and an end tag.

< tagname > Content goes here... < /tagname >`
        }
      ]
    },
    videoUrl: 'https://example.com/video2.mp4',
    orderIndex: 2,
    duration: 20,
    exercises: []
  }
]

export default function CoursePage() {
  const params = useParams()
  const slug = params.slug as string

  const [currentLesson, setCurrentLesson] = useState(0)
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string | number>>({})

  const { fetchCourse, currentCourse, enrollInCourse, completeLesson, submitQuiz } = useCoursesStore()

  // Load course data
  useEffect(() => {
    if (slug) {
      fetchCourse(slug)
    }
  }, [slug, fetchCourse])

  // Initialize lessons
  useEffect(() => {
    if (currentCourse && !currentCourse.lessons.length) {
      // In a real app, this would come from the API
      const { setCurrentLesson } = useCoursesStore.getState()
      setCurrentLesson({
        ...currentCourse,
        lessons: sampleLessons
      })
    }
  }, [currentCourse])

  if (!currentCourse) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    )
  }

  const lessons = currentCourse.lessons || sampleLessons
  const currentLessonData = lessons[currentLesson]
  const totalLessons = lessons.length
  const progress = ((currentLesson + 1) / totalLessons) * 100

  const handleEnroll = async () => {
    await enrollInCourse(currentCourse.id)
  }

  const handleCompleteLesson = async () => {
    await completeLesson(currentLessonData.id)
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1)
    }
  }

  const handleNextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1)
    }
  }

  const handlePrevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1)
    }
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const handleQuizSubmit = async () => {
    if (!currentLessonData.quiz) return

    try {
      const answers = Object.entries(quizAnswers).map(([questionId, answer]) => ({
        questionId,
        answer
      }))

      const attempt = await submitQuiz(
        currentLessonData.quiz.id,
        answers,
        300 // 5 minutes
      )

      if (attempt.passed) {
        await handleCompleteLesson()
        setShowQuiz(false)
      }
    } catch (error) {
      console.error('Failed to submit quiz:', error)
    }
  }

  const handleQuizAnswer = (questionId: string, answer: string | number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-2 text-blue-100 mb-4">
            <span> Courses</span>
            <ChevronRight className="w-4 h-4" />
            <span> {currentCourse.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                {currentCourse.title}
              </h1>
              <p className="text-xl text-blue-100 mb-6 max-w-3xl">
                {currentCourse.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{Math.floor(currentCourse.duration / 60)} hours</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{totalLessons} lessons</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>4.8 (1,250 reviews)</span>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {currentCourse.difficulty}
                </Badge>
              </div>
            </div>

            <div className="mt-6 lg:mt-0">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={handleEnroll}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Enroll Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Lesson Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {currentLessonData.title}
                  </h2>
                  <p className="text-gray-600">
                    {currentLessonData.description}
                  </p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">
                  Lesson {currentLesson + 1} of {totalLessons}
                </Badge>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevLesson}
                  disabled={currentLesson === 0}
                >
                  Previous Lesson
                </Button>

                <div className="flex items-center space-x-2">
                  {currentLessonData.quiz && (
                    <Button
                      variant={showQuiz ? 'default' : 'outline'}
                      onClick={() => setShowQuiz(!showQuiz)}
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      Take Quiz
                    </Button>
                  )}
                  <Button
                    onClick={handleCompleteLesson}
                    disabled={currentLesson === lessons.length - 1}
                  >
                    {currentLesson === lessons.length - 1 ? 'Complete Course' : 'Complete & Continue'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Video Section */}
            {currentLessonData.videoUrl && (
              <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
                <div className="relative aspect-video bg-black">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? (
                        <PauseCircle className="w-8 h-8" />
                      ) : (
                        <PlayCircle className="w-8 h-8" />
                      )}
                    </Button>
                  </div>

                  {/* Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:text-white"
                          onClick={() => setIsPlaying(!isPlaying)}
                        >
                          {isPlaying ? (
                            <PauseCircle className="w-5 h-5" />
                          ) : (
                            <PlayCircle className="w-5 h-5" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:text-white"
                          onClick={() => setIsMuted(!isMuted)}
                        >
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:text-white"
                        >
                          <Settings className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:text-white"
                        >
                          <Maximize className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quiz Section */}
            <AnimatePresence>
              {showQuiz && currentLessonData.quiz && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-lg shadow-sm p-6 mb-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    {currentLessonData.quiz.title}
                  </h3>

                  <div className="space-y-6">
                    {currentLessonData.quiz.questions.map((question, index) => (
                      <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex items-start space-x-3 mb-4">
                          <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <p className="text-gray-900 font-medium mb-4">
                              {question.question}
                            </p>

                            {question.type === 'multiple-choice' && (
                              <div className="space-y-2">
                                {question.options?.map((option, optionIndex) => (
                                  <label
                                    key={optionIndex}
                                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                  >
                                    <input
                                      type="radio"
                                      name={question.id}
                                      value={optionIndex}
                                      checked={quizAnswers[question.id] === optionIndex}
                                      onChange={() => handleQuizAnswer(question.id, optionIndex)}
                                      className="text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-700">{option}</span>
                                  </label>
                                ))}
                              </div>
                            )}

                            {question.type === 'true-false' && (
                              <div className="space-y-2">
                                {['True', 'False'].map((option) => (
                                  <label
                                    key={option}
                                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                  >
                                    <input
                                      type="radio"
                                      name={question.id}
                                      value={option}
                                      checked={quizAnswers[question.id] === option}
                                      onChange={() => handleQuizAnswer(question.id, option)}
                                      className="text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-700">{option}</span>
                                  </label>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="text-sm text-gray-500">
                          {question.points} points
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {currentLessonData.quiz.timeLimit && (
                        <span>Time limit: {currentLessonData.quiz.timeLimit} minutes</span>
                      )}
                    </div>
                    <Button onClick={handleQuizSubmit}>
                      Submit Quiz
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Lesson Content */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Lesson Content
              </h3>

              <div className="space-y-8">
                {currentLessonData.content.sections.map((section) => {
                  const isExpanded = expandedSections.includes(section.id)

                  return (
                    <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          {section.type === 'text' && <FileText className="w-5 h-5 text-gray-600" />}
                          {section.type === 'code' && <Code className="w-5 h-5 text-gray-600" />}
                          {section.type === 'exercise' && <Code className="w-5 h-5 text-blue-600" />}
                          <span className="font-medium text-gray-900">{section.title}</span>
                        </div>
                        <ChevronDown
                          className={cn(
                            'w-5 h-5 text-gray-600 transition-transform',
                            isExpanded && 'transform rotate-180'
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4">
                              {section.type === 'text' && (
                                <div className="prose max-w-none">
                                  <p className="text-gray-700 whitespace-pre-wrap">
                                    {section.content}
                                  </p>
                                </div>
                              )}

                              {section.type === 'code' && section.codeExample && (
                                <div className="space-y-4">
                                  <p className="text-gray-700 mb-4">
                                    {section.codeExample.description}
                                  </p>
                                  <CodeEditor
                                    value={section.codeExample.code}
                                    language={section.codeExample.language}
                                    height="300px"
                                    readOnly={true}
                                    showPreview={section.codeExample.language === 'html'}
                                  />
                                </div>
                              )}

                              {section.type === 'exercise' && section.exercise && (
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-2">
                                      {section.exercise.title}
                                    </h4>
                                    <p className="text-gray-700 mb-4">
                                      {section.exercise.description}
                                    </p>
                                  </div>

                                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h5 className="font-medium text-blue-900 mb-2">Instructions:</h5>
                                    <pre className="text-blue-800 whitespace-pre-wrap text-sm">
                                      {section.exercise.instructions}
                                    </pre>
                                  </div>

                                  <CodeEditor
                                    value={section.exercise.startingCode.code}
                                    language={section.exercise.startingCode.language}
                                    height="400px"
                                    title="Code Editor - Try it yourself!"
                                    description="Write your solution here and run it to test."
                                  />

                                  {section.exercise.hints.length > 0 && (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                      <h5 className="font-medium text-yellow-900 mb-2">💡 Hints:</h5>
                                      <ul className="list-disc list-inside text-yellow-800 space-y-1">
                                        {section.exercise.hints.map((hint, index) => (
                                          <li key={index} className="text-sm">{hint}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            {/* Course Progress */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Completion</span>
                    <span className="text-sm font-medium text-gray-900">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{currentLesson + 1} completed</span>
                    <span>{totalLessons} total</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lessons.map((lesson, index) => {
                    const isCurrent = index === currentLesson
                    const isCompleted = index < currentLesson

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setCurrentLesson(index)}
                        className={cn(
                          'w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors',
                          isCurrent && 'bg-blue-50 border border-blue-200',
                          !isCurrent && 'hover:bg-gray-50'
                        )}
                      >
                        <div className="flex-shrink-0">
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : isCurrent ? (
                            <PlayCircle className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Lock className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            'text-sm font-medium truncate',
                            isCurrent ? 'text-blue-900' : 'text-gray-900'
                          )}>
                            {lesson.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {lesson.duration} min
                          </p>
                        </div>
                        {lesson.quiz && (
                          <Trophy className="w-4 h-4 text-yellow-500" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}