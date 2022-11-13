import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { AddBlocknputWrapper } from './input.styles'
import BlockInputWrapper from './blockInputWrapper'
import { useBlocksStore } from '../../store/useBlocksStore'
import shallow from 'zustand/shallow'
import TextBlock from '../blocks/textBlock'
import { Text } from '@prisma/client'
import { blockContentFilter } from '../../utils/filterFile'
import { phoneticNotationFilter } from '../../utils/filterFile'
import { usePageStore } from '../../store/usePageStore'

type BlockInputType = {
  blockData?: {
    name: string
    index: number
    id: string
    content: string
  }
}

const BlockFilterType = ({
  blockData,
  memoEmptySet,
  value,
  className,
}: {
  blockData: Text
  value: string
  className: string
  memoEmptySet: (toggle: boolean) => void
}) => {
  switch (blockData.name) {
    case 'text':
      return (
        <TextBlock
          blockData={blockData}
          memoEmptySet={memoEmptySet}
          value={value}
          className={className}
        />
      )
    default:
      return (
        <TextBlock
          blockData={blockData}
          memoEmptySet={memoEmptySet}
          value={value}
          className={className}
        />
      )
  }
}

const BlockInputContent: React.FC<BlockInputType> = ({ blockData }) => {
  const textareaRef = useRef<null | HTMLTextAreaElement>(null)
  const [filterError, setFilterError] = useState(0)
  const [isEmpty, setIsEmpty] = useState<boolean>(true)
  const [value, setValue] = useState('')
  const [compositionEnd, setCompositionEnd] = useState(true)

  const { filterBlocksMapSet, popupShowSet, filterBlocks, focusIndexSet } =
    useBlocksStore(
      (state) => ({
        filterBlocksMapSet: state.filterBlocksMapSet,
        popupShowSet: state.popupShowSet,
        filterBlocks: state.filterBlocks,
        focusIndexSet: state.focusIndexSet,
        focusIndex: state.focusIndex,
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
          popupShowSet(true)
          setFilterError(0)
          break
      }
    }
  }

  useEffect(() => {
    if (blockData?.content) {
      setIsEmpty(!blockContentFilter(blockData?.content || ''))
      setValue(blockData?.content)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (filterError > 2) {
      return popupShowSet(false)
    }
  }, [filterError, popupShowSet])

  useEffect(() => {
    textareaRef.current?.focus()
  }, [isEmpty])

  const memoEmptySet = useCallback((toggle: boolean) => setIsEmpty(toggle), [])

  useEffect(() => {
    const isFocus = document.activeElement === textareaRef.current
    const lowerCaseValue = value.toLowerCase()
    if (filterBlocks.length <= 0) {
      setFilterError((prev) => prev + 1)
    }
    if (lowerCaseValue.startsWith('/') && isFocus) {
      const blockName = value.replace('/', '')
      filterBlocksMapSet(blockName)
      focusIndexSet(0)
    } else if (
      value.length > 0 &&
      !phoneticNotationFilter(value) &&
      compositionEnd
    ) {
      setIsEmpty(false)
      setValue(value)
    }
    if (!value && isFocus) {
      popupShowSet(false)
      setFilterError(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compositionEnd, value])

  return (
    <BlockInputWrapper tabIndex={blockData?.index || 0}>
      <AddBlocknputWrapper>
        {isEmpty ? (
          <ReactTextareaAutosize
            placeholder="Type '/'for commands"
            className="add_block-input"
            ref={textareaRef}
            onKeyDown={handleKeyDownOnEnter}
            onChange={(e) => setValue(e.target.value)}
            onCompositionUpdate={() => setCompositionEnd(false)}
            onCompositionEnd={() => setCompositionEnd(true)}
          />
        ) : (
          <BlockFilterType
            blockData={blockData as Text}
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
