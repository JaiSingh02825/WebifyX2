export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ApiError {
  code: string
  message: string
  details?: any
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface CreateSiteRequest {
  name: string
  subdomain: string
  template?: string
}

export interface UpdateSiteRequest {
  name?: string
  content?: any
  isPublished?: boolean
}

export interface PublishSiteRequest {
  siteId: string
  customDomain?: string
}

export interface PublishSiteResponse {
  url: string
  publishedAt: Date
  sslEnabled: boolean
  cdnUrl: string
}

export interface CreateUserRequest {
  email: string
  password: string
  username: string
  fullName: string
}

export interface UpdateUserRequest {
  username?: string
  fullName?: string
  avatarUrl?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  user: {
    id: string
    email: string
    username: string
    fullName: string
    avatarUrl?: string
    subscriptionTier: 'free' | 'pro' | 'enterprise'
  }
  token: string
  refreshToken: string
}

export interface CreateCourseRequest {
  title: string
  slug: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: number
  tags: string[]
  prerequisites?: string[]
}

export interface UpdateCourseRequest {
  title?: string
  description?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  duration?: number
  tags?: string[]
  prerequisites?: string[]
  isPublished?: boolean
}

export interface SubmitQuizRequest {
  quizId: string
  answers: Array<{
    questionId: string
    answer: string | number
  }>
  timeSpent: number
}

export interface SubmitQuizResponse {
  score: number
  totalPoints: number
  percentage: number
  passed: boolean
  feedback: Array<{
    questionId: string
    isCorrect: boolean
    explanation: string
  }>
}