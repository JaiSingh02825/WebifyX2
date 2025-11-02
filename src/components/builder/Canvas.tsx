'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DragOverlay,
  closestCenter,
  pointerWithin,
  rectIntersection,
  CollisionDetection,
  ClientRect,
  Active,
  Over
} from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import { useBuilderStore } from '@/lib/builder'
import { BuilderElement } from './BuilderElement'
import { ElementPlaceholder } from './ElementPlaceholder'
import type { Element } from '@/types'

export function BuilderCanvas() {
  const {
    elements,
    selectedElement,
    isDragging,
    dragOverElement,
    setSelectedElement,
    addElement,
    updateElement,
    moveElement,
    setDragging,
    setDragOverElement
  } = useBuilderStore()

  const handleDragStart = (event: DragStartEvent) => {
    setDragging(true)

    // If dragging from sidebar, it's a new element
    if (event.active.data.current?.fromSidebar) {
      // This is a new element being added
      console.log('Dragging new element from sidebar')
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over) {
      setDragOverElement(null)
      return
    }

    // Find the element being dragged over
    const overElement = elements.find(el => el.id === over.id)
    setDragOverElement(overElement || null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setDragging(false)
    setDragOverElement(null)

    if (!over) {
      // Dropped outside any droppable area
      return
    }

    // Handle new element from sidebar
    if (active.data.current?.fromSidebar) {
      const elementType = active.data.current.type as Element['type']
      const newElement: Element = {
        id: `${elementType}-${Date.now()}`,
        type: elementType,
        props: getDefaultProps(elementType),
        styles: getDefaultStyles(elementType),
        children: [],
        position: { x: 0, y: 0 },
        size: { width: 200, height: 100 },
        zIndex: elements.length
      }

      // Insert at the dropped position
      const overIndex = elements.findIndex(el => el.id === over.id)
      addElement(newElement, overIndex >= 0 ? overIndex + 1 : undefined)

      return
    }

    // Handle reordering existing elements
    if (active.id !== over.id) {
      const oldIndex = elements.findIndex(el => el.id === active.id)
      const newIndex = elements.findIndex(el => el.id === over.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        moveElement(active.id as string, newIndex)
      }
    }
  }

  const handleElementClick = (element: Element, event: React.MouseEvent) => {
    event.stopPropagation()
    setSelectedElement(element)
  }

  const handleCanvasClick = () => {
    setSelectedElement(null)
  }

  const handleCanvasDrop = (event: React.DragEvent) => {
    event.preventDefault()

    if (event.dataTransfer.types.includes('text/plain')) {
      try {
        const elementType = event.dataTransfer.getData('text/plain')
        if (elementType) {
          const newElement: Element = {
            id: `${elementType}-${Date.now()}`,
            type: elementType as Element['type'],
            props: getDefaultProps(elementType as Element['type']),
            styles: getDefaultStyles(elementType as Element['type']),
            children: [],
            position: {
              x: event.clientX - 100,
              y: event.clientY - 50
            },
            size: { width: 200, height: 100 },
            zIndex: elements.length
          }

          addElement(newElement)
        }
      } catch (error) {
        console.error('Failed to parse dropped data:', error)
      }
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  // Custom collision detection
  const customCollisionDetection: CollisionDetection = (args) => {
    const { active, droppableContainers } = args

    // Find containers that intersect with the active rect
    const intersectingContainers = droppableContainers.filter(container => {
      const activeRect = active.rect.current.translated
      const containerRect = container.rect.current

      if (!activeRect || !containerRect) return false

      return (
        activeRect.left < containerRect.right &&
        activeRect.right > containerRect.left &&
        activeRect.top < containerRect.bottom &&
        activeRect.bottom > containerRect.top
      )
    })

    if (intersectingContainers.length === 0) return []

    // Find the closest intersecting container
    const closestContainer = intersectingContainers.reduce((closest, container) => {
      const activeRect = active.rect.current.translated
      const closestRect = closest.rect.current
      const containerRect = container.rect.current

      if (!activeRect || !closestRect || !containerRect) return closest

      const closestDistance = getDistance(activeRect, closestRect)
      const containerDistance = getDistance(activeRect, containerRect)

      return containerDistance < closestDistance ? container : closest
    })

    return [{ id: closestContainer.id } as Over]
  }

  const getDistance = (rect1: ClientRect, rect2: ClientRect): number => {
    const centerX1 = rect1.left + rect1.width / 2
    const centerY1 = rect1.top + rect1.height / 2
    const centerX2 = rect2.left + rect2.width / 2
    const centerY2 = rect2.top + rect2.height / 2

    return Math.sqrt(
      Math.pow(centerX2 - centerX1, 2) + Math.pow(centerY2 - centerY1, 2)
    )
  }

  const getDefaultProps = (type: Element['type']) => {
    switch (type) {
      case 'text':
        return { text: 'Sample text content' }
      case 'heading':
        return { text: 'Heading Title', level: 2 }
      case 'button':
        return { text: 'Click me' }
      case 'image':
        return {
          src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
          alt: 'Placeholder image'
        }
      case 'container':
        return { label: 'Container' }
      default:
        return { text: 'New element' }
    }
  }

  const getDefaultStyles = (type: Element['type']) => {
    const baseStyles = {
      padding: '16px',
      margin: '8px',
      borderRadius: '4px'
    }

    switch (type) {
      case 'text':
        return {
          ...baseStyles,
          fontSize: '16px',
          lineHeight: '1.5'
        }
      case 'heading':
        return {
          ...baseStyles,
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '16px'
        }
      case 'button':
        return {
          padding: '12px 24px',
          backgroundColor: '#3b82f6',
          color: 'white',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer'
        }
      case 'image':
        return {
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '4px'
        }
      case 'container':
        return {
          padding: '16px',
          border: '2px dashed #d1d5db',
          borderRadius: '8px',
          minHeight: '100px',
          backgroundColor: '#f9fafb'
        }
      default:
        return baseStyles
    }
  }

  return (
    <div
      className="relative w-full h-full min-h-[600px] bg-white"
      onClick={handleCanvasClick}
      onDrop={handleCanvasDrop}
      onDragOver={handleDragOver}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Elements */}
      <div className="relative z-10">
        {elements.length === 0 ? (
          <ElementPlaceholder />
        ) : (
          <DndContext
            collisionDetection={customCollisionDetection}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToWindowEdges]}
          >
            <div className="space-y-4 p-6">
              {elements.map((element, index) => (
                <motion.div
                  key={element.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  <BuilderElement
                    element={element}
                    isSelected={selectedElement?.id === element.id}
                    isDragOver={dragOverElement?.id === element.id}
                    onClick={handleElementClick}
                  />
                </motion.div>
              ))}
            </div>

            <DragOverlay>
              {isDragging && (
                <div className="bg-white border-2 border-blue-500 rounded-lg p-4 shadow-lg opacity-90">
                  Dragging element...
                </div>
              )}
            </DragOverlay>
          </DndContext>
        )}
      </div>

      {/* Drop indicator when dragging over empty canvas */}
      {isDragging && elements.length === 0 && (
        <div className="absolute inset-0 border-4 border-dashed border-blue-500 rounded-lg pointer-events-none" />
      )}
    </div>
  )
}