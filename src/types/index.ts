export * from './builder'
export * from './courses'
export * from './api'

// Common types used across the application
export interface User {
  id: string
  email: string
  username: string
  fullName: string
  avatarUrl?: string
  subscriptionTier: 'free' | 'pro' | 'enterprise'
  createdAt: Date
  updatedAt: Date
}

export interface Theme {
  mode: 'light' | 'dark' | 'system'
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
    muted: string
    border: string
  }
}

export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: Date
  read: boolean
  action?: {
    label: string
    url: string
  }
}

export interface SearchFilters {
  query?: string
  difficulty?: string[]
  tags?: string[]
  duration?: {
    min?: number
    max?: number
  }
  price?: {
    min?: number
    max?: number
  }
}

export interface SortOptions {
  field: string
  direction: 'asc' | 'desc'
}