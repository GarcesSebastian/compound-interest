"use client"

import { useEffect, useRef } from "react"
import katex from "katex"

interface MathProps {
  children: string
  block?: boolean
  className?: string
}

export function Math({ children, block = false, className = "" }: MathProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const spanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = block ? divRef.current : spanRef.current
    if (element) {
      try {
        katex.render(children, element, {
          displayMode: block,
          throwOnError: false,
          trust: true,
          output: "html",
        })
      } catch (error) {
        console.error("KaTeX rendering error:", error)
        if (element) {
          element.textContent = children
        }
      }
    }
  }, [children, block])

  if (block) {
    return <div ref={divRef} className={`overflow-x-auto text-center py-2 ${className}`} />
  }

  return <span ref={spanRef} className={className} />
}

interface BlockMathProps {
  children: string
  className?: string
}

export function BlockMath({ children, className = "" }: BlockMathProps) {
  return <Math block className={className}>{children}</Math>
}

interface InlineMathProps {
  children: string
  className?: string
}

export function InlineMath({ children, className = "" }: InlineMathProps) {
  return <Math className={className}>{children}</Math>
}
