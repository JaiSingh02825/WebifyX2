import { NextRequest, NextResponse } from 'next/server'
import { publishingService } from '@/lib/publishing'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { siteId, customDomain, optimizeImages = true, enableAnalytics = false } = body

    if (!siteId) {
      return NextResponse.json(
        { success: false, error: 'Site ID is required' },
        { status: 400 }
      )
    }

    // Validate site exists and user has permission
    // In a real app, you would check authentication and authorization
    const site = await getSiteById(siteId)
    if (!site) {
      return NextResponse.json(
        { success: false, error: 'Site not found' },
        { status: 404 }
      )
    }

    // Publish the site
    const result = await publishingService.publishSite({
      siteId,
      customDomain,
      optimizeImages,
      enableAnalytics
    })

    // Update site status in database
    await updateSiteStatus(siteId, {
      isPublished: true,
      publishedUrl: result.url,
      publishedAt: result.publishedAt,
      sslEnabled: result.sslEnabled
    })

    return NextResponse.json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('Publishing error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to publish site'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const siteId = searchParams.get('siteId')

    if (!siteId) {
      return NextResponse.json(
        { success: false, error: 'Site ID is required' },
        { status: 400 }
      )
    }

    const status = await publishingService.getPublishingStatus(siteId)

    return NextResponse.json({
      success: true,
      data: status
    })

  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to check publishing status'
      },
      { status: 500 }
    )
  }
}

// Helper functions (these would connect to your database)
async function getSiteById(siteId: string) {
  // In a real app, this would query your database
  // For demo purposes, we'll return a mock site
  return {
    id: siteId,
    name: 'Demo Site',
    userId: 'demo-user-id',
    content: {
      elements: [],
      globalStyles: {}
    },
    isPublished: false,
    subdomain: `site-${siteId.slice(0, 8)}.webifyx.com`
  }
}

async function updateSiteStatus(siteId: string, updates: any) {
  // In a real app, this would update your database
  console.log('Updating site status:', siteId, updates)
}