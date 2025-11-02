import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type { BuilderState, Site, Element, HistoryState } from '@/types'

interface BuilderStore extends BuilderState {
  // Actions
  setCurrentSite: (site: Site | null) => void
  setSelectedElement: (element: Element | null) => void
  addElement: (element: Element, index?: number) => void
  updateElement: (id: string, updates: Partial<Element>) => void
  deleteElement: (id: string) => void
  duplicateElement: (id: string) => void
  moveElement: (id: string, newIndex: number) => void
  undo: () => void
  redo: () => void
  saveToHistory: (description: string) => void
  setDirty: (isDirty: boolean) => void
  setDragging: (isDragging: boolean) => void
  setDragOverElement: (element: Element | null) => void
  setViewport: (viewport: 'desktop' | 'tablet' | 'mobile') => void
  setZoom: (zoom: number) => void
  saveSite: () => Promise<void>
  loadSite: (siteId: string) => Promise<void>
  clearSite: () => void
}

const initialHistory: HistoryState = {
  elements: [],
  timestamp: new Date(),
  description: 'Initial state'
}

export const useBuilderStore = create<BuilderStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    currentSite: null,
    selectedElement: null,
    elements: [],
    history: [initialHistory],
    historyIndex: 0,
    isDirty: false,
    isDragging: false,
    dragOverElement: null,
    viewport: 'desktop',
    zoom: 1,

    // Actions
    setCurrentSite: (site) => {
      set({ currentSite: site, elements: site?.content.elements || [] })
      get().saveToHistory('Site loaded')
    },

    setSelectedElement: (element) => {
      set({ selectedElement: element })
    },

    addElement: (element, index) => {
      const { elements } = get()
      const newElements = [...elements]

      if (index !== undefined) {
        newElements.splice(index, 0, element)
      } else {
        newElements.push(element)
      }

      set({ elements: newElements, isDirty: true })
      get().saveToHistory(`Added ${element.type} element`)
    },

    updateElement: (id, updates) => {
      const { elements } = get()
      const newElements = elements.map(el =>
        el.id === id ? { ...el, ...updates } : el
      )

      set({ elements: newElements, isDirty: true })
      get().saveToHistory(`Updated element`)
    },

    deleteElement: (id) => {
      const { elements, selectedElement } = get()
      const newElements = elements.filter(el => el.id !== id)

      set({
        elements: newElements,
        selectedElement: selectedElement?.id === id ? null : selectedElement,
        isDirty: true
      })
      get().saveToHistory('Deleted element')
    },

    duplicateElement: (id) => {
      const { elements } = get()
      const element = elements.find(el => el.id === id)

      if (element) {
        const duplicatedElement = {
          ...element,
          id: `${element.type}-${Date.now()}`,
          position: {
            x: element.position.x + 20,
            y: element.position.y + 20
          }
        }

        const index = elements.findIndex(el => el.id === id)
        const newElements = [...elements]
        newElements.splice(index + 1, 0, duplicatedElement)

        set({ elements: newElements, isDirty: true })
        get().saveToHistory(`Duplicated ${element.type} element`)
      }
    },

    moveElement: (id, newIndex) => {
      const { elements } = get()
      const element = elements.find(el => el.id === id)

      if (element) {
        const newElements = elements.filter(el => el.id !== id)
        newElements.splice(newIndex, 0, element)

        set({ elements: newElements, isDirty: true })
        get().saveToHistory('Moved element')
      }
    },

    undo: () => {
      const { history, historyIndex } = get()

      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        const previousState = history[newIndex]

        set({
          elements: previousState.elements,
          historyIndex: newIndex,
          isDirty: true
        })
      }
    },

    redo: () => {
      const { history, historyIndex } = get()

      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1
        const nextState = history[newIndex]

        set({
          elements: nextState.elements,
          historyIndex: newIndex,
          isDirty: true
        })
      }
    },

    saveToHistory: (description) => {
      const { elements, history, historyIndex } = get()

      // Remove any states after current index (for new history branch)
      const newHistory = history.slice(0, historyIndex + 1)

      // Add new state
      const newState: HistoryState = {
        elements: JSON.parse(JSON.stringify(elements)), // Deep clone
        timestamp: new Date(),
        description
      }

      newHistory.push(newState)

      // Limit history to 50 states
      if (newHistory.length > 50) {
        newHistory.shift()
      }

      set({
        history: newHistory,
        historyIndex: newHistory.length - 1
      })
    },

    setDirty: (isDirty) => {
      set({ isDirty })
    },

    setDragging: (isDragging) => {
      set({ isDragging })
    },

    setDragOverElement: (element) => {
      set({ dragOverElement: element })
    },

    setViewport: (viewport) => {
      set({ viewport })
    },

    setZoom: (zoom) => {
      set({ zoom: Math.max(0.25, Math.min(2, zoom)) }) // Limit zoom between 25% and 200%
    },

    saveSite: async () => {
      const { currentSite, elements, setDirty } = get()

      if (!currentSite) return

      try {
        const response = await fetch(`/api/sites/${currentSite.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: {
              elements,
              globalStyles: currentSite.content.globalStyles
            }
          })
        })

        if (response.ok) {
          setDirty(false)
          const updatedSite = await response.json()
          set({ currentSite: updatedSite })
        }
      } catch (error) {
        console.error('Failed to save site:', error)
      }
    },

    loadSite: async (siteId) => {
      try {
        const response = await fetch(`/api/sites/${siteId}`)

        if (response.ok) {
          const site = await response.json()
          get().setCurrentSite(site)
        }
      } catch (error) {
        console.error('Failed to load site:', error)
      }
    },

    clearSite: () => {
      set({
        currentSite: null,
        selectedElement: null,
        elements: [],
        isDirty: false
      })
      get().saveToHistory('Cleared site')
    }
  }))
)

// Keyboard shortcuts
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Z for undo
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault()
      useBuilderStore.getState().undo()
    }

    // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y for redo
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
      e.preventDefault()
      useBuilderStore.getState().redo()
    }

    // Delete key for selected element
    if (e.key === 'Delete') {
      const { selectedElement, deleteElement } = useBuilderStore.getState()
      if (selectedElement) {
        e.preventDefault()
        deleteElement(selectedElement.id)
      }
    }

    // Ctrl/Cmd + D for duplicate
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
      e.preventDefault()
      const { selectedElement, duplicateElement } = useBuilderStore.getState()
      if (selectedElement) {
        duplicateElement(selectedElement.id)
      }
    }

    // Ctrl/Cmd + S for save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault()
      useBuilderStore.getState().saveSite()
    }
  })
}