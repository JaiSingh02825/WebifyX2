'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Layout,
  Type,
  Image,
  MousePointer,
  Square,
  Video,
  Mail,
  Play,
  Grid3X3,
  Code,
  Plus,
  ChevronDown,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ElementCategory {
  id: string
  name: string
  icon: React.ComponentType<any>
  elements: ElementItem[]
}

interface ElementItem {
  type: string
  label: string
  description: string
  icon: React.ComponentType<any>
  category: string
}

const elementCategories: ElementCategory[] = [
  {
    id: 'layout',
    name: 'Layout',
    icon: Layout,
    elements: [
      {
        type: 'container',
        label: 'Container',
        description: 'A flexible container for other elements',
        icon: Square,
        category: 'layout'
      },
      {
        type: 'grid',
        label: 'Grid',
        description: 'Create grid layouts',
        icon: Grid3X3,
        category: 'layout'
      },
      {
        type: 'header',
        label: 'Header',
        description: 'Page header section',
        icon: Layout,
        category: 'layout'
      },
      {
        type: 'hero',
        label: 'Hero Section',
        description: 'Large hero section with call-to-action',
        icon: Layout,
        category: 'layout'
      },
      {
        type: 'features',
        label: 'Features',
        description: 'Feature showcase section',
        icon: Grid3X3,
        category: 'layout'
      },
      {
        type: 'footer',
        label: 'Footer',
        description: 'Page footer section',
        icon: Layout,
        category: 'layout'
      }
    ]
  },
  {
    id: 'content',
    name: 'Content',
    icon: Type,
    elements: [
      {
        type: 'text',
        label: 'Text',
        description: 'Add text content',
        icon: Type,
        category: 'content'
      },
      {
        type: 'heading',
        label: 'Heading',
        description: 'Add headings (H1-H6)',
        icon: Type,
        category: 'content'
      },
      {
        type: 'image',
        label: 'Image',
        description: 'Add images',
        icon: Image,
        category: 'content'
      },
      {
        type: 'button',
        label: 'Button',
        description: 'Clickable button',
        icon: MousePointer,
        category: 'content'
      },
      {
        type: 'video',
        label: 'Video',
        description: 'Embed video content',
        icon: Video,
        category: 'content'
      }
    ]
  },
  {
    id: 'interactive',
    name: 'Interactive',
    icon: MousePointer,
    elements: [
      {
        type: 'form',
        label: 'Contact Form',
        description: 'Contact form with fields',
        icon: Mail,
        category: 'interactive'
      },
      {
        type: 'button',
        label: 'Newsletter Signup',
        description: 'Email signup form',
        icon: Mail,
        category: 'interactive'
      },
      {
        type: 'button',
        label: 'Social Links',
        description: 'Social media links',
        icon: MousePointer,
        category: 'interactive'
      }
    ]
  },
  {
    id: 'advanced',
    name: 'Advanced',
    icon: Code,
    elements: [
      {
        type: 'embed',
        label: 'Custom HTML',
        description: 'Add custom HTML code',
        icon: Code,
        category: 'advanced'
      },
      {
        type: 'embed',
        label: 'Embed Code',
        description: 'Embed external content',
        icon: Code,
        category: 'advanced'
      }
    ]
  }
]

export function BuilderSidebar() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['layout', 'content'])
  const [searchQuery, setSearchQuery] = useState('')

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleDragStart = (event: React.DragEvent, elementType: string) => {
    event.dataTransfer.setData('text/plain', elementType)
    event.dataTransfer.effectAllowed = 'copy'
  }

  const filteredCategories = elementCategories.map(category => ({
    ...category,
    elements: category.elements.filter(element =>
      element.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      element.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.elements.length > 0)

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Elements</h2>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search elements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Categories and Elements */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredCategories.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No elements found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCategories.map((category) => {
              const isExpanded = expandedCategories.includes(category.id)
              const Icon = category.icon

              return (
                <motion.div
                  key={category.id}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                  initial={false}
                >
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-gray-900">{category.name}</span>
                      <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                        {category.elements.length}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </motion.div>
                  </button>

                  {/* Elements */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-2 space-y-1">
                          {category.elements.map((element) => {
                            const ElementIcon = element.icon

                            return (
                              <motion.div
                                key={element.type}
                                draggable
                                onDragStart={(e) => handleDragStart(e, element.type)}
                                className="flex items-center space-x-3 p-3 rounded-lg cursor-move hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-200 group"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="flex-shrink-0">
                                  <ElementIcon className="w-5 h-5 text-gray-600 group-hover:text-blue-500 transition-colors" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {element.label}
                                  </p>
                                  <p className="text-xs text-gray-500 truncate">
                                    {element.description}
                                  </p>
                                </div>
                                <Plus className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                              </motion.div>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500">
          <p className="mb-1">💡 Tip: Drag elements to the canvas</p>
          <p>Click elements to select and edit</p>
        </div>
      </div>
    </div>
  )
}