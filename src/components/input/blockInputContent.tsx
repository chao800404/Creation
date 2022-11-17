import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { AddBlocknputWrapper } from './input.styles'
import BlockInputWrapper from './blockInputWrapper'
import { useBlocksStore } from '../../store/useBlocksStore'
import shallow from 'zustand/shallow'
import TextBlock from '../blocks/textBlock'
import { blockContentFilter } from '../../utils/filterFile'
import { phoneticNotationFilter } from '../../utils/filterFile'
import { BlockInputType } from '../../types/block'

const BlockFilterType = ({
  blockData,
  ...otherProps
}: {
  blockData: BlockInputType['blockData']
  value: string
  className: string
  memoEmptySet: (toggle: boolean) => void
}) => {
  switch (blockData.type) {
    case 'text':
      return <TextBlock blockData={blockData} {...otherProps} />
    default:
      return <TextBlock blockData={blockData} {...otherProps} />
  }
}

const BlockInputContent: React.FC<BlockInputType> = ({ blockData }) => {
  const textareaRef = useRef<null | HTMLTextAreaElement>(null)

  const [isEmpty, setIsEmpty] = useState<boolean>(true)
  const [value, setValue] = useState(blockData?.content)
  const [compositionEnd, setCompositionEnd] = useState(true)
  const [popupShow, setPopupShow] = useState(blockData.newBlock || false)
  const [isFocus, setIsFocus] = useState(false)

  const { filterBlocksMapSet, filterBlocks } = useBlocksStore(
    (state) => ({
      filterBlocksMapSet: state.filterBlocksMapSet,
      filterBlocks: state.filterBlocks,
    }),
    shallow
  )

  const handleKeyDownOnEnter = (e: React.KeyboardEvent) => {
    const isFocus = document.activeElement === textareaRef.current
    if (isFocus && isEmpty) {
      switch (e.key) {
        case 'Enter':
          e.preventDefault()
          break
        case '/':
          setPopupShow(true)

          break
        case 'Backspace':
          if (value.length <= 1) setPopupShow(false)
      }
    }
  }

  useEffect(() => {
    if (blockData?.content) {
      setIsEmpty(blockContentFilter(blockData?.content).length <= 0)
      setValue(blockData?.content)
      setPopupShow(blockData.newBlock ? blockData.newBlock : false)
    }
  }, [blockData])

  useEffect(() => {
    textareaRef.current?.focus()
  }, [isEmpty])

  const memoEmptySet = useCallback((toggle: boolean) => setIsEmpty(toggle), [])
  const memoPopupShowSet = useCallback(
    (show: boolean) => setPopupShow(show),
    []
  )
  const memoFocusSet = useCallback((focus: boolean) => setIsFocus(focus), [])

  useEffect(() => {
    const isFocus = document.activeElement === textareaRef.current
    const lowerCaseValue = value.toLowerCase()

    if (lowerCaseValue.startsWith('/') && isFocus) {
      const blockName = value.replace('/', '')
      filterBlocksMapSet(blockName)
    } else if (
      value.length > 0 &&
      !phoneticNotationFilter(value) &&
      compositionEnd
    ) {
      setIsEmpty(false)
      setValue(value)
    }
    // if (!value && isFocus) {
    //   popupShowSet(false)
    //   setFilterError(0)
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compositionEnd, value])

  return (
    <BlockInputWrapper
      tabIndex={blockData?.index || 0}
      isEmpty={isEmpty}
      popupShowSet={memoPopupShowSet}
      popupShow={popupShow}
      focusSet={memoFocusSet}
      isFocus={isFocus}
      id={blockData.id}
      blockIndex={blockData.index}
    >
      <AddBlocknputWrapper
        isFocus={document.activeElement === textareaRef.current}
      >
        {isEmpty ? (
          <ReactTextareaAutosize
            placeholder={popupShow ? 'Type to filter' : "Type '/'for commands"}
            className="add_block-input"
            ref={textareaRef}
            onKeyDown={handleKeyDownOnEnter}
            onChange={(e) => setValue(e.target.value)}
            onCompositionUpdate={() => setCompositionEnd(false)}
            onCompositionEnd={() => setCompositionEnd(true)}
          />
        ) : (
          <BlockFilterType
            blockData={blockData}
            memoEmptySet={memoEmptySet}
            value={value || ''}
            className="add_block-input"
          />
        )}
      </AddBlocknputWrapper>
    </BlockInputWrapper>
  )
}

export default React.memo(BlockInputContent)
