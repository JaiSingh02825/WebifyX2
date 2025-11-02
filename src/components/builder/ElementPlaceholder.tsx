'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Plus, Layout, Type, Image, MousePointer, Square } from 'lucide-react'

export function ElementPlaceholder() {
  const handleDragStart = (event: React.DragEvent, elementType: string) => {
    event.dataTransfer.setData('text/plain', elementType)
    event.dataTransfer.effectAllowed = 'copy'
  }

  const quickAddElements = [
    { type: 'text', label: 'Text', icon: Type, description: 'Add text content' },
    { type: 'heading', label: 'Heading', icon: Type, description: 'Add a heading' },
    { type: 'button', label: 'Button', icon: MousePointer, description: 'Add a button' },
    { type: 'image', label: 'Image', icon: Image, description: 'Add an image' },
    { type: 'container', label: 'Container', icon: Square, description: 'Add a container' },
    { type: 'header', label: 'Header', icon: Layout, description: 'Add a header' }
  ]

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full min-h-[400px] text-gray-400"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <Layout className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-semibold text-gray-600 mb-2">
          Start building your website
        </h2>
        <p className="text-sm text-gray-500">
          Drag elements from the sidebar or use quick add below
        </p>
      </div>

      {/* Quick Add Elements */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg">
        {quickAddElements.map((element) => {
          const Icon = element.icon
          return (
            <motion.div
              key={element.type}
              draggable
              onDragStart={(e) => handleDragStart(e, element.type)}
              className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-move hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex flex-col items-center text-center">
                <Icon className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" />
                <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600">
                  {element.label}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  {element.description}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg max-w-md">
        <h3 className="font-medium text-gray-600 mb-2">Quick Tips:</h3>
        <ul className="text-sm text-gray-500 space-y-1">
          <li>• Drag elements from the sidebar to add them</li>
          <li>• Click on elements to select and edit them</li>
          <li>• Use the properties panel to customize styles</li>
          <li>• Press Ctrl+S to save your work</li>
        </ul>
      </div>
    </motion.div>
  )
}