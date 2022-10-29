import React, { useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { motion } from 'framer-motion'
import { useLayoutControllerStore } from '../../store'
import shallow from 'zustand/shallow'

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
  children: JSX.Element
  isSide?: boolean
}

const WrapperScrollbar: React.FC<WrapperScrollbarType> = ({
  children,
  isSide = false,
}) => {
  const dragStart = useLayoutControllerStore(
    (state) => state.dragStart,
    shallow
  )

  const [isCeiling, setCeiling] = useState(true)

  return (
    <Scrollbars
      height="inherit"
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
                ? { backgroundColor: '#FFFFFF' }
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
  )
}

export default WrapperScrollbar
