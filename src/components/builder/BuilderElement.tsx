'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useDraggable } from '@dnd-kit/core'
import { GripVertical, Trash2, Copy } from 'lucide-react'
import { useBuilderStore } from '@/lib/builder'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Element } from '@/types'

interface BuilderElementProps {
  element: Element
  isSelected: boolean
  isDragOver: boolean
  onClick: (element: Element, event: React.MouseEvent) => void
}

export function BuilderElement({ element, isSelected, isDragOver, onClick }: BuilderElementProps) {
  const {
    setSelectedElement,
    deleteElement,
    duplicateElement,
    updateElement
  } = useBuilderStore()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging
  } = useDraggable({
    id: element.id,
    data: {
      type: element.type,
      fromCanvas: true
    }
  })

  const handleElementClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    onClick(element, event)
  }

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation()
    deleteElement(element.id)
  }

  const handleDuplicate = (event: React.MouseEvent) => {
    event.stopPropagation()
    duplicateElement(element.id)
  }

  const handlePropChange = (key: string, value: any) => {
    updateElement(element.id, {
      props: {
        ...element.props,
        [key]: value
      }
    })
  }

  const handleStyleChange = (key: string, value: any) => {
    updateElement(element.id, {
      styles: {
        ...element.styles,
        [key]: value
      }
    })
  }

  const renderElementContent = () => {
    switch (element.type) {
      case 'text':
        return (
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handlePropChange('text', e.target.textContent)}
            className="outline-none"
            style={element.styles}
          >
            {element.props.text || 'Edit this text'}
          </p>
        )

      case 'heading':
        const HeadingTag = `h${element.props.level || 2}` as keyof JSX.IntrinsicElements
        return (
          <HeadingTag
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handlePropChange('text', e.target.textContent)}
            className="outline-none"
            style={element.styles}
          >
            {element.props.text || 'Edit this heading'}
          </HeadingTag>
        )

      case 'button':
        return (
          <button
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handlePropChange('text', e.target.textContent)}
            className="outline-none"
            style={element.styles}
          >
            {element.props.text || 'Button'}
          </button>
        )

      case 'image':
        return (
          <div className="relative group" style={element.styles}>
            <img
              src={element.props.src || 'https://via.placeholder.com/400x300?text=Image'}
              alt={element.props.alt || 'Image'}
              className="w-full h-auto rounded"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded">
              <input
                type="url"
                placeholder="Image URL"
                defaultValue={element.props.src}
                onBlur={(e) => handlePropChange('src', e.target.value)}
                className="px-3 py-2 rounded text-sm"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )

      case 'container':
        return (
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[100px] relative"
            style={element.styles}
          >
            <div className="absolute top-2 left-2 text-xs text-gray-500 bg-white px-2 py-1 rounded">
              Container
            </div>
            {element.children && element.children.length > 0 ? (
              <div className="space-y-2 mt-6">
                {element.children.map((child) => (
                  <BuilderElement
                    key={child.id}
                    element={child}
                    isSelected={false}
                    isDragOver={false}
                    onClick={onClick}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-20 text-gray-400">
                Drag elements here
              </div>
            )}
          </div>
        )

      default:
        return (
          <div style={element.styles}>
            {element.props.text || `${element.type} component`}
          </div>
        )
    }
  }

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    opacity: isDragging ? 0.5 : undefined,
    zIndex: element.zIndex
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative group transition-all duration-200',
        isSelected && 'ring-2 ring-blue-500 ring-offset-2',
        isDragOver && 'ring-2 ring-green-500 ring-offset-2',
        isDragging && 'cursor-grabbing'
      )}
      onClick={handleElementClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Element content */}
      <div className="relative">
        {renderElementContent()}

        {/* Controls overlay */}
        {isSelected && (
          <motion.div
            className="absolute -top-1 -left-1 -right-1 -bottom-1 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Resize handles */}
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full cursor-nw-resize pointer-events-auto" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-ne-resize pointer-events-auto" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full cursor-sw-resize pointer-events-auto" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-se-resize pointer-events-auto" />
          </motion.div>
        )}

        {/* Hover controls */}
        <div
          className={cn(
            'absolute -top-10 left-0 flex items-center space-x-1 bg-white border border-gray-200 rounded-lg shadow-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto',
            isSelected && 'opacity-100'
          )}
        >
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-3 h-3" />
          </Button>

          <div className="w-px h-4 bg-gray-300" />

          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={handleDuplicate}
          >
            <Copy className="w-3 h-3" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
            onClick={handleDelete}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>

        {/* Element type indicator */}
        <div
          className={cn(
            'absolute -bottom-6 left-0 text-xs text-gray-500 bg-white px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity',
            isSelected && 'opacity-100 text-blue-600'
          )}
        >
          {element.type}
        </div>
      </div>
    </motion.div>
  )
}