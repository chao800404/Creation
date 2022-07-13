import React, { useState, useEffect, useRef } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import shallow from 'zustand/shallow'
import useStore from '../../store/store'
import { SIDE_MAX_WIDTH, SIDE_MIN_WIDTH } from '../../utils/config'
import SideLine from '../line/sideLine'

const Side = ({ children }: { children: React.ReactNode }) => {
  const setSideLineX = useStore((state) => state.setSideLineX)
  const sideLineX = useStore((state) => state.sideLineX, shallow)
  const [dragStart, seDragStart] = useState(false)

  const [sideLineElem, setSideLineElem] = useState(null)

  const handleOnPointerDown = () => seDragStart(true)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStart) return
      const x = e.pageX
      if (x > SIDE_MAX_WIDTH || x <= SIDE_MIN_WIDTH) return
      setSideLineX(x)
    }

    const handleOnClick = (e: MouseEvent) => {
      if (e.target !== sideLineElem) seDragStart(false)
    }
    const handleOnPointerUp = () => seDragStart(false)

    window.addEventListener('click', handleOnClick)
    window.addEventListener('pointerup', handleOnPointerUp)
    window.addEventListener('pointermove', handleMouseMove)

    return () => {
      window.removeEventListener('pointermove', handleMouseMove)
      window.removeEventListener('pointerup', handleOnPointerUp)
      window.removeEventListener('click', handleOnClick)
    }
  }, [dragStart, setSideLineX, sideLineElem])

  return (
    <Box
      maxW={`${SIDE_MAX_WIDTH}px`}
      minW={`${SIDE_MIN_WIDTH}px`}
      w={`${sideLineX}px`}
      h="full"
      bg="brand.secondary-400"
      shadow="sm"
      pos="relative"
      position="relative"
      zIndex="999"
    >
      <Flex direction="column" h="inherit" p=".5rem 0">
        {children}
      </Flex>
      <SideLine
        setSideLineElem={setSideLineElem}
        onPointerDown={handleOnPointerDown}
      />
    </Box>
  )
}

export default Side
