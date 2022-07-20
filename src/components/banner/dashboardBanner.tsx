/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import ChageCoverPopup from '../popup/chageCoverPopup'
import useStore from '../../store/store'
import shallow from 'zustand/shallow'

const DashboardBanner = ({ imageCoverSrc }: { imageCoverSrc: string }) => {
  const [start, setStart] = useState(false)
  const elemRef = useRef<HTMLDivElement>(null)
  const [pointerDownY, setPointerDownY] = useState<number>(0)
  const [moveY, setMoveY] = useState<number>(50)
  const setHovered = useStore((state) => state.setToggleHoverdCover, shallow)
  const { togglePopup, toggle } = useStore(
    (state) => ({
      togglePopup: state.setToggleChangeCoverPopup,
      toggle: state.toggleChangeCoverPopup,
    }),
    shallow
  )

  const { controlCover, setControlCover } = useStore(
    (state) => ({
      controlCover: state.controlCoverStart.reposition,
      setControlCover: state.setControlCoverReposition,
    }),
    shallow
  )

  // const [controlCover, setControlCover] = useState({
  //   reposition: false,
  //   changCover: false,
  // })

  useEffect(() => {
    if (start && controlCover) {
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
    const handleTogglePopup = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        '[data-type="change-cover-popup"]'
      )
      if (!target && toggle) {
        togglePopup(false)
        setHovered(false)
      }
    }
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('click', handleTogglePopup)

    return () => {
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('click', handleTogglePopup)
    }
  }, [toggle])

  const handleOnPointerDown = (e: React.MouseEvent) => {
    if (!controlCover) {
      e.preventDefault()
    }
    setPointerDownY(e.pageY)
    setStart(true)
  }

  const handlePointer = () => {
    !start && !controlCover && !toggle && setHovered()
  }

  return (
    <Box
      w="inherit"
      h="xss"
      pos="relative"
      onPointerEnter={handlePointer}
      onPointerLeave={handlePointer}
      cursor={controlCover ? 'move' : 'default'}
      ref={elemRef}
    >
      {controlCover && (
        <Box
          pos="absolute"
          p="1rem 1.5rem"
          transform="translate(-50%,-50%)"
          fontSize=".8rem"
          zIndex="100"
          bg="rgba(0,0,0,0.8)"
          color="white"
          top="50%"
          fontWeight="900"
          left="50%"
          pointerEvents="none"
        >
          拖移照片變更位子
        </Box>
      )}

      <Image
        src={imageCoverSrc}
        layout="fill"
        alt="cover"
        objectFit="cover"
        objectPosition={`center ${moveY}%`}
        onPointerDown={handleOnPointerDown}
      />
    </Box>
  )
}

export default DashboardBanner
