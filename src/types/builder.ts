export interface Element {
  id: string
  type: 'text' | 'heading' | 'image' | 'button' | 'video' | 'form' | 'container' | 'grid' | 'header' | 'hero' | 'features' | 'footer' | 'gallery' | 'embed'
  props: Record<string, any>
  styles: {
    backgroundColor?: string
    color?: string
    fontSize?: string
    padding?: string
    margin?: string
    borderRadius?: string
    border?: string
    width?: string
    height?: string
    textAlign?: 'left' | 'center' | 'right'
    display?: string
    flexDirection?: string
    justifyContent?: string
    alignItems?: string
    gap?: string
  }
  children?: Element[]
  parentId?: string
  position: {
    x: number
    y: number
  }
  size: {
    width: number
    height: number
  }
  zIndex: number
}

export interface Site {
  id: string
  name: string
  subdomain: string
  customDomain?: string
  content: {
    elements: Element[]
    globalStyles: {
      fontFamily?: string
      primaryColor?: string
      secondaryColor?: string
    }
  }
  isPublished: boolean
  publishedUrl?: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface HistoryState {
  elements: Element[]
  timestamp: Date
  description: string
}

export interface BuilderState {
  currentSite: Site | null
  selectedElement: Element | null
  elements: Element[]
  history: HistoryState[]
  historyIndex: number
  isDirty: boolean
  isDragging: boolean
  dragOverElement: Element | null
  viewport: 'desktop' | 'tablet' | 'mobile'
  zoom: number
}