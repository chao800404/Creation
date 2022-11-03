import React, { useState, useCallback } from 'react'

import { motion } from 'framer-motion'

import WrapperScrollbar from '../scroll/wrapperScrollbar'

import { ChangePopupWrapper } from './popup.styles'

const style = (backgroundColor: string, color: string, borderRight: string) => {
  return {
    backgroundColor,
    color,
    borderRight,
  }
}

type ChangePopupType = {
  children: JSX.Element[] | JSX.Element
  tabs: string[]
}

const ChangePopup: React.FC<ChangePopupType> = ({ children, tabs }) => {
  const [tabIndex, setTabIndex] = useState(0)

  const validateDataSet = (targetIndex: string) => {
    if (targetIndex?.startsWith('tab-')) {
      return Number(targetIndex.slice(4, 10))
    }
    return 0
  }

  return (
    <ChangePopupWrapper>
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
              animate={
                index === tabIndex
                  ? style('#1c1c1c', '#ffffff', '1px solid #1c1c1c')
                  : style('#f3f3f3', '#cfcfcf', '1px solid #cfcfcf')
              }
              transition={{ ease: 'easeOut' }}
            >
              {tab}
            </motion.div>
          ))}
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
        <WrapperScrollbar>
          {React.Children?.map(children, (child, i) => {
            return i === tabIndex && React.cloneElement(child)
          })}
        </WrapperScrollbar>
      </motion.div>
    </ChangePopupWrapper>
  )
}

export default ChangePopup
