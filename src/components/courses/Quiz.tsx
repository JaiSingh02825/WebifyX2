'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Trophy,
  Target,
  BookOpen,
  RotateCcw,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Star,
  Brain,
  Code,
  FileText,
  Award
} from 'lucide-react'
import { useCoursesStore } from '@/lib/courses'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Quiz, Question, QuizAttempt, QuizAnswer } from '@/types'

interface QuizComponentProps {
  quiz: Quiz
  lessonId: string
  courseId: string
  onComplete?: (attempt: QuizAttempt) => void
  mode?: 'practice' | 'graded' | 'timed'
  showSolutions?: boolean
}

export function Quiz({
  quiz,
  lessonId,
  courseId,
  onComplete,
  mode = 'practice',
  showSolutions = false
}: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | number>>({})
  const [showResults, setShowResults] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit ? quiz.timeLimit * 60 : null)
  const [isPaused, setIsPaused] = useState(false)
  const [questionResults, setQuestionResults] = useState<Record<string, { isCorrect: boolean; explanation: string }>>({})

  const { submitQuiz, getQuizAttempts, quizAttempts } = useCoursesStore()

  const questions = quiz.shuffleQuestions
    ? [...quiz.questions].sort(() => Math.random() - 0.5)
    : quiz.questions

  const isLastQuestion = currentQuestion === questions.length - 1
  const allQuestionsAnswered = Object.keys(answers).length === questions.length

  // Timer logic
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0 || isPaused || showResults) return

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev !== null && prev <= 1) {
          handleSubmit()
          return 0
        }
        return prev !== null ? prev - 1 : null
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeRemaining, isPaused, showResults])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswer = (questionId: string, answer: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    if (isSubmitted) return

    setIsSubmitted(true)
    setShowResults(true)

    try {
      const quizAnswers = Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer
      }))

      const timeSpent = quiz.timeLimit ? (quiz.timeLimit * 60 - (timeRemaining || 0)) : 0

      const attempt = await submitQuiz(quiz.id, answers, timeSpent)

      // Calculate results for each question
      const results: Record<string, { isCorrect: boolean; explanation: string }> = {}
      questions.forEach(question => {
        const userAnswer = answers[question.id]
        const isCorrect = checkAnswer(question, userAnswer)
        results[question.id] = {
          isCorrect,
          explanation: question.explanation
        }
      })
      setQuestionResults(results)

      if (onComplete) {
        onComplete(attempt)
      }
    } catch (error) {
      console.error('Failed to submit quiz:', error)
      setIsSubmitted(false)
    }
  }

  const checkAnswer = (question: Question, userAnswer: string | number): boolean => {
    if (question.type === 'multiple-choice' || question.type === 'true-false') {
      return userAnswer === question.correctAnswer
    }
    return false // For code completion and practical questions
  }

  const calculateScore = () => {
    let correct = 0
    let totalPoints = 0

    questions.forEach(question => {
      totalPoints += question.points
      const userAnswer = answers[question.id]
      if (checkAnswer(question, userAnswer)) {
        correct += question.points
      }
    })

    return { correct, totalPoints, percentage: Math.round((correct / totalPoints) * 100) }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setIsSubmitted(false)
    setTimeRemaining(quiz.timeLimit ? quiz.timeLimit * 60 : null)
    setIsPaused(false)
    setQuestionResults({})
  }

  const getQuestionIcon = (type: Question['type']) => {
    switch (type) {
      case 'multiple-choice':
        return <Target className="w-5 h-5" />
      case 'code-completion':
        return <Code className="w-5 h-5" />
      case 'practical':
        return <Brain className="w-5 h-5" />
      case 'true-false':
        return <CheckCircle className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  if (showResults) {
    const { correct, totalPoints, percentage } = calculateScore()
    const passed = percentage >= quiz.passingScore
    const scoreColor = passed ? 'text-green-600' : 'text-red-600'

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center"
            >
              {passed ? (
                <div className="w-full h-full bg-green-100 rounded-full flex items-center justify-center">
                  <Trophy className="w-12 h-12 text-green-600" />
                </div>
              ) : (
                <div className="w-full h-full bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-12 h-12 text-red-600" />
                </div>
              )}
            </motion.div>

            <CardTitle className="text-2xl">
              {passed ? 'Congratulations!' : 'Keep Learning!'}
            </CardTitle>
            <CardDescription>
              {passed
                ? 'You have successfully passed this quiz.'
                : `You need ${quiz.passingScore}% to pass. Review the material and try again.`
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Score Summary */}
            <div className="text-center">
              <div className={`text-4xl font-bold ${scoreColor} mb-2`}>
                {percentage}%
              </div>
              <p className="text-gray-600">
                {correct} out of {totalPoints} points
              </p>
              <Badge className={passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {passed ? 'PASSED' : 'FAILED'}
              </Badge>
            </div>

            {/* Question Review */}
            {showSolutions && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Question Review</h3>
                <div className="space-y-3">
                  {questions.map((question, index) => {
                    const result = questionResults[question.id]
                    const userAnswer = answers[question.id]

                    return (
                      <motion.div
                        key={question.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                          'p-4 rounded-lg border',
                          result?.isCorrect
                            ? 'bg-green-50 border-green-200'
                            : 'bg-red-50 border-red-200'
                        )}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            {result?.isCorrect ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-medium text-gray-900">
                                Question {index + 1}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {question.points} points
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">
                              {question.question}
                            </p>

                            {result?.explanation && (
                              <div className="text-sm text-gray-600 bg-white p-3 rounded border">
                                <strong>Explanation:</strong> {result.explanation}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-center space-x-4">
              {mode === 'practice' && !passed && (
                <Button onClick={resetQuiz} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              )}
              <Button onClick={() => window.history.back()}>
                <BookOpen className="w-4 h-4 mr-2" />
                Continue Learning
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  const currentQ = questions[currentQuestion]
  const userAnswer = answers[currentQ.id]

  return (
    <div className="max-w-3xl mx-auto">
      {/* Quiz Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Brain className="w-6 h-6 text-blue-600" />
                <span>{quiz.title}</span>
              </CardTitle>
              <CardDescription>
                {mode === 'timed' && 'Timed quiz • '}
                {questions.length} questions • {quiz.passingScore}% to pass
              </CardDescription>
            </div>

            {/* Timer */}
            {timeRemaining !== null && (
              <div className={cn(
                'flex items-center space-x-2 px-3 py-2 rounded-lg',
                timeRemaining < 60 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
              )}>
                <Clock className="w-4 h-4" />
                <span className="font-mono font-medium">
                  {formatTime(timeRemaining)}
                </span>
                {mode === 'practice' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPaused(!isPaused)}
                    className="p-1 h-auto"
                  >
                    {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Object.keys(answers).length} answered</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Question */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
                {getQuestionIcon(currentQ.type)}
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg mb-2">
                  {currentQ.question}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {currentQ.type.replace('-', ' ')}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {currentQ.points} points
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Answer Options */}
            {currentQ.type === 'multiple-choice' && (
              <div className="space-y-3">
                {currentQ.options?.map((option, index) => (
                  <label
                    key={index}
                    className={cn(
                      'flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all',
                      userAnswer === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    )}
                  >
                    <input
                      type="radio"
                      name={currentQ.id}
                      value={index}
                      checked={userAnswer === index}
                      onChange={() => handleAnswer(currentQ.id, index)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQ.type === 'true-false' && (
              <div className="space-y-3">
                {['True', 'False'].map((option) => (
                  <label
                    key={option}
                    className={cn(
                      'flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all',
                      userAnswer === option
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    )}
                  >
                    <input
                      type="radio"
                      name={currentQ.id}
                      value={option}
                      checked={userAnswer === option}
                      onChange={() => handleAnswer(currentQ.id, option)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQ.type === 'code-completion' && (
              <div className="space-y-4">
                {currentQ.codeContext && (
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <pre className="text-sm text-gray-700 overflow-x-auto">
                      {currentQ.codeContext.code}
                    </pre>
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Complete the code..."
                  value={userAnswer as string || ''}
                  onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {Object.keys(answers).length} of {questions.length} answered
                </span>
              </div>

              {isLastQuestion ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!allQuestionsAnswered || isSubmitted}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Award className="w-4 h-4 mr-2" />
                  {isSubmitted ? 'Submitting...' : 'Submit Quiz'}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!userAnswer}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Question Navigation */}
      <Card className="mt-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-900">Question Navigation</span>
            <span className="text-xs text-gray-500">
              Click to jump to any question
            </span>
          </div>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((_, index) => {
              const isAnswered = answers[questions[index].id] !== undefined
              const isCurrent = index === currentQuestion

              return (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={cn(
                    'w-8 h-8 rounded text-sm font-medium transition-all',
                    isCurrent
                      ? 'bg-blue-600 text-white'
                      : isAnswered
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  )}
                >
                  {index + 1}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}