"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { cn } from "yz13/cn"

const MatrixBox = ({ text, className = "" }: { text: string, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const symbols = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
  ]
  const [lines, setLines] = useState<number>(0)
  const [letters, setLetters] = useState<number>(0)
  const splittedText = useMemo(() => text.split(""), [text])
  const textLength = useMemo(() => text.length, [text])
  const [pool, setPool] = useState<string[][]>([])
  const lineHeight = 12
  const fontSize = 12
  const padding = 12
  const gap = 6
  useEffect(() => {
    const div = ref.current
    if (div) {
      const width = div.clientWidth - padding * 2
      const height = div.clientHeight - padding * 2
      const lines = Math.floor(height / lineHeight)
      const letters = Math.floor(width / fontSize) - gap
      setLines(lines)
      setLetters(letters)
      const linesArray = Array.from({ length: lines }).map(() => {
        return Array.from({ length: letters }).map(() => {
          const random = Math.floor(Math.random() * symbols.length)
          return symbols[random] ?? "@"
        })
      })
      setPool(linesArray)
    }
  }, [ref])
  return (
    <div
      ref={ref}
      style={{
        padding: `${padding}px`,
      }}
      className={cn(
        "w-[450px] aspect-[16/10] border rounded-xl",
        className
      )}>
      {
        pool.map((line, index) => {
          const isCenterLine = index + 1 === lines / 2
          return (
            <div key={index} className="w-full flex items-center justify-between gap-2">
              {
                line.map((char, index) => (
                  <span
                    key={index}
                    style={{
                      fontSize: `${fontSize}px`,
                      lineHeight: `${lineHeight}px`,
                      gap: `${gap}px`
                    }}
                    className="font-mono text-secondary/50"
                  >
                    {char}
                  </span>
                ))
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default MatrixBox
