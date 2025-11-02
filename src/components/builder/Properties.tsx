'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Settings,
  Type,
  Palette,
  Layout,
  MousePointer,
  Image as ImageIcon,
  Link,
  ChevronDown,
  ChevronRight
} from 'lucide-react'
import { useBuilderStore } from '@/lib/builder'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Element } from '@/types'

interface PropertySection {
  id: string
  name: string
  icon: React.ComponentType<any>
  component: React.ComponentType<{ element: Element }>
}

export function BuilderProperties() {
  const { selectedElement, updateElement } = useBuilderStore()
  const [expandedSections, setExpandedSections] = useState<string[]>(['content', 'styles'])

  if (!selectedElement) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Properties</h2>
        </div>
        <div className="flex-1 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <Settings className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-sm">Select an element to edit its properties</p>
          </div>
        </div>
      </div>
    )
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const propertySections: PropertySection[] = [
    {
      id: 'content',
      name: 'Content',
      icon: Type,
      component: ContentProperties
    },
    {
      id: 'styles',
      name: 'Styles',
      icon: Palette,
      component: StyleProperties
    },
    {
      id: 'layout',
      name: 'Layout',
      icon: Layout,
      component: LayoutProperties
    },
    {
      id: 'actions',
      name: 'Actions',
      icon: MousePointer,
      component: ActionProperties
    }
  ]

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Properties</h2>
        <p className="text-sm text-gray-500 mt-1">
          {selectedElement.type} element
        </p>
      </div>

      {/* Property Sections */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {propertySections.map((section) => {
            const isExpanded = expandedSections.includes(section.id)
            const Icon = section.icon
            const Component = section.component

            return (
              <motion.div
                key={section.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
                initial={false}
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-900">{section.name}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </motion.div>
                </button>

                {/* Section Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4">
                        <Component element={selectedElement} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500">
          Element ID: {selectedElement.id}
        </div>
      </div>
    </div>
  )
}

// Content Properties Component
function ContentProperties({ element }: { element: Element }) {
  const { updateElement } = useBuilderStore()

  const updateProp = (key: string, value: any) => {
    updateElement(element.id, {
      props: {
        ...element.props,
        [key]: value
      }
    })
  }

  return (
    <div className="space-y-4">
      {element.type === 'text' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Text Content
          </label>
          <textarea
            value={element.props.text || ''}
            onChange={(e) => updateProp('text', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="Enter text content..."
          />
        </div>
      )}

      {element.type === 'heading' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heading Text
            </label>
            <input
              type="text"
              value={element.props.text || ''}
              onChange={(e) => updateProp('text', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter heading text..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heading Level
            </label>
            <select
              value={element.props.level || 2}
              onChange={(e) => updateProp('level', parseInt(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={1}>H1</option>
              <option value={2}>H2</option>
              <option value={3}>H3</option>
              <option value={4}>H4</option>
              <option value={5}>H5</option>
              <option value={6}>H6</option>
            </select>
          </div>
        </>
      )}

      {element.type === 'button' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Button Text
          </label>
          <input
            type="text"
            value={element.props.text || ''}
            onChange={(e) => updateProp('text', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter button text..."
          />
        </div>
      )}

      {element.type === 'image' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={element.props.src || ''}
              onChange={(e) => updateProp('src', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter image URL..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alt Text
            </label>
            <input
              type="text"
              value={element.props.alt || ''}
              onChange={(e) => updateProp('alt', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter alt text for accessibility..."
            />
          </div>
        </>
      )}

      {element.type === 'button' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Link URL
          </label>
          <input
            type="url"
            value={element.props.href || ''}
            onChange={(e) => updateProp('href', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter link URL..."
          />
        </div>
      )}
    </div>
  )
}

// Style Properties Component
function StyleProperties({ element }: { element: Element }) {
  const { updateElement } = useBuilderStore()

  const updateStyle = (key: string, value: any) => {
    updateElement(element.id, {
      styles: {
        ...element.styles,
        [key]: value
      }
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Background Color
        </label>
        <input
          type="color"
          value={element.styles.backgroundColor || '#ffffff'}
          onChange={(e) => updateStyle('backgroundColor', e.target.value)}
          className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Text Color
        </label>
        <input
          type="color"
          value={element.styles.color || '#000000'}
          onChange={(e) => updateStyle('color', e.target.value)}
          className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Font Size
        </label>
        <input
          type="text"
          value={element.styles.fontSize || ''}
          onChange={(e) => updateStyle('fontSize', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., 16px, 1rem"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Padding
        </label>
        <input
          type="text"
          value={element.styles.padding || ''}
          onChange={(e) => updateStyle('padding', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., 16px, 1rem"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Margin
        </label>
        <input
          type="text"
          value={element.styles.margin || ''}
          onChange={(e) => updateStyle('margin', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., 16px, 1rem"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Border Radius
        </label>
        <input
          type="text"
          value={element.styles.borderRadius || ''}
          onChange={(e) => updateStyle('borderRadius', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., 4px, 50%"
        />
      </div>

      {(element.type === 'text' || element.type === 'heading') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Text Alignment
          </label>
          <select
            value={element.styles.textAlign || 'left'}
            onChange={(e) => updateStyle('textAlign', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
      )}
    </div>
  )
}

// Layout Properties Component
function LayoutProperties({ element }: { element: Element }) {
  const { updateElement } = useBuilderStore()

  const updateStyle = (key: string, value: any) => {
    updateElement(element.id, {
      styles: {
        ...element.styles,
        [key]: value
      }
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Width
        </label>
        <input
          type="text"
          value={element.styles.width || ''}
          onChange={(e) => updateStyle('width', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., 100%, 300px, auto"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Height
        </label>
        <input
          type="text"
          value={element.styles.height || ''}
          onChange={(e) => updateStyle('height', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., auto, 200px, 50%"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Display
        </label>
        <select
          value={element.styles.display || 'block'}
          onChange={(e) => updateStyle('display', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="block">Block</option>
          <option value="inline">Inline</option>
          <option value="inline-block">Inline Block</option>
          <option value="flex">Flex</option>
          <option value="grid">Grid</option>
          <option value="none">None</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Z-Index
        </label>
        <input
          type="number"
          value={element.zIndex || 0}
          onChange={(e) => updateElement(element.id, { zIndex: parseInt(e.target.value) })}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  )
}

// Action Properties Component
function ActionProperties({ element }: { element: Element }) {
  const { updateElement } = useBuilderStore()

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Action properties for the {element.type} element will be available in the next update.
        </p>
      </div>
    </div>
  )
}