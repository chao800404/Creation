import React, { useCallback, useEffect, useState, useRef } from 'react'
import { BlockInputBaseWrapper } from './input.styles'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { motion, AnimatePresence } from 'framer-motion'
import ChangePopup from '../popup/changePopup'
import SelectBlockContainer from '../container/selectBlockContainer'
import useWindowPointerToggle from '../../utils/useWindowPointerToggle'
import { BlockInputType, BlockSelectorType } from '../../hook/type'
import useCalcWindowHeight from '../../utils/useCalcWindowHeight'

type BlockInputWrapperType = {
  children: React.ReactNode
  popupShow: boolean
  index: number
  tabs: string[]
  tabIndex: number
  searchFields: string
  blockData: Omit<BlockInputType['blockData'], 'pageId'>
  hiddenPopUp: () => void
  inputButtonHanlder: () => void
  blockContentSet: (index: number) => void
  blocksSelectMap: BlockSelectorType[]
}

const animate = (scale: number) => ({
  scale: scale,
  originX: 0,
  originY: 0,
})

const BlockInputWrapper: React.FC<BlockInputWrapperType> = ({
  children,
  popupShow,
  inputButtonHanlder,
  blockData,
  blocksSelectMap,
  blockContentSet,
  index,
  tabs,
  tabIndex,
  hiddenPopUp,
  searchFields,
}) => {
  const [overThenWindowMiddleH, setOverThenWindowMiddleH] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const elemRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const rect = elemRef.current?.getBoundingClientRect()
    if (rect && popupShow) {
      const { y } = rect
      setOverThenWindowMiddleH(y >= window.innerHeight / 2)
    }
  }, [popupShow])

  const { ref } = useWindowPointerToggle(() => hiddenPopUp())

  const elemPosition = useCalcWindowHeight({
    elem: ref.current,
    depend: popupShow,
  })

  return (
    <BlockInputBaseWrapper
      id={blockData.id}
      onFocusCapture={(e) => {
        e.stopPropagation()
        setShowBtn(true)
      }}
      onBlur={() => setShowBtn(false)}
      tabIndex={0}
      className="p_m round_sm"
      data-type="block-content"
      // ref={elemRef}
      ref={ref}
    >
      <motion.div
        className="add_block-icon"
        onClick={() => inputButtonHanlder()}
        data-type="block-add-popup"
        animate={{ opacity: showBtn ? 1 : 0 }}
        style={{ visibility: showBtn ? 'visible' : 'hidden' }}
      >
        <BsFillPlusCircleFill className="add_block-icon-content" />
      </motion.div>

      {children}
      <AnimatePresence>
        {popupShow && (
          <motion.div
            transition={{ type: 'spring', damping: 10, stiffness: 350 }}
            initial={animate(1)}
            animate={animate(1.05)}
            exit={animate(0.95)}
            className="add_block-popup"
            data-type="block-add-popup"
            style={{ bottom: elemPosition === 'TOP' ? '4.5rem' : ' -20.5rem' }}
          >
            <ChangePopup tabs={tabs} move={index * 40} newIndex={tabIndex}>
              <SelectBlockContainer
                blocksSelectMap={blocksSelectMap}
                blockContentSet={blockContentSet}
                searchFields={searchFields}
              />
              <div>hekkio</div>
              <div>aaa</div>
            </ChangePopup>
          </motion.div>
        )}
      </AnimatePresence>
    </BlockInputBaseWrapper>
  )
}

export default BlockInputWrapper
