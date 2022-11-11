/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { AddBlocknputWrapper } from './input.styles'
import BlockInputWrapper from './blockInputWrapper'
import { useBlocksStore } from '../../store/useBlocksStore'
import shallow from 'zustand/shallow'
import Heading from '../blocks/heading'
import { Text } from '@prisma/client'
import { blockContentFilter } from '../../utils/filterFile'

type BlockInputType = {
  blockData?: Text
}

const BlockFilterType = ({
  blockData,
  memoEmptySet,
  value,
}: {
  blockData: Text
  value: string
  memoEmptySet: (toggle: boolean) => void
}) => {
  switch (blockData.name) {
    case 'text':
      return (
        <Heading
          blockData={blockData}
          memoEmptySet={memoEmptySet}
          value={value}
        />
      )
    default:
      return (
        <Heading
          blockData={blockData}
          memoEmptySet={memoEmptySet}
          value={value}
        />
      )
  }
}

const BlockInputContent: React.FC<BlockInputType> = ({ blockData }) => {
  const textareaRef = useRef<null | HTMLTextAreaElement>(null)
  const [filterError, setFilterError] = useState(0)
  const [isEmpty, setIsEmpty] = useState<boolean>(
    !blockContentFilter(blockData?.content || '')
  )
  const [value, setValue] = useState(blockData?.content)

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
    if (isFocus) {
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
    if (filterError > 2) {
      return popupShowSet(false)
    }
  }, [filterError, popupShowSet])

  useEffect(() => {
    textareaRef.current?.focus()
  }, [isEmpty])

  const memoEmptySet = useCallback((toggle: boolean) => setIsEmpty(toggle), [])

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const isFocus = document.activeElement === textareaRef.current
    const value = e.target.value.toLowerCase()
    if (filterBlocks.length <= 0) {
      setFilterError((prev) => prev + 1)
    }
    if (value.startsWith('/') && isFocus) {
      const blockName = value.replace('/', '')
      filterBlocksMapSet(blockName)
      focusIndexSet(0)
    } else if (value.length > 0) {
      setIsEmpty(false)
      setValue(e.target.value)
    }
    if (!value && isFocus) {
      popupShowSet(false)
      setFilterError(0)
    }
  }

  return (
    <BlockInputWrapper tabIndex={blockData?.index || 0}>
      <AddBlocknputWrapper>
        {isEmpty ? (
          <ReactTextareaAutosize
            placeholder="Type '/'for commands"
            className="add_block-input"
            ref={textareaRef}
            onKeyDown={handleKeyDownOnEnter}
            onChange={handleOnChange}
          />
        ) : (
          <BlockFilterType
            blockData={blockData as Text}
            memoEmptySet={memoEmptySet}
            value={value || ''}
          />
        )}
      </AddBlocknputWrapper>
    </BlockInputWrapper>
  )
}

export default React.memo(BlockInputContent)
