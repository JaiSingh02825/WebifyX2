'use client'

import React, { useState, useRef, useCallback } from 'react'
import Editor from '@monaco-editor/react'
import { motion } from 'framer-motion'
import {
  Play,
  RotateCcw,
  Copy,
  Download,
  Upload,
  Settings,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  Monitor
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCoursesStore } from '@/lib/courses'
import { cn } from '@/lib/utils'

interface CodeEditorProps {
  value?: string
  onChange?: (value: string) => void
  language?: string
  height?: string
  theme?: 'light' | 'dark' | 'system'
  readOnly?: boolean
  showLineNumbers?: boolean
  minimap?: boolean
  fontSize?: number
  wordWrap?: 'on' | 'off'
  onRun?: (code: string) => void
  defaultCode?: string
  title?: string
  description?: string
  showPreview?: boolean
  previewContent?: string
}

export function CodeEditor({
  value = '',
  onChange,
  language = 'javascript',
  height = '400px',
  theme: initialTheme = 'system',
  readOnly = false,
  showLineNumbers = true,
  minimap = false,
  fontSize = 14,
  wordWrap = 'on',
  onRun,
  defaultCode = '',
  title,
  description,
  showPreview = true,
  previewContent
}: CodeEditorProps) {
  const [code, setCode] = useState(value || defaultCode)
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(initialTheme)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const editorRef = useRef<any>(null)

  const { isRunningExercise } = useCoursesStore()

  const handleEditorDidMount = useCallback((editor: any, monaco: any) => {
    editorRef.current = editor

    // Configure editor options
    editor.updateOptions({
      fontSize,
      wordWrap,
      minimap: { enabled: minimap },
      lineNumbers: showLineNumbers ? 'on' : 'off',
      readOnly,
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      insertSpaces: true,
      renderWhitespace: 'selection',
      bracketPairColorization: { enabled: true },
      guides: {
        bracketPairs: true,
        indentation: true
      }
    })

    // Add custom theme if needed
    if (theme === 'dark') {
      monaco.editor.setTheme('vs-dark')
    } else if (theme === 'light') {
      monaco.editor.setTheme('vs')
    } else {
      // System theme - check user preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      monaco.editor.setTheme(prefersDark ? 'vs-dark' : 'vs')
    }

    // Set up auto-save if needed
    if (onChange) {
      editor.onDidChangeModelContent(() => {
        const newCode = editor.getValue()
        setCode(newCode)
        onChange(newCode)
      })
    }
  }, [fontSize, wordWrap, minimap, showLineNumbers, readOnly, theme, onChange])

  const handleRun = useCallback(async () => {
    setIsRunning(true)
    setError('')
    setOutput('')

    try {
      if (onRun) {
        await onRun(code)
      } else {
        // Default execution for demo
        const result = await executeCode(code, language)
        setOutput(result)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsRunning(false)
    }
  }, [code, language, onRun])

  const handleReset = useCallback(() => {
    const resetCode = defaultCode || ''
    setCode(resetCode)
    if (editorRef.current) {
      editorRef.current.setValue(resetCode)
    }
    setOutput('')
    setError('')
  }, [defaultCode])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code)
  }, [code])

  const handleDownload = useCallback(() => {
    const extension = getFileExtension(language)
    const filename = `code${extension}`
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [code, language])

  const handleUpload = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = getFileExtensions(language).join(',')
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          setCode(content)
          if (editorRef.current) {
            editorRef.current.setValue(content)
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }, [language])

  const getMonacoTheme = () => {
    if (theme === 'dark') return 'vs-dark'
    if (theme === 'light') return 'vs'
    // System theme
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'vs-dark' : 'vs'
  }

  const getFileExtension = (lang: string): string => {
    const extensions: Record<string, string> = {
      javascript: '.js',
      typescript: '.ts',
      html: '.html',
      css: '.css',
      json: '.json',
      python: '.py',
      java: '.java',
      cpp: '.cpp',
      c: '.c'
    }
    return extensions[lang] || '.txt'
  }

  const getFileExtensions = (lang: string): string[] => {
    const extensions: Record<string, string[]> = {
      javascript: ['.js', '.jsx', '.mjs'],
      typescript: ['.ts', '.tsx'],
      html: ['.html', '.htm'],
      css: ['.css', '.scss', '.sass', '.less'],
      json: ['.json'],
      python: ['.py'],
      java: ['.java'],
      cpp: ['.cpp', '.cxx', '.cc'],
      c: ['.c', '.h']
    }
    return extensions[lang] || ['.txt']
  }

  const executeCode = async (code: string, language: string): Promise<string> => {
    // In a real application, this would use a proper code execution service
    // For now, we'll provide a simple simulation

    if (language === 'javascript' || language === 'typescript') {
      try {
        // Create a safe execution environment
        const logs: string[] = []
        const customConsole = {
          log: (...args: any[]) => logs.push(args.map(arg =>
            typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
          ).join(' ')),
          error: (...args: any[]) => logs.push('ERROR: ' + args.join(' ')),
          warn: (...args: any[]) => logs.push('WARNING: ' + args.join(' '))
        }

        // Execute the code in a controlled manner
        const func = new Function('console', code)
        func(customConsole)

        return logs.length > 0 ? logs.join('\n') : 'Code executed successfully'
      } catch (error) {
        return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      }
    }

    if (language === 'html') {
      // For HTML, return the code as-is (would be rendered in an iframe)
      return code
    }

    return `Code execution for ${language} not implemented in demo mode`
  }

  return (
    <div className={cn(
      'border border-gray-200 rounded-lg overflow-hidden bg-white',
      isFullscreen && 'fixed inset-0 z-50 rounded-none'
    )}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          {title && (
            <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          )}
          {description && (
            <span className="text-xs text-gray-500">{description}</span>
          )}
        </div>

        <div className="flex items-center space-x-1">
          {/* Theme Toggle */}
          <div className="flex items-center bg-white border border-gray-200 rounded-md p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme('light')}
              className={cn('h-6 w-6 p-0', theme === 'light' && 'bg-gray-100')}
            >
              <Sun className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme('dark')}
              className={cn('h-6 w-6 p-0', theme === 'dark' && 'bg-gray-100')}
            >
              <Moon className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme('system')}
              className={cn('h-6 w-6 p-0', theme === 'system' && 'bg-gray-100')}
            >
              <Monitor className="w-3 h-3" />
            </Button>
          </div>

          <div className="w-px h-4 bg-gray-300" />

          {/* Actions */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="h-8 w-8 p-0"
          >
            <Copy className="w-3 h-3" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="h-8 w-8 p-0"
          >
            <Download className="w-3 h-3" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleUpload}
            className="h-8 w-8 p-0"
          >
            <Upload className="w-3 h-3" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="h-8 w-8 p-0"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="h-8 w-8 p-0"
          >
            {isFullscreen ? (
              <Minimize2 className="w-3 h-3" />
            ) : (
              <Maximize2 className="w-3 h-3" />
            )}
          </Button>
        </div>
      </div>

      <div className={cn('flex', isFullscreen ? 'h-[calc(100vh-120px)]' : 'h-auto')}>
        {/* Editor */}
        <div className={cn('flex-1', showPreview && 'border-r border-gray-200')}>
          <Editor
            height={height}
            language={language}
            theme={getMonacoTheme()}
            value={code}
            onChange={(value) => {
              setCode(value || '')
              if (onChange) {
                onChange(value || '')
              }
            }}
            onMount={handleEditorDidMount}
            options={{
              fontSize,
              wordWrap,
              minimap: { enabled: minimap },
              lineNumbers: showLineNumbers ? 'on' : 'off',
              readOnly,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              insertSpaces: true,
              renderWhitespace: 'selection',
              bracketPairColorization: { enabled: true },
              guides: {
                bracketPairs: true,
                indentation: true
              }
            }}
          />

          {/* Run Button */}
          {!readOnly && (
            <div className="absolute bottom-4 right-4">
              <Button
                onClick={handleRun}
                disabled={isRunning || isRunningExercise}
                className="shadow-lg"
              >
                <Play className="w-4 h-4 mr-2" />
                {isRunning ? 'Running...' : 'Run Code'}
              </Button>
            </div>
          )}
        </div>

        {/* Preview/Output */}
        {showPreview && (
          <div className="w-1/2 bg-gray-50">
            <div className="h-full flex flex-col">
              {/* Preview Header */}
              <div className="px-4 py-2 bg-white border-b border-gray-200">
                <h4 className="text-sm font-medium text-gray-900">
                  {language === 'html' ? 'Preview' : 'Output'}
                </h4>
              </div>

              {/* Preview Content */}
              <div className="flex-1 overflow-auto">
                {language === 'html' ? (
                  <iframe
                    srcDoc={previewContent || code}
                    className="w-full h-full border-0 bg-white"
                    sandbox="allow-scripts"
                    title="HTML Preview"
                  />
                ) : (
                  <div className="p-4">
                    {error ? (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-sm text-red-600 font-mono">{error}</p>
                      </div>
                    ) : output ? (
                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap">
                          {output}
                        </pre>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        <p className="text-sm">Click "Run Code" to see the output</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}