import React, { useEffect, useState } from 'react'
import { BlockInputBaseWrapper } from './input.styles'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { motion, AnimatePresence } from 'framer-motion'
import ChangePopup from '../popup/changePopup'
import SelectBlockContainer from '../container/selectBlockContainer'
import useOnClickOutside from '../../utils/useOnClickOutside'
import { useBlocksStore } from '../../store/useBlocksStore'
import shallow from 'zustand/shallow'
import { BLOCK_SELECTOR } from '../../utils/config'

type BlockInputWrapperType = {
  children: React.ReactNode
}

const BlockInputWrapper: React.FC<BlockInputWrapperType> = ({ children }) => {
  const [isFocus, setIsFocus] = useState(false)
  const { blocksMapSet, show, showSet, focusIndex } = useBlocksStore(
    (state) => ({
      blocksMapSet: state.blocksMapSet,
      show: state.show,
      showSet: state.showSet,
      focusIndex: state.focusIndex,
    }),
    shallow
  )

  useOnClickOutside((e) => {
    const target = (e.target as HTMLElement).closest(
      '[data-type = "block-add-popup"]'
    )
    !target && showSet(false)
  })

  useEffect(() => {
    blocksMapSet(BLOCK_SELECTOR)
  }, [blocksMapSet])

  return (
    <BlockInputBaseWrapper
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      tabIndex={0}
    >
      <motion.div
        animate={{ opacity: isFocus ? 1 : 0 }}
        className="add_block-icon"
        onClick={() => showSet(true)}
        data-type="block-add-popup"
      >
        <BsFillPlusCircleFill className="add_block-icon-content" />
      </motion.div>

      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="add_block-popup"
            data-type="block-add-popup"
          >
            <ChangePopup
              tabs={['All', 'Basic', 'Table']}
              scrollTop={40 * focusIndex}
            >
              <SelectBlockContainer />
            </ChangePopup>
          </motion.div>
        )}
      </AnimatePresence>
    </BlockInputBaseWrapper>
  )
}

export default BlockInputWrapper
