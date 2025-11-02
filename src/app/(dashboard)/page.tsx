'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Plus,
  Globe,
  Eye,
  Users,
  TrendingUp,
  BarChart3,
  BookOpen,
  Clock,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  Award,
  Activity,
  Calendar,
  MoreHorizontal,
  ExternalLink,
  Edit,
  Play
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// Sample data
const recentSites = [
  {
    id: '1',
    name: 'My Portfolio',
    subdomain: 'portfolio.webifyx.com',
    views: 1250,
    visitors: 890,
    change: '+12%',
    isPositive: true,
    lastUpdated: new Date('2024-01-20')
  },
  {
    id: '2',
    name: 'Business Landing Page',
    subdomain: 'business-demo.webifyx.com',
    views: 3420,
    visitors: 2150,
    change: '+8%',
    isPositive: true,
    lastUpdated: new Date('2024-01-18')
  },
  {
    id: '3',
    name: 'Tech Blog',
    subdomain: 'tech-blog.webifyx.com',
    views: 5670,
    visitors: 3420,
    change: '-3%',
    isPositive: false,
    lastUpdated: new Date('2024-01-22')
  }
]

const recentCourses = [
  {
    id: '1',
    title: 'HTML Fundamentals',
    progress: 75,
    totalLessons: 12,
    completedLessons: 9,
    thumbnail: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=80&h=60&fit=crop',
    lastAccessed: new Date('2024-01-25')
  },
  {
    id: '2',
    title: 'CSS Mastery',
    progress: 30,
    totalLessons: 16,
    completedLessons: 5,
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=60&fit=crop',
    lastAccessed: new Date('2024-01-24')
  },
  {
    id: '3',
    title: 'JavaScript Essentials',
    progress: 10,
    totalLessons: 20,
    completedLessons: 2,
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=80&h=60&fit=crop',
    lastAccessed: new Date('2024-01-20')
  }
]

const upcomingTasks = [
  {
    id: '1',
    title: 'Complete CSS Grid lesson',
    type: 'course',
    dueDate: new Date('2024-01-30'),
    priority: 'high'
  },
  {
    id: '2',
    title: 'Publish restaurant website',
    type: 'site',
    dueDate: new Date('2024-02-01'),
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Take JavaScript quiz',
    type: 'quiz',
    dueDate: new Date('2024-01-28'),
    priority: 'low'
  }
]

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')

  const stats = {
    totalSites: 4,
    publishedSites: 3,
    totalViews: 10340,
    totalVisitors: 6460,
    coursesEnrolled: 3,
    coursesCompleted: 1,
    averageProgress: 38,
    skillPoints: 250
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="w-4 h-4" />
      case 'site': return <Globe className="w-4 h-4" />
      case 'quiz': return <Target className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your sites and learning progress.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center bg-gray-100 rounded-lg p-1">
            {(['7d', '30d', '90d'] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeRange(range)}
                className="h-8 px-3"
              >
                {range === '7d' ? '7 days' : range === '30d' ? '30 days' : '90 days'}
              </Button>
            ))}
          </div>

          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create New Site
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sites</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalSites}</p>
                  <div className="flex items-center space-x-1 mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600">+1 this month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{formatNumber(stats.totalViews)}</p>
                  <div className="flex items-center space-x-1 mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600">+24% vs last period</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Courses Enrolled</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.coursesEnrolled}</p>
                  <div className="flex items-center space-x-1 mt-2">
                    <Award className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-gray-600">{stats.coursesCompleted} completed</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Skill Points</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.skillPoints}</p>
                  <div className="flex items-center space-x-1 mt-2">
                    <Zap className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-gray-600">Level 5</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sites */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Sites</CardTitle>
                  <CardDescription>Your most recently updated websites</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/sites">
                    View All
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSites.map((site, index) => (
                  <motion.div
                    key={site.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Globe className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{site.name}</p>
                        <p className="text-sm text-gray-500">{site.subdomain}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{formatNumber(site.views)} views</p>
                        <div className="flex items-center space-x-1">
                          {site.isPositive ? (
                            <ArrowUpRight className="w-3 h-3 text-green-600" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3 text-red-600" />
                          )}
                          <span className={cn(
                            'text-xs',
                            site.isPositive ? 'text-green-600' : 'text-red-600'
                          )}>
                            {site.change}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Tasks</CardTitle>
                  <CardDescription>Your next deadlines and goals</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.6 + index * 0.1 }}
                    className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {getTaskIcon(task.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{task.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {task.dueDate.toLocaleDateString()}
                        </Badge>
                        <Badge className={cn('text-xs', getPriorityColor(task.priority))}>
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Play className="w-3 h-3" />
                    </Button>
                  </motion.div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                View All Tasks
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Courses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Continue Learning</CardTitle>
                <CardDescription>Resume your recent courses and track progress</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/courses">
                  Browse Courses
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.7 + index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-16 h-12 rounded object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                        {course.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {course.completedLessons} of {course.totalLessons} lessons
                      </p>

                      {/* Progress bar */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>

                      <Button size="sm" className="w-full mt-3">
                        Resume
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}