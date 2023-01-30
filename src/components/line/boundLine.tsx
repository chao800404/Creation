import React, { useRef, useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'
import { usePageControllerStore } from '../../store'
import { BoundLineWrapper, LineProps } from './line.styles'

type BoundLineType = LineProps & {
  maxW: number
  minW: number
  multiply: number
  originWidth: number
  widthSet: (x: number) => void
}

const cursorSet = (cursor: string) =>
  (window.document.body.style.cursor = cursor)

const BoundLine: React.FC<BoundLineType> = ({
  right,
  height,
  maxW,
  minW,
  originWidth,
  widthSet,
  multiply,
}) => {
  const [dragStart, setDragStart] = useState(false)
  const onDragSet = usePageControllerStore((state) => state.onDragSet, shallow)
  const [dragDownPos, setDragDwonPos] = useState(0)

  const sideLineElem = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStart) return
      const x = originWidth + (e.pageX - dragDownPos) * multiply

      if (x >= maxW || x <= minW) return
      widthSet(x)
    }

    const handleOnPointerUp = () => {
      setDragStart(false)
      onDragSet(false)
      cursorSet('unset')
    }

    const events: [
      event: 'pointerup' | 'pointermove',
      handle: (e: MouseEvent) => void
    ][] = [
      ['pointerup', handleOnPointerUp],
      ['pointermove', handleMouseMove],
    ]

    events.forEach((event) =>
      window.addEventListener<(typeof event)[0]>(event[0], event[1])
    )

    return () => {
      events.forEach((event) => window.removeEventListener(event[0], event[1]))
    }
  }, [
    dragStart,
    widthSet,
    sideLineElem,
    maxW,
    minW,
    originWidth,
    onDragSet,
    dragDownPos,
    multiply,
  ])

  return (
    <BoundLineWrapper
      ref={sideLineElem}
      onPointerDown={(e) => {
        e.preventDefault()
        setDragStart(true)
        onDragSet(true)
        cursorSet('col-resize')
        setDragDwonPos(e.pageX)
      }}
      right={right}
      height={height}
      dragStart={dragStart}
    >
      <div className="BoundLineContent" />
    </BoundLineWrapper>
  )
}

export default BoundLine
