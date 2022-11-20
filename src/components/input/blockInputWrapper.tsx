import React, { useCallback, useEffect, useState } from 'react'
import { BlockInputBaseWrapper } from './input.styles'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { motion, AnimatePresence } from 'framer-motion'
import ChangePopup from '../popup/changePopup'
import SelectBlockContainer from '../container/selectBlockContainer'
import useOnClickOutside from '../../utils/useOnClickOutside'
import { useBlocksStore } from '../../store/useBlocksStore'
import shallow from 'zustand/shallow'
import { BLOCK_SELECTOR } from '../../utils/config'
import { useRouter } from 'next/router'
import { usePageSWR } from '../../hook/usePageSWR'
import { BlockInputType } from '../../hook/type'

type BlockInputWrapperType = {
  isEmpty: boolean
  children: React.ReactNode
  popupShow: boolean
  isFocus: boolean
  blockIndex: number
  blockData: Omit<BlockInputType['blockData'], 'pageId'>
  blockDataSet: (
    blockContent: Omit<BlockInputType['blockData'], 'pageId'>
  ) => void
  popupShowSet: (show: boolean) => void
  focusSet: (focus: boolean) => void
}

const animate = (scale: number) => ({
  scale: scale,
  originX: 0,
  originY: 0,
})

const BlockInputWrapper: React.FC<BlockInputWrapperType> = ({
  isEmpty,
  children,
  popupShow,
  popupShowSet,
  focusSet,
  isFocus,
  blockIndex,
  blockData,
  blockDataSet,
}) => {
  const [focusIndex, setFocusIndex] = useState(0)
  const { blocksMapSet } = useBlocksStore(
    (state) => ({
      blocksMapSet: state.blocksMapSet,
    }),
    shallow
  )
  const { page } = useRouter().query

  const {
    mutateFunction: { addBlock },
  } = usePageSWR((page && page[0]) || '')

  const { isLeave } = useOnClickOutside((e) => {
    const target = (e.target as HTMLElement).closest(
      '[data-type = "block-add-popup"]'
    )
    !target && popupShow && popupShowSet(false)
  })

  useEffect(() => {
    blocksMapSet(BLOCK_SELECTOR)
  }, [blocksMapSet])

  const memoFocusIndexSet = useCallback(
    (index: React.SetStateAction<number>) => setFocusIndex(index),
    []
  )

  return (
    <BlockInputBaseWrapper
      onFocus={() => focusSet(true)}
      onBlur={() => !isLeave && focusSet(false)}
      tabIndex={0}
      animate={{ backgroundColor: isFocus ? '#f8f8f8' : '#ffffff' }}
      className="p_m round_sm"
    >
      <motion.div
        animate={{ opacity: isFocus && !popupShow ? 1 : 0 }}
        className="add_block-icon"
        onClick={() => {
          !isEmpty ? addBlock(blockIndex) : popupShowSet(true)
        }}
        data-type="block-add-popup"
      >
        <BsFillPlusCircleFill className="add_block-icon-content" />
      </motion.div>

      {children}
      <AnimatePresence>
        {popupShow && isFocus && isEmpty && (
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
              <SelectBlockContainer
                focusIndex={focusIndex}
                focusIndexSet={memoFocusIndexSet}
                id={blockData.id}
                blockData={blockData}
                blockDataSet={blockDataSet}
              />
            </ChangePopup>
          </motion.div>
        )}
      </AnimatePresence>
    </BlockInputBaseWrapper>
  )
}

export default BlockInputWrapper
