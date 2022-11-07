import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import WrapperScrollbar from '../scroll/wrapperScrollbar'
import { AnimatePresence } from 'framer-motion'
import { ChangePopupWrapper } from './popup.styles'

const style = (color: string) => {
  return {
    color,
  }
}

type ChangePopupType = {
  children: JSX.Element[] | JSX.Element
  tabs: string[]
  scrollTop?: number
  scrollStart?: boolean
}

const ChangePopup: React.FC<ChangePopupType> = ({
  children,
  tabs,
  scrollTop,
  scrollStart,
}) => {
  const [tabIndex, setTabIndex] = useState(0)

  const validateDataSet = (targetIndex: string) => {
    if (targetIndex?.startsWith('tab-')) {
      return Number(targetIndex.slice(4, 10))
    }
    return 0
  }

  return (
    <ChangePopupWrapper
      id="change_popup"
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      <div className="change_popup-tabs">
        <div className="change_popup-tabs-list">
          {tabs?.map((tab, index) => (
            <motion.div
              onClick={(e) => {
                const targetIndex = (e.target as HTMLElement).dataset.tab
                const index = validateDataSet(targetIndex as string)
                setTabIndex(index)
              }}
              className="change_popup-tabs-list-item"
              data-tab={`tab-${index}`}
              key={index}
              animate={index === tabIndex ? style('#1c1c1c') : style('#c3c3c3')}
              transition={{ ease: 'easeOut' }}
            >
              {tab}
            </motion.div>
          ))}
          <motion.div
            animate={{ x: `${tabIndex * 3.2}rem` }}
            className="change_popup-tabs-list-slide"
          >
            <span />
          </motion.div>
        </div>
        <div className="change_popup-tabs-list-item change_popup-tabs-delete">
          delete
        </div>
      </div>

      <motion.div
        className="change_popup-content"
        whileHover="hover"
        initial="rest"
        animate="rest"
      >
        <WrapperScrollbar scrollTop={scrollTop}>
          {React.Children?.map(children, (child, i) => {
            return i === tabIndex && React.cloneElement(child)
          })}
        </WrapperScrollbar>
      </motion.div>
    </ChangePopupWrapper>
  )
}

export default ChangePopup
