'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Filter,
  BookOpen,
  Clock,
  Star,
  Users,
  ChevronDown,
  Code,
  Layout,
  Globe,
  Database,
  Server,
  Smartphone,
  Palette,
  Shield
} from 'lucide-react'
import { useCoursesStore, useFilteredCourses } from '@/lib/courses'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// Sample course data
const sampleCourses = [
  {
    id: '1',
    title: 'HTML Fundamentals',
    slug: 'html-fundamentals',
    description: 'Learn the building blocks of web development with semantic HTML5, forms, accessibility, and modern best practices.',
    difficulty: 'beginner',
    duration: 180,
    thumbnail: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400&h=250&fit=crop',
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ['HTML', 'Web Development', 'Accessibility'],
    prerequisites: [],
    lessons: [],
    rating: 4.8,
    enrolledCount: 1250,
    level: 'Beginner'
  },
  {
    id: '2',
    title: 'CSS Mastery',
    slug: 'css-mastery',
    description: 'Master modern CSS with Flexbox, Grid, animations, responsive design, and advanced styling techniques.',
    difficulty: 'intermediate',
    duration: 240,
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ['CSS', 'Design', 'Responsive'],
    prerequisites: ['html-fundamentals'],
    lessons: [],
    rating: 4.9,
    enrolledCount: 980,
    level: 'Intermediate'
  },
  {
    id: '3',
    title: 'JavaScript Essentials',
    slug: 'javascript-essentials',
    description: 'Become proficient in JavaScript with DOM manipulation, async programming, ES6+, and modern JavaScript patterns.',
    difficulty: 'intermediate',
    duration: 300,
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop',
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ['JavaScript', 'Programming', 'ES6'],
    prerequisites: ['html-fundamentals'],
    lessons: [],
    rating: 4.7,
    enrolledCount: 1450,
    level: 'Intermediate'
  },
  {
    id: '4',
    title: 'React Development',
    slug: 'react-development',
    description: 'Build modern web applications with React, hooks, state management, and component-based architecture.',
    difficulty: 'intermediate',
    duration: 360,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ['React', 'JavaScript', 'Frontend'],
    prerequisites: ['javascript-essentials'],
    lessons: [],
    rating: 4.9,
    enrolledCount: 1100,
    level: 'Intermediate'
  },
  {
    id: '5',
    title: 'Next.js Full-Stack',
    slug: 'nextjs-fullstack',
    description: 'Master full-stack development with Next.js, SSR, API routes, deployment, and performance optimization.',
    difficulty: 'advanced',
    duration: 420,
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ['Next.js', 'React', 'Full-Stack'],
    prerequisites: ['react-development'],
    lessons: [],
    rating: 4.8,
    enrolledCount: 650,
    level: 'Advanced'
  },
  {
    id: '6',
    title: 'Advanced TypeScript',
    slug: 'advanced-typescript',
    description: 'Deep dive into TypeScript with advanced types, generics, decorators, and enterprise-grade patterns.',
    difficulty: 'advanced',
    duration: 300,
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop',
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ['TypeScript', 'JavaScript', 'Types'],
    prerequisites: ['javascript-essentials'],
    lessons: [],
    rating: 4.7,
    enrolledCount: 420,
    level: 'Advanced'
  }
]

const difficulties = [
  { value: 'beginner', label: 'Beginner', color: 'bg-green-100 text-green-800' },
  { value: 'intermediate', label: 'Intermediate', color: 'bg-blue-100 text-blue-800' },
  { value: 'advanced', label: 'Advanced', color: 'bg-purple-100 text-purple-800' }
]

const categories = [
  { name: 'Frontend', icon: Layout, color: 'text-blue-600' },
  { name: 'Backend', icon: Server, color: 'text-green-600' },
  { name: 'Database', icon: Database, color: 'text-orange-600' },
  { name: 'Mobile', icon: Smartphone, color: 'text-purple-600' },
  { name: 'Design', icon: Palette, color: 'text-pink-600' },
  { name: 'DevOps', icon: Shield, color: 'text-gray-600' }
]

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'rating'>('popular')
  const [showFilters, setShowFilters] = useState(false)

  // Initialize sample courses
  useEffect(() => {
    // In a real app, this would come from the API
    const { setCourses } = useCoursesStore.getState()
    setCourses(sampleCourses as any)
  }, [])

  const { courses, isLoading } = useCoursesStore()
  const filteredCourses = useFilteredCourses()

  // Apply filters
  const displayedCourses = filteredCourses.filter(course => {
    // Difficulty filter
    if (selectedDifficulty.length > 0 && !selectedDifficulty.includes(course.difficulty)) {
      return false
    }

    // Category filter (based on tags)
    if (selectedCategory && !course.tags.some(tag =>
      tag.toLowerCase().includes(selectedCategory.toLowerCase())
    )) {
      return false
    }

    return true
  })

  // Sort courses
  const sortedCourses = [...displayedCourses].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.enrolledCount - a.enrolledCount
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return b.createdAt.getTime() - a.createdAt.getTime()
      default:
        return 0
    }
  })

  const handleDifficultyToggle = (difficulty: string) => {
    setSelectedDifficulty(prev =>
      prev.includes(difficulty)
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedDifficulty([])
    setSelectedCategory('')
    setSortBy('popular')
  }

  const getDifficultyColor = (difficulty: string) => {
    const diff = difficulties.find(d => d.value === difficulty)
    return diff?.color || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Learn Web Development the Right Way
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Master modern web technologies through interactive courses, hands-on coding, and real-world projects.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for courses, topics, or technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 overflow-x-auto">
              <Button
                variant={selectedCategory === '' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('')}
              >
                All Courses
              </Button>
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.name)}
                    className="flex items-center space-x-1"
                  >
                    <Icon className={cn('w-4 h-4', category.color)} />
                    <span>{category.name}</span>
                  </Button>
                )
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-1"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              <ChevronDown className={cn(
                'w-4 h-4 transition-transform',
                showFilters && 'transform rotate-180'
              )} />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="lg:w-64 space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Difficulty Filter */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Difficulty</h3>
                    <div className="space-y-2">
                      {difficulties.map((difficulty) => (
                        <label key={difficulty.value} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedDifficulty.includes(difficulty.value)}
                            onChange={() => handleDifficultyToggle(difficulty.value)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{difficulty.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Sort By */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Sort By</h3>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="w-full"
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Courses Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {sortedCourses.length} {sortedCourses.length === 1 ? 'Course' : 'Courses'} Found
                </h2>
                <p className="text-gray-600 mt-1">
                  {selectedDifficulty.length > 0 && (
                    <span>
                      {selectedDifficulty.join(', ')} •{' '}
                    </span>
                  )}
                  {searchQuery && (
                    <span>
                      "{searchQuery}" •{' '}
                    </span>
                  )}
                  Showing {Math.min(sortedCourses.length, 12)} of {sortedCourses.length}
                </p>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                    <div className="relative">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={getDifficultyColor(course.difficulty)}>
                          {course.level}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {course.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="line-clamp-3">
                        {course.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {course.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {course.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{course.tags.length - 3}
                            </Badge>
                          )}
                        </div>

                        {/* Course Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{Math.floor(course.duration / 60)}h</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{course.enrolledCount}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>{course.rating}</span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <Button className="w-full">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Start Learning
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {sortedCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No courses found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                  <Button onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}