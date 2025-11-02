import { NextRequest, NextResponse } from 'next/server'

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
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    tags: ['HTML', 'Web Development', 'Accessibility'],
    prerequisites: [],
    rating: 4.8,
    enrolledCount: 1250,
    lessons: [
      {
        id: '1',
        courseId: '1',
        title: 'Introduction to HTML',
        description: 'Learn what HTML is and how it forms the foundation of web development.',
        videoUrl: 'https://example.com/video1.mp4',
        orderIndex: 1,
        duration: 15
      },
      {
        id: '2',
        courseId: '1',
        title: 'HTML Elements and Tags',
        description: 'Deep dive into HTML elements, tags, attributes, and semantic markup.',
        videoUrl: 'https://example.com/video2.mp4',
        orderIndex: 2,
        duration: 20
      }
    ]
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
    enrolledCount: 980,
    lessons: [
      {
        id: '3',
        courseId: '2',
        title: 'CSS Fundamentals',
        description: 'Learn the basics of CSS including selectors, properties, and the box model.',
        videoUrl: 'https://example.com/video3.mp4',
        orderIndex: 1,
        duration: 25
      }
    ]
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
    enrolledCount: 1450,
    lessons: []
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
    enrolledCount: 1100,
    lessons: []
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
    enrolledCount: 650,
    lessons: []
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
    enrolledCount: 420,
    lessons: []
  }
]

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    // Find course by slug
    const course = sampleCourses.find(c => c.slug === slug)

    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      )
    }

    // In a real app, you would also:
    // 1. Check if user is enrolled in this course
    // 2. Get user's progress for this course
    // 3. Return personalized content based on user's access level

    return NextResponse.json({
      success: true,
      data: course
    })

  } catch (error) {
    console.error('Get course error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get course'
      },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const body = await request.json()

    // In a real app, you would:
    // 1. Verify user authentication
    // 2. Check if user has permission to edit this course (instructor/admin)
    // 3. Validate input data
    // 4. Update course in database

    const course = sampleCourses.find(c => c.slug === slug)

    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      )
    }

    const updatedCourse = {
      ...course,
      ...body,
      updatedAt: new Date()
    }

    return NextResponse.json({
      success: true,
      data: updatedCourse
    })

  } catch (error) {
    console.error('Update course error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update course'
      },
      { status: 500 }
    )
  }
}