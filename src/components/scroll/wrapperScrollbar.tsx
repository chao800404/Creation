import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { ScrollbarProps, Scrollbars } from 'react-custom-scrollbars-2'
import { motion } from 'framer-motion'
import { usePageControllerStore } from '../../store'
import shallow from 'zustand/shallow'
import { SrollWrappr } from './scroll.styles'
import { isNumber } from 'lodash'

const opacityMotion = {
  rest: {
    opacity: 0,
    transition: {
      duration: 1.2,
      type: 'tween',
      ease: 'easeIn',
    },
  },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.4,
      type: 'tween',
      ease: 'easeOut',
    },
  },
}

type WrapperScrollbarType = {
  children: ReactNode
  isSide?: boolean
  scrollTop?: number
}

const WrapperScrollbar: React.FC<WrapperScrollbarType> = ({
  children,
  isSide = false,
  scrollTop,
}) => {
  const dragStart = usePageControllerStore((state) => state.dragStart, shallow)
  const [isCeiling, setCeiling] = useState(true)
  const scrollElem = useRef<null | Scrollbars>(null)

  useEffect(() => {
    if (scrollElem && scrollElem.current && isNumber(scrollTop)) {
      scrollElem.current.scrollTop(scrollTop)
    }
  }, [scrollTop])

  return (
    <SrollWrappr whileHover="hover" initial="rest">
      <Scrollbars
        height="100%"
        width="100%"
        ref={scrollElem}
        onScrollFrame={({ scrollTop }) => setCeiling(scrollTop === 0)}
        renderTrackVertical={({ style, ...props }) => {
          return (
            <motion.div
              {...props}
              style={{
                ...style,
                width: '0.5rem',
                right: '0',
                height: '100%',
                zIndex: '500',
              }}
            />
          )
        }}
        renderThumbVertical={({ style, ...props }) => {
          return (
            <motion.div
              style={{
                ...style,
                backgroundColor: '#1A202C',
                cursor: 'pointer',
              }}
              {...props}
              className="thumb-vertical"
              variants={!dragStart && opacityMotion}
              whileTap={{ backgroundColor: '#4A5568' }}
            />
          )
        }}
        renderView={(props) => {
          return isSide ? (
            <motion.div
              {...props}
              className="view"
              animate={
                isCeiling
                  ? { backgroundColor: 'rgba(0,0,0,0)' }
                  : {
                      backgroundColor: '#FFFFFF',
                      boxShadow: 'inset 0px -63px 23px -67px rgba(0,0,0,0.59)',
                      borderBottom: '1px solid black',
                    }
              }
            />
          ) : (
            <motion.div {...props} className="view" />
          )
        }}
      >
        {children}
      </Scrollbars>
    </SrollWrappr>
  )
}

export default WrapperScrollbar
