'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useBuilderStore } from '@/lib/builder'
import { BuilderCanvas } from '@/components/builder/Canvas'
import { BuilderSidebar } from '@/components/builder/Sidebar'
import { BuilderProperties } from '@/components/builder/Properties'
import { BuilderToolbar } from '@/components/builder/Toolbar'
import { Button } from '@/components/ui/button'
import { Save, Eye, Undo, Redo, Desktop, Tablet, Smartphone } from 'lucide-react'

export default function BuilderPage() {
  const {
    currentSite,
    elements,
    selectedElement,
    isDirty,
    viewport,
    zoom,
    saveSite,
    undo,
    redo,
    setViewport,
    saveToHistory
  } = useBuilderStore()

  // Auto-save every 30 seconds
  useEffect(() => {
    if (!isDirty || !currentSite) return

    const autoSaveInterval = setInterval(() => {
      saveSite()
    }, 30000)

    return () => clearInterval(autoSaveInterval)
  }, [isDirty, currentSite, saveSite])

  // Warn before leaving if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  if (!currentSite) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">No Site Selected</h1>
          <p className="text-gray-600 mb-4">Please select a site to start building</p>
          <Button>Create New Site</Button>
        </div>
      </div>
    )
  }

  const viewportWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px'
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Toolbar */}
      <BuilderToolbar />

      {/* Main Builder Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <BuilderSidebar />

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Canvas Controls */}
          <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Button
                variant={viewport === 'desktop' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewport('desktop')}
              >
                <Desktop className="w-4 h-4 mr-1" />
                Desktop
              </Button>
              <Button
                variant={viewport === 'tablet' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewport('tablet')}
              >
                <Tablet className="w-4 h-4 mr-1" />
                Tablet
              </Button>
              <Button
                variant={viewport === 'mobile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewport('mobile')}
              >
                <Smartphone className="w-4 h-4 mr-1" />
                Mobile
              </Button>

              <div className="h-6 w-px bg-gray-300 mx-2" />

              <span className="text-sm text-gray-600">
                Zoom: {Math.round(zoom * 100)}%
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => undo()}
                disabled={elements.length === 0}
              >
                <Undo className="w-4 h-4 mr-1" />
                Undo
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => redo()}
                disabled={elements.length === 0}
              >
                <Redo className="w-4 h-4 mr-1" />
                Redo
              </Button>

              <div className="h-6 w-px bg-gray-300 mx-2" />

              <Button
                variant={isDirty ? 'default' : 'outline'}
                size="sm"
                onClick={() => saveSite()}
                disabled={!isDirty}
              >
                <Save className="w-4 h-4 mr-1" />
                {isDirty ? 'Save Changes' : 'Saved'}
              </Button>

              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 overflow-auto p-8">
            <div className="flex justify-center">
              <motion.div
                className="bg-white shadow-lg transition-all duration-300"
                style={{
                  width: viewportWidths[viewport],
                  height: viewport === 'mobile' ? '667px' : '100%',
                  transform: `scale(${zoom})`,
                  transformOrigin: 'top center'
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: zoom }}
                transition={{ duration: 0.2 }}
              >
                <BuilderCanvas />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Properties Panel */}
        <BuilderProperties />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-1 bg-gray-800 text-white text-sm">
        <div className="flex items-center space-x-4">
          <span>{currentSite.name}</span>
          <span className="text-gray-400">
            {elements.length} {elements.length === 1 ? 'element' : 'elements'}
          </span>
          {selectedElement && (
            <span className="text-blue-400">
              Selected: {selectedElement.type}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-400">
            {viewport} view
          </span>
          {isDirty && (
            <span className="text-yellow-400">
              Unsaved changes
            </span>
          )}
        </div>
      </div>
    </div>
  )
}