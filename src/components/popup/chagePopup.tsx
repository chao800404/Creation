import React, { useState, useCallback } from 'react'

import { motion } from 'framer-motion'

import shallow from 'zustand/shallow'
import WrapperScrollbar from '../scroll/wrapperScrollbar'
import UploadImagContainer from '../container/uploadImageContainer'
import { ChangePopupWrapper } from './popup.styles'
import { usePageStore } from '../../store'
import SelectImageContainer from '../container/selectImageContainer'

const tabs = ['cover', 'upload', 'link']

const style = (backgroundColor: string, color: string, borderRight: string) => {
  return {
    backgroundColor,
    color,
    borderRight,
  }
}

const ChangePopup = ({
  setToggleShow,
}: {
  setToggleShow: (toggle: boolean) => void
}) => {
  const [tabIndex, setTabIndex] = useState(0)
  const coverImageMap = usePageStore((state) => state.coverImageMap, shallow)

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
          {tabs.map((tab, index) => (
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
        {tabIndex === 0 && (
          <WrapperScrollbar>
            <div className="change_popup-padding">
              {coverImageMap &&
                Object.entries(coverImageMap).map((cover, index) => (
                  <SelectImageContainer
                    key={index}
                    groupName={cover[0]}
                    coverGroup={cover[1]}
                    setToggleShow={setToggleShow}
                  />
                ))}
            </div>
          </WrapperScrollbar>
        )}

        {tabIndex === 1 && (
          <UploadImagContainer setToggleShow={setToggleShow} />
        )}
      </motion.div>
    </ChangePopupWrapper>
  )
}

export default ChangePopup
