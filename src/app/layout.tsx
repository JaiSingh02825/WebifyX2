import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: 'WebifyX - Build & Learn Web Development',
    template: '%s | WebifyX'
  },
  description: 'Build professional websites with our drag-and-drop builder and learn web development through interactive courses with live coding exercises.',
  keywords: [
    'website builder',
    'web development',
    'learn to code',
    'interactive courses',
    'drag and drop',
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Next.js'
  ],
  authors: [{ name: 'WebifyX Team' }],
  creator: 'WebifyX',
  publisher: 'WebifyX',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://webifyx.com',
    siteName: 'WebifyX',
    title: 'WebifyX - Build & Learn Web Development',
    description: 'Build professional websites with our drag-and-drop builder and learn web development through interactive courses.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WebifyX - Build & Learn Web Development'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebifyX - Build & Learn Web Development',
    description: 'Build professional websites with our drag-and-drop builder and learn web development through interactive courses.',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* DNS prefetch for likely resources */}
        <link rel="dns-prefetch" href="https://api.webifyx.com" />
        <link rel="dns-prefetch" href="https://cdn.webifyx.com" />

        {/* Favicon and icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color */}
        <meta name="theme-color" content="#3b82f6" />

        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        {/* Performance monitoring script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Performance monitoring
              if ('performance' in window && 'measure' in window.performance) {
                window.addEventListener('load', () => {
                  setTimeout(() => {
                    const perfData = window.performance.timing
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
                    const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart

                    console.log('Page Performance:')
                    console.log('Page Load Time:', pageLoadTime + 'ms')
                    console.log('DOM Content Loaded:', domContentLoaded + 'ms')

                    // Send to analytics in production
                    if (typeof gtag !== 'undefined') {
                      gtag('event', 'page_performance', {
                        page_load_time: pageLoadTime,
                        dom_content_loaded: domContentLoaded
                      })
                    }
                  }, 0)
                })
              }
            `
          }}
        />

        {/* Main content */}
        {children}

        {/* Service Worker registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                      console.log('SW registered: ', registration)
                    })
                    .catch((registrationError) => {
                      console.log('SW registration failed: ', registrationError)
                    })
                })
              }
            `
          }}
        />
      </body>
    </html>
  )
}