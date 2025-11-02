'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CodeEditor } from '@/components/editor/CodeEditor'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabTrigger } from '@/components/ui/tabs'
import { CheckCircle, Play, Code2, Zap, BookOpen, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
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
      description: 'Learn the fundamentals of HTML structure',
      level: 'beginner',
      duration: '30',
      chapters: [
        { id: 'intro', title: 'Introduction to HTML', duration: '10' },
        { id: 'structure', title: 'HTML Document Structure', duration: '20' }
      ]
    },
    {
      id: 'html-elements',
      title: 'HTML Elements',
      icon: '🏗️',
      description: 'Explore all HTML elements',
      level: 'beginner',
      duration: '45',
      chapters: [
        { id: 'tags', title: 'HTML Tags and Elements', duration: '15' },
        { id: 'attributes', title: 'HTML Attributes', duration: '15' },
        { id: 'headings', title: 'HTML Headings', duration: '15' }
      ]
    },
    {
      id: 'html-forms',
      title: 'HTML Forms',
      icon: '📝',
      description: 'Create interactive forms with HTML5 forms',
      level: 'intermediate',
      duration: '60',
      chapters: [
        { id: 'form-basics', title: 'Form Basics', duration: '20' },
        { id: 'input-types', title: 'Input Types', duration: '25' },
        { id: 'validation', title: 'Form Validation', duration: '15' }
      ]
    },
    {
      id: 'html-media',
      title: 'HTML Media',
      icon: '🎥',
      description: 'Add images, videos, and other media',
      level: 'intermediate',
      duration: '40',
      chapters: [
        { id: 'images', title: 'Images', duration: '15' },
        { id: 'video', title: 'Video and Audio', duration: '25' }
      ]
    },
    {
      id: 'html-semantic',
      title: 'HTML5 Semantic',
      icon: '🎯',
      description: 'Use semantic HTML5 tags for better accessibility',
      level: 'intermediate',
      duration: '50',
      chapters: [
        { id: 'semantic-tags', title: 'Semantic Tags', duration: '25' },
        { id: 'accessibility', title: 'Accessibility', duration: '25' }
      ]
    }
  ],
  exercises: [
    {
      id: 'html-syntax',
      title: 'HTML Syntax',
      type: 'code',
      language: 'html',
      description: 'HTML syntax and structure',
      difficulty: 'beginner',
      code: `<!-- HTML comments -->
<!-- This is where the HTML template would be loaded -->
<div className="container">
  <p>Hello World!</div>
</div>`,
      solution: `<!-- This would be loaded from HTML template -->
<div className="container"><p>Hello World!</div>`,
      hints: ['Use semantic HTML5 elements', 'Use proper structure', 'Add alt text for images']
    },
    {
      id: 'css-in-html',
      title: 'CSS in HTML',
      type: 'css',
      description: 'Add styles to HTML elements',
      difficulty: 'beginner',
      code: `/* Add styles to existing CSS */
.container {
  /* This would be loaded from styles.css */
}`,
      solution: `/* Add this CSS to styles.css:
.container { ... }`,
      hints: ['Use Tailwind classes first', 'Use semantic HTML structure']
    },
    {
      id: 'javascript-in-html',
      title: 'JavaScript in HTML',
      type: 'javascript',
      difficulty: 'intermediate',
      code: `
<script>
// JavaScript in HTML
const message = "Hello from JavaScript!";
document.getElementById('message').textContent = message;
</script>`,
      solution: `
<script>
// This would be loaded from JavaScript in HTML
const message = "Hello from JavaScript!";
document.getElementById('message').textContent = message;
</script>`,
      hints: ['Use proper event listeners', 'Handle DOM correctly']
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
    icon: '📱',
    code: templates.htmlResponsiveContent,
    description: 'Learn responsive design principles',
    level: 'intermediate'
  },
  {
    id: 'html-forms',
    name: 'HTML Forms',
    icon: '📝',
    code: templates.htmlFormsContent,
    description: 'Build interactive forms with HTML',
    level: 'intermediate'
  },
  {
    id: 'html-animated',
    name: 'Animated Elements',
    icon: '✨',
    code: templates.htmlAnimatedContent,
    description: 'Add animations to HTML elements',
    level: 'advanced'
  },
  {
    id: 'html-seo',
    name: 'SEO Best Practices',
    icon: '🔍',
    code: templates.htmlSEOContent,
    description: 'Implement SEO best practices',
    level: 'advanced'
  }
]

export default function HtmlCourse() {
  const [activeTab, setActiveTab] = useState('overview')

  const handleTakeQuiz = () => {
    console.log('Taking HTML quiz')
  }

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
            📚 Completely Free
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabTrigger value="overview">Overview</TabTrigger>
            <TabTrigger value="exercises">Exercises</TabTrigger>
            <TabTrigger value="templates">Templates</TabTrigger>
            <TabTrigger value="quiz">Quiz</TabTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {htmlCourseData.sections.map((section) => (
                <Card key={section.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{section.icon}</span>
                      <div>
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-sm">
                        {section.level}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {section.duration} min
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      {section.chapters.length} chapters
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Start Learning HTML</CardTitle>
                <CardDescription>
                  Get started with our interactive HTML tutorials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">What you'll learn:</h3>
                  <ul className="space-y-2">
                    {htmlCourseData.sections.slice(0, 3).map((section, index) => (
                      <li key={section.id} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{section.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exercises" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {htmlCourseData.exercises.map((exercise, index) => (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={cn(
                    'border-2 border-gray-200 rounded-lg p-6',
                    'hover:border-blue-400 transition-colors'
                  )}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{exercise.title}</h3>
                      <Badge className={cn(
                        'text-xs',
                        exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                        exercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      )}>
                        {exercise.difficulty.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{exercise.description}</p>
                    <CodeEditor
                      language={exercise.language}
                      value={exercise.code}
                      height="200px"
                      onChange={() => {}}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {htmlTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{template.icon}</span>
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Badge variant="outline" className="text-sm">
                        {template.level}
                      </Badge>
                      <CodeEditor
                        language="html"
                        value={template.code}
                        height="150px"
                        onChange={() => {}}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quiz" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-4" />
                  <span>HTML Quiz</span>
                </CardTitle>
                <CardDescription>
                  Test your HTML knowledge with our comprehensive quiz
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Take the quiz to test your understanding of HTML fundamentals
                </p>
                <Button
                  onClick={handleTakeQuiz}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Take Quiz
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center space-y-4">
          <Link href="/editor">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
              <Code2 className="w-4 h-4 mr-2" />
              Try Live Editor
            </Button>
          </Link>
          <p className="text-sm text-gray-600">
            Ready to try it yourself? Check out our interactive code editor.
          </p>
        </div>
      </div>
    </div>
  )
}