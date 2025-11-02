import { NextRequest, NextResponse } from 'next/server'

// Sample course data (in a real app, this would come from your database)
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
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    tags: ['HTML', 'Web Development', 'Accessibility'],
    prerequisites: [],
    rating: 4.8,
    enrolledCount: 1250
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
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-20'),
    tags: ['CSS', 'Design', 'Responsive'],
    prerequisites: ['html-fundamentals'],
    rating: 4.9,
    enrolledCount: 980
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
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-25'),
    tags: ['JavaScript', 'Programming', 'ES6'],
    prerequisites: ['html-fundamentals'],
    rating: 4.7,
    enrolledCount: 1450
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
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-30'),
    tags: ['React', 'JavaScript', 'Frontend'],
    prerequisites: ['javascript-essentials'],
    rating: 4.9,
    enrolledCount: 1100
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
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-05'),
    tags: ['Next.js', 'React', 'Full-Stack'],
    prerequisites: ['react-development'],
    rating: 4.8,
    enrolledCount: 650
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
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-02-10'),
    tags: ['TypeScript', 'JavaScript', 'Types'],
    prerequisites: ['javascript-essentials'],
    rating: 4.7,
    enrolledCount: 420
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const difficulty = searchParams.get('difficulty')
    const tags = searchParams.get('tags')?.split(',').filter(Boolean)
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    // Filter courses based on query parameters
    let filteredCourses = sampleCourses.filter(course => {
      // Only return published courses
      if (!course.isPublished) return false

      // Filter by difficulty
      if (difficulty && course.difficulty !== difficulty) return false

      // Filter by tags
      if (tags && tags.length > 0) {
        const hasMatchingTag = tags.some(tag =>
          course.tags.some(courseTag =>
            courseTag.toLowerCase().includes(tag.toLowerCase())
          )
        )
        if (!hasMatchingTag) return false
      }

      // Filter by search query
      if (search) {
        const searchLower = search.toLowerCase()
        const matchesSearch =
          course.title.toLowerCase().includes(searchLower) ||
          course.description.toLowerCase().includes(searchLower) ||
          course.tags.some(tag => tag.toLowerCase().includes(searchLower))

        if (!matchesSearch) return false
      }

      return true
    })

    // Sort courses
    filteredCourses.sort((a, b) => {
      let aValue: any = a[sortBy as keyof typeof a]
      let bValue: any = b[sortBy as keyof typeof b]

      // Handle date sorting
      if (aValue instanceof Date) aValue = aValue.getTime()
      if (bValue instanceof Date) bValue = bValue.getTime()

      if (sortOrder === 'desc') {
        return bValue > aValue ? 1 : -1
      } else {
        return aValue > bValue ? 1 : -1
      }
    })

    // Pagination
    const total = filteredCourses.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: paginatedCourses,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    })

  } catch (error) {
    console.error('Get courses error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get courses'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      slug,
      description,
      difficulty,
      duration,
      tags,
      prerequisites
    } = body

    // Validate required fields
    if (!title || !slug || !description) {
      return NextResponse.json(
        { success: false, error: 'Title, slug, and description are required' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingCourse = sampleCourses.find(c => c.slug === slug)
    if (existingCourse) {
      return NextResponse.json(
        { success: false, error: 'Course with this slug already exists' },
        { status: 409 }
      )
    }

    // In a real app, you would:
    // 1. Verify user authentication and authorization (instructor/admin role)
    // 2. Validate all input data
    // 3. Create course in database
    // 4. Return created course

    const newCourse = {
      id: Date.now().toString(),
      title,
      slug,
      description,
      difficulty: difficulty || 'beginner',
      duration: duration || 60,
      thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop',
      isPublished: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: tags || [],
      prerequisites: prerequisites || [],
      rating: 0,
      enrolledCount: 0
    }

    return NextResponse.json({
      success: true,
      data: newCourse
    }, { status: 201 })

  } catch (error) {
    console.error('Create course error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create course'
      },
      { status: 500 }
    )
  }
}