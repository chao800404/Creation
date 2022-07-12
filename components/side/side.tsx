import React, { useState, PointerEvent, useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import shallow from 'zustand/shallow'
import useStore from '../../store/store'

const MaxW = 480
const MinW = 300
const BasicW = 350

const Side = ({ children }: { children: React.ReactNode }) => {
  const setSideLineX = useStore((state) => state.setSideLineX)
  const sideLineX = useStore((state) => state.sideLineX, shallow)
  const sideLineElem = useRef(null)
  const [dragStart, seDragStart] = useState(false)

  // function handleStartDrag(event: PointerEvent<HTMLDivElement>) {
  //   controls.start(event)
  // }

  // function onPan(_: unknown, info: PanInfo) {
  //   const x = info.point.x
  //   if (x >= MaxW) return setX(MaxW)
  //   else if (x <= MinW) return setX(MinW)
  //   setX(x)
  // }

  // console.log(x)

  const handleOnPointerDown = () => {
    seDragStart(true)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStart) return
      const x = e.pageX
      if (x > MaxW || x <= MinW) return
      setSideLineX(x)
    }
    const handleOnPointerUp = () => {
      seDragStart(false)
    }

    window.addEventListener('pointerup', handleOnPointerUp)
    window.addEventListener('pointermove', handleMouseMove)

    return () => {
      window.removeEventListener('pointermove', handleMouseMove)
      window.removeEventListener('pointerup', handleOnPointerUp)
    }
  }, [dragStart, setSideLineX])

  return (
    <Box
      maxW={`${MaxW}px`}
      minW={`${MinW}px`}
      w={`${sideLineX}px`}
      h="full"
      bg="brand.secondary-400"
      shadow="sm"
      pos="relative"
      // dragControls={controls}
      position="relative"
      zIndex="999"
    >
      <Box p="5">{children}</Box>
      <Box
        pos="absolute"
        right={0}
        w="5px"
        top={0}
        transform="translateX(50%)"
        h="full"
        cursor="col-resize"
        zIndex="100"
        ref={sideLineElem}
        onPointerDown={handleOnPointerDown}
        _hover={{
          bg: 'brand.secondary-600',
        }}
      />
    </Box>
  )
}

export default Side
