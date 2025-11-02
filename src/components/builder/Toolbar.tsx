'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Save,
  Eye,
  EyeOff,
  Undo,
  Redo,
  Smartphone,
  Tablet,
  Desktop,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Grid,
  Settings,
  HelpCircle,
  Menu,
  X,
  Globe,
  FileText,
  Download,
  Share2,
  Plus
} from 'lucide-react'
import { useBuilderStore } from '@/lib/builder'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function BuilderToolbar() {
  const {
    currentSite,
    elements,
    isDirty,
    viewport,
    zoom,
    saveSite,
    undo,
    redo,
    setViewport,
    setZoom,
    saveToHistory
  } = useBuilderStore()

  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [showGrid, setShowGrid] = useState(true)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handleSave = async () => {
    await saveSite()
    // Show success message (could add toast notification here)
  }

  const handleUndo = () => {
    undo()
  }

  const handleRedo = () => {
    redo()
  }

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.1, 2))
  }

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.1, 0.25))
  }

  const handleResetZoom = () => {
    setZoom(1)
  }

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode)
  }

  const toggleGrid = () => {
    setShowGrid(!showGrid)
  }

  const handlePublish = () => {
    // Open publish modal
    console.log('Publish site:', currentSite?.id)
  }

  const handleExport = () => {
    // Export site
    console.log('Export site:', currentSite?.id)
  }

  const handleShare = () => {
    // Share site
    console.log('Share site:', currentSite?.id)
  }

  const handleNewPage = () => {
    // Add new page
    console.log('Add new page')
  }

  const canUndo = elements.length > 0
  const canRedo = false // This would need to be tracked in the store

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Desktop Toolbar */}
      <div className="hidden md:flex items-center justify-between px-4 py-2">
        {/* Left Section */}
        <div className="flex items-center space-x-2">
          {/* Site Name */}
          <div className="flex items-center space-x-2 px-3 py-1 bg-gray-50 rounded-lg">
            <Globe className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">
              {currentSite?.name || 'Untitled Site'}
            </span>
            {isDirty && (
              <div className="w-2 h-2 bg-yellow-500 rounded-full" title="Unsaved changes" />
            )}
          </div>

          <div className="w-px h-6 bg-gray-300" />

          {/* Save */}
          <Button
            variant={isDirty ? 'default' : 'outline'}
            size="sm"
            onClick={handleSave}
            disabled={!isDirty}
          >
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>

          {/* Undo/Redo */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleUndo}
            disabled={!canUndo}
          >
            <Undo className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRedo}
            disabled={!canRedo}
          >
            <Redo className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-gray-300" />

          {/* Viewport Controls */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewport === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewport('desktop')}
              className="h-8"
            >
              <Desktop className="w-4 h-4" />
            </Button>
            <Button
              variant={viewport === 'tablet' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewport('tablet')}
              className="h-8"
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={viewport === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewport('mobile')}
              className="h-8"
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              className="h-8 w-8 p-0"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>

            <div className="px-2 py-1 bg-gray-100 rounded min-w-[60px] text-center">
              <span className="text-sm font-medium text-gray-700">
                {Math.round(zoom * 100)}%
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              className="h-8 w-8 p-0"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleResetZoom}
              className="h-8 w-8 p-0"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Center Section */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleGrid}
            className={cn(showGrid && 'bg-blue-50 text-blue-600 border-blue-200')}
          >
            <Grid className="w-4 h-4 mr-1" />
            Grid
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={togglePreviewMode}
            className={cn(isPreviewMode && 'bg-blue-50 text-blue-600 border-blue-200')}
          >
            {isPreviewMode ? (
              <>
                <EyeOff className="w-4 h-4 mr-1" />
                Edit
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </>
            )}
          </Button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewPage}
          >
            <Plus className="w-4 h-4 mr-1" />
            Page
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
          >
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={handlePublish}
          >
            <Globe className="w-4 h-4 mr-1" />
            Publish
          </Button>

          <div className="w-px h-6 bg-gray-300" />

          <Button
            variant="outline"
            size="sm"
          >
            <Settings className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
          >
            <HelpCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Toolbar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Site Name and Save */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>

            <div className="flex items-center space-x-1">
              <Globe className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900 truncate">
                {currentSite?.name || 'Untitled'}
              </span>
            </div>
          </div>

          {/* Main Actions */}
          <div className="flex items-center space-x-1">
            <Button
              variant={isDirty ? 'default' : 'outline'}
              size="sm"
              onClick={handleSave}
              disabled={!isDirty}
            >
              <Save className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={togglePreviewMode}
            >
              {isPreviewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={handlePublish}
            >
              <Globe className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-gray-200 bg-gray-50"
          >
            <div className="px-4 py-2 space-y-2">
              {/* Viewport Controls */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">View</span>
                <div className="flex items-center space-x-1">
                  <Button
                    variant={viewport === 'desktop' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewport('desktop')}
                    className="h-8 px-2"
                  >
                    <Desktop className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewport === 'tablet' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewport('tablet')}
                    className="h-8 px-2"
                  >
                    <Tablet className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewport === 'mobile' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewport('mobile')}
                    className="h-8 px-2"
                  >
                    <Smartphone className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Zoom</span>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleZoomOut}
                    className="h-8 w-8 p-0"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-gray-600 min-w-[50px] text-center">
                    {Math.round(zoom * 100)}%
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleZoomIn}
                    className="h-8 w-8 p-0"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Tools */}
              <div className="flex items-center space-x-2 pt-2 border-t border-gray-200">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleGrid}
                  className={cn(showGrid && 'bg-blue-50 text-blue-600 border-blue-200')}
                >
                  <Grid className="w-4 h-4 mr-1" />
                  Grid
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleUndo}
                  disabled={!canUndo}
                >
                  <Undo className="w-4 h-4 mr-1" />
                  Undo
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRedo}
                  disabled={!canRedo}
                >
                  <Redo className="w-4 h-4 mr-1" />
                  Redo
                </Button>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 pt-2 border-t border-gray-200">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNewPage}
                  className="flex-1"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  New Page
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExport}
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="flex-1"
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-gray-900 text-white text-xs px-4 py-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span>{elements.length} elements</span>
            <span>{viewport} view</span>
            {isDirty && <span className="text-yellow-400">• Unsaved changes</span>}
          </div>
          <div className="flex items-center space-x-4">
            <span>{currentSite?.name || 'Untitled Site'}</span>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}