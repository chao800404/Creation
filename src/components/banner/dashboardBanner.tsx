/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const DashboardBanner = () => {
  const [hovered, setHovered] = useState(false)
  const [start, setStart] = useState(false)
  const elemRef = useRef<HTMLDivElement>(null)
  const [pointerDownY, setPointerDownY] = useState<number>(0)
  const [moveY, setMoveY] = useState<number>(50)
  const [controlCover, setControlCover] = useState({
    reposition: false,
    changCover: false,
  })

  console.log(controlCover, start)

  useEffect(() => {
    if (start && controlCover.reposition) {
      const elem = elemRef.current
      const elemH = elem?.getBoundingClientRect().height as number

      if (elemRef.current && elemRef) {
        const setCoverMove = (e: MouseEvent) => {
          e.preventDefault()
          const moving = ((e.pageY - pointerDownY) / elemH) * 100

          if (moveY - moving >= 100 || moveY - moving <= 0) return
          setMoveY(moveY - moving)
        }
        window.addEventListener('mousemove', setCoverMove)
        return () => window.removeEventListener('mousemove', setCoverMove)
      }
    }
  }, [start, pointerDownY])

  useEffect(() => {
    const handlePointerUp = () => setStart(false)
    window.addEventListener('pointerup', handlePointerUp)

    return () => window.removeEventListener('pointerup', handlePointerUp)
  }, [])

  const handleOnPointerDown = (e: React.MouseEvent) => {
    if (!controlCover.reposition) {
      e.preventDefault()
    }
    setPointerDownY(e.pageY)
    setStart(true)
  }

  return (
    <Box
      w="inherit"
      h="xss"
      pos="relative"
      onPointerEnter={() =>
        !start && !controlCover.reposition && setHovered((hover) => !hover)
      }
      onPointerLeave={() =>
        !start && !controlCover.reposition && setHovered((hover) => !hover)
      }
      cursor={controlCover.reposition ? 'move' : 'default'}
      ref={elemRef}
    >
      {controlCover.reposition && (
        <Box
          pos="absolute"
          p="1rem 1.5rem"
          transform="translate(-50%,-50%)"
          fontSize=".8rem"
          zIndex="300"
          bg="rgba(0,0,0,0.8)"
          color="white"
          top="50%"
          fontWeight="900"
          left="50%"
        >
          拖移照片變更位子
        </Box>
      )}
      <Image
        src="/static/jpg/tailwindcss.jpg"
        layout="fill"
        alt="cover"
        objectFit="cover"
        objectPosition={`center ${moveY}%`}
        onPointerDown={handleOnPointerDown}
      />

      <AnimatePresence>
        {(hovered || controlCover.reposition) && (
          <Flex
            borderRadius="sm"
            pos="absolute"
            bottom="1rem"
            right="1rem"
            bg="white"
            fontSize="sm"
            zIndex="300"
            cursor="pointer"
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Box p=".2rem 1rem">替換封面</Box>
            <Box w="1px" bg="brand.secondary-600" />
            <Box
              onClick={() =>
                setControlCover(
                  (prev) =>
                    (prev = { ...controlCover, reposition: !prev.reposition })
                )
              }
              p=".2rem 1rem"
            >
              {controlCover.reposition ? '取消更改' : '移動封面'}
            </Box>
          </Flex>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default DashboardBanner
