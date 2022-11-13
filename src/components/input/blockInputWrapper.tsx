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
  tabIndex: number
  children: React.ReactNode
}

const animate = (scale: number) => ({
  scale: scale,
  originX: 0,
  originY: 0,
})

const BlockInputWrapper: React.FC<BlockInputWrapperType> = ({
  tabIndex,
  children,
}) => {
  const [isFocus, setIsFocus] = useState(false)
  const { blocksMapSet, popupShow, popupShowSet, focusIndex } = useBlocksStore(
    (state) => ({
      blocksMapSet: state.blocksMapSet,
      popupShow: state.popupShow,
      popupShowSet: state.popupShowSet,
      focusIndex: state.focusIndex,
    }),
    shallow
  )

  useOnClickOutside((e) => {
    const target = (e.target as HTMLElement).closest(
      '[data-type = "block-add-popup"]'
    )
    !target && popupShow && popupShowSet(false)
  })

  useEffect(() => {
    blocksMapSet(BLOCK_SELECTOR)
  }, [blocksMapSet])

  return (
    <BlockInputBaseWrapper
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      tabIndex={tabIndex}
    >
      <motion.div
        animate={{ opacity: isFocus && !popupShow ? 1 : 0 }}
        className="add_block-icon"
        onClick={() => popupShowSet(true)}
        data-type="block-add-popup"
      >
        <BsFillPlusCircleFill className="add_block-icon-content" />
      </motion.div>

      {children}
      <AnimatePresence>
        {popupShow && isFocus && (
          <motion.div
            transition={{ type: 'spring', damping: 10, stiffness: 350 }}
            initial={animate(1)}
            animate={animate(1.05)}
            exit={animate(0.95)}
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
