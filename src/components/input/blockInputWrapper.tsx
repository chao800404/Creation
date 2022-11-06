import React, { useEffect, useRef, useState } from 'react'
import { BlockInputBaseWrapper } from './input.styles'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { motion } from 'framer-motion'
import ChangePopup from '../popup/changePopup'
import SelectBlockContainer from '../container/selectBlockContainer'

type BlockInputWrapperType = {
  children: React.ReactNode
}

const BlockInputWrapper: React.FC<BlockInputWrapperType> = ({ children }) => {
  const [isFocus, setIsFocus] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleOnShow = (e: MouseEvent) => {
      const popupTarget = (e.target as HTMLElement).closest(
        '[data-type="block-add-popup"]'
      )
      if (!popupTarget) {
        return setVisible(false)
      }
    }

    document.addEventListener('click', handleOnShow)
    return () => document.removeEventListener('click', handleOnShow)
  }, [])

  return (
    <BlockInputBaseWrapper
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      tabIndex={0}
    >
      <motion.div
        animate={{ opacity: isFocus ? 1 : 0 }}
        className="add_block-icon"
        onClick={() => setVisible(true)}
        data-type="block-add-popup"
      >
        <BsFillPlusCircleFill className="add_block-icon-content" />
      </motion.div>

      {children}
      <motion.div
        animate={{
          visibility: visible ? 'visible' : 'hidden',
          opacity: visible ? 1 : 0,
        }}
        className="add_block-popup"
        data-type="block-add-popup"
      >
        <ChangePopup tabs={['All', 'Basic', 'Table']}>
          <SelectBlockContainer />
        </ChangePopup>
      </motion.div>
    </BlockInputBaseWrapper>
  )
}

export default BlockInputWrapper
