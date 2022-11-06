import React, { useEffect, useState } from 'react'
import { BlockInputBaseWrapper } from './input.styles'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { motion, AnimatePresence } from 'framer-motion'
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
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="add_block-popup"
            data-type="block-add-popup"
          >
            <ChangePopup tabs={['All', 'Basic', 'Table']}>
              <SelectBlockContainer />
            </ChangePopup>
          </motion.div>
        )}
      </AnimatePresence>
    </BlockInputBaseWrapper>
  )
}

export default BlockInputWrapper
