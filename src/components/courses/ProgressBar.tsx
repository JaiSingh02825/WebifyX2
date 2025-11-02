'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Circle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  progress: number
  total: number
  completed: number
  size?: 'sm' | 'md' | 'lg'
  showLabels?: boolean
  showIcon?: boolean
  color?: 'blue' | 'green' | 'purple' | 'orange'
  animated?: boolean
}

export function ProgressBar({
  progress,
  total,
  completed,
  size = 'md',
  showLabels = true,
  showIcon = true,
  color = 'blue',
  animated = true
}: ProgressBarProps) {
  const percentage = Math.round((completed / total) * 100)

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }

  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    orange: 'bg-orange-600'
  }

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  return (
    <div className="space-y-2">
      {showLabels && (
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            {showIcon && (
              completed === total ? (
                <CheckCircle className={cn(iconSizeClasses[size], 'text-green-600')} />
              ) : (
                <Circle className={cn(iconSizeClasses[size], 'text-gray-400')} />
              )
            )}
            <span className="font-medium text-gray-900">
              {completed} of {total} completed
            </span>
          </div>
          <span className="text-gray-600">
            {percentage}%
          </span>
        </div>
      )}

      <div className="relative">
        {/* Background */}
        <div className={cn(
          'w-full bg-gray-200 rounded-full overflow-hidden',
          sizeClasses[size]
        )}>
          {/* Progress Bar */}
          <motion.div
            className={cn(
              'h-full rounded-full transition-all duration-500 ease-out',
              colorClasses[color]
            )}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: animated ? 0.5 : 0 }}
          />
        </div>

        {/* Time estimate indicator */}
        {progress < completed && (
          <div
            className="absolute top-0 h-full w-0.5 bg-gray-400"
            style={{ left: `${(progress / total) * 100}%` }}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <Clock className="w-3 h-3 text-gray-400" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface LessonProgressProps {
  lessons: Array<{
    id: string
    title: string
    isCompleted: boolean
    isCurrent: boolean
    isLocked: boolean
    duration: number
  }>
  size?: 'sm' | 'md' | 'lg'
  showDuration?: boolean
  showTitles?: boolean
}

export function LessonProgress({
  lessons,
  size = 'md',
  showDuration = false,
  showTitles = false
}: LessonProgressProps) {
  const completedCount = lessons.filter(l => l.isCompleted).length
  const totalCount = lessons.length
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const iconSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  }

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  return (
    <div className="space-y-4">
      {/* Overall Progress */}
      <div className="flex items-center justify-between">
        <span className={cn('font-medium text-gray-900', textSizes[size])}>
          Course Progress
        </span>
        <span className={cn('text-gray-600', textSizes[size])}>
          {percentage}%
        </span>
      </div>

      <ProgressBar
        progress={completedCount}
        total={totalCount}
        completed={completedCount}
        size={size}
        showLabels={false}
        color="green"
      />

      {/* Individual Lessons */}
      <div className="space-y-2">
        {lessons.map((lesson, index) => (
          <div
            key={lesson.id}
            className={cn(
              'flex items-center space-x-3 p-2 rounded-lg transition-colors',
              lesson.isCurrent && 'bg-blue-50 border border-blue-200',
              !lesson.isCurrent && 'hover:bg-gray-50'
            )}
          >
            <div className="flex-shrink-0">
              {lesson.isCompleted ? (
                <div className={cn(
                  'rounded-full bg-green-100 flex items-center justify-center',
                  iconSizeClasses[size]
                )}>
                  <CheckCircle className={cn(
                    'text-green-600',
                    size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'
                  )} />
                </div>
              ) : lesson.isCurrent ? (
                <div className={cn(
                  'rounded-full bg-blue-100 flex items-center justify-center',
                  iconSizeClasses[size]
                )}>
                  <div className={cn(
                    'bg-blue-600 rounded-full',
                    size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'
                  )} />
                </div>
              ) : lesson.isLocked ? (
                <div className={cn(
                  'rounded-full bg-gray-100 flex items-center justify-center',
                  iconSizeClasses[size]
                )}>
                  <div className={cn(
                    'bg-gray-400 rounded-full',
                    size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'
                  )} />
                </div>
              ) : (
                <div className={cn(
                  'rounded-full bg-gray-100 flex items-center justify-center',
                  iconSizeClasses[size]
                )}>
                  <div className={cn(
                    'border-2 border-gray-300 rounded-full',
                    size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'
                  )} />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className={cn(
                  'font-medium truncate',
                  lesson.isCompleted ? 'text-gray-900' : lesson.isCurrent ? 'text-blue-600' : 'text-gray-500',
                  textSizes[size]
                )}>
                  {index + 1}. {lesson.title}
                </span>
                {showDuration && (
                  <span className={cn('text-gray-500', textSizes[size])}>
                    {lesson.duration}m
                  </span>
                )}
              </div>
              {showTitles && (
                <p className={cn('text-gray-600 mt-1', textSizes[size])}>
                  {lesson.isCompleted
                    ? 'Completed'
                    : lesson.isCurrent
                    ? 'In Progress'
                    : lesson.isLocked
                    ? 'Locked'
                    : 'Not Started'
                  }
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="pt-2 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            {completedCount} of {totalCount} lessons completed
          </span>
          <span className="font-medium text-gray-900">
            {Math.round((completedCount / totalCount) * 100)}%
          </span>
        </div>
      </div>
    </div>
  )
}

interface SkillProgressProps {
  skill: string
  level: number
  maxLevel?: number
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'blue' | 'green' | 'purple' | 'orange'
}

export function SkillProgress({
  skill,
  level,
  maxLevel = 5,
  showLabel = true,
  size = 'md',
  color = 'blue'
}: SkillProgressProps) {
  const percentage = (level / maxLevel) * 100

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }

  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    orange: 'bg-orange-600'
  }

  const getSkillLevel = (level: number) => {
    if (level <= 1) return 'Beginner'
    if (level <= 2) return 'Novice'
    if (level <= 3) return 'Intermediate'
    if (level <= 4) return 'Advanced'
    return 'Expert'
  }

  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-900">{skill}</span>
          <span className="text-sm text-gray-600">
            {getSkillLevel(level)} ({level}/{maxLevel})
          </span>
        </div>
      )}

      <div className="relative">
        <div className={cn(
          'w-full bg-gray-200 rounded-full overflow-hidden',
          sizeClasses[size]
        )}>
          <motion.div
            className={cn(
              'h-full rounded-full',
              colorClasses[color]
            )}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Level Indicators */}
      <div className="flex items-center justify-between">
        {Array.from({ length: maxLevel }, (_, i) => (
          <div
            key={i}
            className={cn(
              'w-2 h-2 rounded-full',
              i < level ? colorClasses[color] : 'bg-gray-300'
            )}
          />
        ))}
      </div>
    </div>
  )
}