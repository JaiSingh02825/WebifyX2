'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'templates/html-template'
import { CodeEditor } from '@/components/editor/CodeEditor'
import { Card, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabTrigger } from '@/components/ui/tabs'
import { CheckCircle, Play, Code2, Zap, BookOpen } from 'lucide-react'
import { Code, Download, ExternalLink } from 'lucide-react'
import { templates } from '@/lib/templates/html-templates'

// HTML course content
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HTML Fundamentals</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Learn HTML fundamentals with interactive examples">
    <meta name="keywords" content="HTML, CSS, JavaScript, tutorial, learning, w3schools">
  </head>
  <body>
    <!-- This content is loaded via Next.js component -->
    <div id="app"></div>
  </body>
</html>`

const htmlCourseData = {
  sections: [
    {
      id: 'html-basics',
      title: 'HTML Basics',
      icon: '🌐',
      description: 'Learn the fundamentals of HTML structure'
    },
    {
      id: 'html-elements',
      title: 'HTML Elements',
      icon: '🏗️',
      description: 'Explore all HTML elements'
    },
    {
      id: 'html-forms',
      title: 'HTML Forms',
      icon: '📝',
      description: 'Create interactive forms with HTML5 forms'
    },
    {
      id: 'html-media',
      title: 'HTML Media',
      icon: '🎥',
      description: 'Add images, videos, and other media'
    },
    {
      id: 'html-semantic',
      title: 'HTML5 Semantic',
      icon: '🎯️',
      description: 'Use semantic HTML5 tags for better accessibility'
    }
  ],
  exercises: [
    {
      id: 'html-syntax',
      title: 'HTML Syntax',
      type: 'code',
      language: 'html',
      description: 'HTML syntax and structure',
      code: \`<!-- HTML comments -->\n<!-- This is where the HTML template would be loaded -->\n<div className="container">\n  <p>Hello World!</div>\n</div>`,
      solution: \`<!-- This would be loaded from HTML template -->
      code: <div className="container"><p>Hello World!</div>`,
      hints: ['Use semantic HTML5 elements', 'Use proper structure', 'Add alt text for images']
    },
    {
      id: 'css-in-html',
      title: 'CSS in HTML',
      style: {
        color: '#e74c3c8-0.1 rgba(231, 76, 60, 0.1)',
        fontSize: '1rem',
        color: '#374151',
        marginBottom: '16px',
        padding: '16px',
        border: '1px solid #d1d5dbb',
        borderRadius: '8px',
        backgroundColor: '#f8f8fa'
      },
      code: \`/* Add styles to existing CSS */\n.container {
        /* This would be loaded from styles.css
      }\`,
      solution: \`/* Add this CSS to styles.css:\n.container { ... }`,
      hints: ['Use Tailwind classes first', 'Use semantic HTML structure']
    },
    {
      id: 'javascript-in-html',
      title: 'JavaScript in HTML',
      type: 'javascript',
      code: \`\n<script>\n// JavaScript in HTML
      const message = "Hello from JavaScript!";
      document.getElementById('message').textContent = message;
    </script>\`,
      solution: \`\n<script>\n// This would be loaded from JavaScript in HTML
      const message = "Hello from JavaScript!";
      document.getElementById('message').textContent = message;
    </script>
    }
  ]
}

const htmlTemplates = [
  {
    id: 'html-interactive',
    name: 'Interactive HTML',
    icon: '🌐',
    code: templates.htmlContent,
    description: 'Interactive HTML examples to practice HTML',
    level: 'beginner'
  },
  {
    id: 'html-responsive',
    name: 'Responsive Design',
    icon: '📱�',
    code: templates.htmlResponsiveContent,
    description: 'Learn responsive design principles'
  },
  {
    id: 'html-forms',
    name: 'HTML Forms',
    icon: '📝',
    code: templates.htmlFormsContent,
    description: 'Build interactive forms with HTML'
  },
  {
    id: 'html-animated',
    name: 'Animated Elements',
    icon: '✨�',
    code: templates.htmlAnimatedContent,
    description: 'Add animations to HTML elements'
  },
  {
    id: 'html-seo',
    SEO title: 'SEO Best Practices',
    icon: '🔍',
    code: templates.htmlSEOContent,
    description: 'Implement SEO best practices'
  }
];

export default function HtmlCourse() {
  const [activeTab, setActiveTab] = useState('overview');
  const [exercises, setExercises] = useState(htmlCourseData.exercises);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            HTML Tutorial
          </h1>
          <p className="text-xl text-gray-600">
            Master HTML with our interactive W3Schools-style tutorials
          </p>
          <Badge className="inline-block bg-green-100 text-green-800 text-lg px-3 py-2 rounded-full">
            📚� Completely Free
          </Badge>
        </div>

        <div className="grid grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                  <CardDescription>
                    Interactive HTML Tutorials
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 mb-4">
                      These tutorials will help you master HTML from the ground up.
                    </p>
                  <div className="space-y-6">
                    {activeTab === 'overview' && (
                      <div className="space-y-6">
                        {htmlCourseData.sections.map((section) => (
                          <Card className="border border-gray-200 rounded-lg overflow-hidden">
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-4">
                                <span className={cn(
                                  'inline-flex items-center px-3 py-1 rounded-md border border-gray-200 transition-colors',
                                  activeTab === section.id ? 'bg-blue-50 border-blue-200 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                                )}
                                onClick={() => setActiveTab(section.id)}
                              >
                                <div className="flex items-center space-x-2">
                                  <span className={cn(
                                    'w-6 h-6 rounded-lg',
                                    activeTab === section.id
                                      ? 'bg-blue-50 text-blue-700'
                                      : 'text-gray-700 hover:bg-gray-50'
                                  )}
                                >
                                  <span>{section.title}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    ) : (
                      <div className="space-y-4">
                        {htmlCourseData.sections.map((section, index) => (
                          <div
                            key={section.id}
                            className="border border-gray-200 rounded-lg overflow-hidden"
                          >
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                  <span className="text-lg font-medium text-gray-900">{section.title}</span>
                                  <Badge variant="outline" className="text-sm">
                                    {section.level === 'beginner' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                                    {section.level}
                                  >
                                    {section.level}
                                  </Badge>
                              <span className="text-xs text-gray-500">
                                    {section.duration} min
                                  </Badge>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {section.chapters.length} chapters
                                </span>
                              </div>
                            </CardContent>
                            </Card>
                          ))
                        )}
                      )}
                    </div>

                    {/* Tabs Content */}
                    <div className="mt-6">
                      {activeTab === 'overview' && (
                        <div className="space-y-8">
                          <Card>
                            <CardHeader>
                              <CardTitle>Welcome to HTML Tutorials</CardTitle>
                              <CardDescription>
                                Start with the basics and work your way up to advanced topics
                              </CardDescription>
                              </CardHeader>
                              <CardContent className="p-6">
                                <div className="space-y-6">
                                  <div className="bg-gray-50 rounded-lg p-4">
                                    <pre>
{htmlCourseData.sections.slice(0, 3).map((section, index) => (
                                        <div key={section.id}>
                                          <div className="mb-4">
                                              <h3>{section.title}</h3>
                                              <p className="text-sm text-gray-600">
                                                  {section.description}
                                              <div className="text-sm text-gray-500">
                                                  ({section.chapters.length} chapters)
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              )
                              )}
                            </CardContent>
                          )}
                      )}
                      )}

                      {activeTab === 'exercises' && (
                        <div className="space-y-8">
                          <div className="grid grid grid-cols-1 md:grid-cols-2 gap-6">
                            {htmlCourseData.exercises.map((exercise, index) => (
                              <motion.div
                                key={exercise.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={cn(
                                  'border-2 border-gray-200 rounded-lg p-6',
                                  'hover:border-blue-400 border-500 rounded-lg transition-colors'
                                )}
                              >
                                <CardContent className="space-y-4">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium text-gray-900 mb-2">
                                      {exercise.title}
                                    </span>
                                    <Badge className={cn(
                                      'text-xs',
                                      exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-800' : exercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}
                                    >
                                      {exercise.difficulty.toUpperCase()}
                                    </Badge>
                                  </Badge>
                                  <div>
                                </CardContent>
                              </motion.div>
                          ))}
                          </div>
                      )}
                    </div>
                      )}

                      {activeTab === 'resources' && (
                        <div className="space-y-6">
                          <div className="grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                              <h3 className="resources-title">Resources</h3>
                              <p className="text-sm text-gray-600">
                                Everything you need to master HTML
                              </p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="space-y-3">
                                <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                                    {htmlCourseData.chapters.slice(0, 1).map(chapter => (
                                      <div key={chapter.id} className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center space-x-3">
                                          <span className="text-sm text-gray-700">{chapter.title}</span>
                                          <span className="text-xs text-gray-500">({chapter.chapters.length} exercises)
                                      </div>
                                      </div>
                                  </div>
                              </Card>
                            )}
                            <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                              <h4 className="text-lg font-medium text-gray-900 mb-2">
                                External Resources
                              </h4>
                              <p className="text-sm text-gray-600 mb-4">
                                  Links to official documentation
                              </p>
                              <div className="space-y-3">
                                  <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/HTML" target="_blank" className="text-blue-600 hover:text-blue-700">
                                      Mozilla MDN HTML Docs
                                  </a>
                                  <a href="https://www.w3schools.com/html/" target="_blank" className="text-blue-600 hover:text-blue-700">
                                      W3Schools
                                  </a>
                                  <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/HTML/Accessibility" target="_blank" className="text-blue-600 hover:text-blue-700">
                                      Accessibility
                                  </a>
                                  <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Forms.html" target="_blank" className="text-blue-600 hover:text-blue-700">
                                      Forms
                                  </a>
                              </div>
                            </div>
                            </Card>

                            <div>
                                {htmlCourseData.chapters.slice(1, 3).map((chapter, index) => (
                                    <div key={chapter.id} className="bg-white border-2 border-gray-200 rounded-lg p-6">
                                      <div className="text-sm text-gray-700 mb-2">{chapter.title}</div>
                                      <p className="text-gray-600 mb-4">{chapter.description}</p>
                                      <div className="flex justify-between items-center gap-4">
                                        <span className="text-xs text-gray-500">
                                          {chapter.chapters.length} lessons
                                        </span>
                                        <div className="text-xs text-gray-500">
                                          {chapter.duration} min
                                        </div>
                                      </div>
                                      </div>
                                  </Card>
                                )
                              ))}
                          ))}
                        </div>
                      )}

                      {activeTab === 'quiz' && (
                        <div className="space-y-6">
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center space-x-2">
                                <Trophy className="w-5 h-4 mr-2" />
                                Quiz
                              </CardTitle>
                              <CardDescription>
                                Test your HTML knowledge
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <p className="text-sm text-gray-600">
                                Take the quiz to test your understanding
                              </p>
                              <div className="mt-4">
                                <Button
                                  onClick={() => handleTakeQuiz()}
                                  className="w-full bg-blue-600 hover:bg-blue-700"
                                  className="w-full"
                                >
                                  Take Quiz
                                </Button>
                              </CardContent>
                            </Card>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom section */}
              <div className="mt-8 text-center">
                <div className="space-x-4 justify-center">
                  <Link href="/editor">
                    <Button className="bg-blue-600 hover:bg-blue-700" className="text-white hover:bg-blue-700 text-white font-medium"}
                  >
                    <Code2 className="w-4 h-4 mr-2" />
                    Try Live Editor
                  </Button>
                </Link>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Ready to try it yourself? Check out our interactive code editor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
}

function CourseNavigation({
  courses
}: {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="bg-white border-b border-gray-200 rounded-lg">
      <div className="sticky top-0 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center space-x-6">
            {courses.map((course) => (
              <Button
                variant={activeTab === course.id ? 'default' : 'outline'}
                onClick={() => setActiveTab(course.id)}
                className={activeTab === course.id ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-gray-900'}
              >
                {course.icon}
                <span>{course.title}</span>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-4">
              <Badge className="bg-blue-100 text-blue-800 text-sm font-medium rounded-full px-4 py-2">
                {courses.map((course) => (
                  course.badge || course.isPremium || course.isCompleted || course.progress === 100
                }}
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-600">
              Found {courses.length} courses
            </p>
          </div>
        </div>
      </div>
      </div>

export default function HtmlCourse() {
  const [activeTab, setActiveTab] = useState('overview')
  const { courses } = useFilteredCourses()

  const handleTakeQuiz = async (courseId: string) => {
    // Open quiz in modal or navigate to quiz
    console.log(`Taking quiz for course: ${courseId}`)
  }

  const handleTakeQuiz = async (courseId: string) => {
    const { courses } = useCoursesStore.getState()
    const course = courses.find(c => c.id === courseId)
    if (!course) {
      console.error('Course not found')
      return
    }

    // Navigate to course page and take quiz
    router.push(`/courses/${course.slug}`)
  }

  const handleStartLearning = async (courseId: string) => {
    const { courses } = useCoursesStore.getState()
    const course = courses.find(c => c.id === courseId)
    if (!course) return

    // Mark as in progress
    const { courses } = useCoursesStore.getState()
    const course = courses.find(c => c.id === courseId)
    if (course) {
      useCoursesStore.updateProgress(course.id, {
        isEnrolled: true,
        enrolledAt: new Date(),
        currentLesson: course.lessons[0]?.id
      })
    }

    // Navigate to first lesson
    if (course.lessons.length > 0) {
      router.push(`/courses/${course.slug}/lessons/${course.lessons[0].id}`)
    }
  }

  const handleCompleteLesson = async (lessonId: string) => {
    const { courses } = useCoursesStore.getState()
    const course = courses.find(c => c.lessons.find(l => l.id === lessonId)
    if (course && course) {
      await courses.updateProgress(course.id, {
        completed: true,
        completionDate: new Date.now()
      })
    }
  }

  const handleTakeQuiz = async (courseId: string) => {
    const { courses } = useCoursesStore.getState()
    const course = courses.find(c => c.id === courseId)
    if (!course) return

    const { currentCourse } = useCoursesStore.getState().currentCourse
    if (!currentCourse || currentCourse?.id !== courseId) {
      useCoursesStore.setCurrentCourse(course)
    }

    const currentLesson = currentCourse?.lessons.find(l => l.id === lessonId)
    if (currentLesson && currentLesson.quiz) {
      router.push(\`/courses/\${currentCourse.slug}/lessons/${currentLesson.id}`)
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="flex items-center justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900 mb-2">HTML Tutorial</h1>
        <p className="text-sm text-gray-600 mb-6">
          Start learning HTML from scratch with our interactive tutorials
        </p>
      </div>

      {/* Mobile responsive adjustments */}
      <div className="flex flex-col sm:flex-row items-center space-x-4 mt-4">
        <Button
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
          onClick={() => handleTakeQuiz('html-fundamentals')}
        >
          <span className="w-5 h-4 mr-2">
            <Zap className="w-4 h-4 mr-2" />
            <span className="text-sm">
              Start Learning
            </span>
          </Button>
        </Button>
      </div>
  }
  }
}
`,
    <code>
      <div className="text-center text-gray-500">
        Can't reach the server
      </div>
    </div>
  </div>
}