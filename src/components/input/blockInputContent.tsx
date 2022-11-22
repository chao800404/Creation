import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { AddBlocknputWrapper } from './input.styles'
import BlockInputWrapper from './blockInputWrapper'
import { useBlocksStore } from '../../store/useBlocksStore'
import shallow from 'zustand/shallow'
import TextBlock from '../blocks/textBlock'
import { blockContentFilter } from '../../utils/filterFile'
import { usePageSWR } from '../../hook/usePageSWR'
import { BlockInputType } from '../../hook/type'
import { useDebounce } from 'use-debounce'

const BlockInputContent: React.FC<
  BlockInputType & {
    pageId: string
    blockIndex: number
    bigThenOne: boolean
  }
> = ({ blockData, pageId, blockIndex, bigThenOne }) => {
  const textareaRef = useRef<null | HTMLTextAreaElement>(null)
  const [isEmpty, setIsEmpty] = useState<boolean>(
    blockContentFilter(blockData?.content)?.length <= 0
  )
  const [blockContent, setBlockContent] = useState<
    Omit<BlockInputType['blockData'], 'pageId'>
  >({
    name: blockData?.name,
    id: blockData?.id,
    content: blockData?.content,
    type: blockData?.type,
  })
  const newBlock = useRef(!!blockData?.newBlock || false)
  const [debounceValue] = useDebounce(blockContent, 500)
  const [compositionEnd, setCompositionEnd] = useState(true)
  const [popupShow, setPopupShow] = useState(!!newBlock.current)
  const [isFocus, setIsFocus] = useState(!!blockData?.focus || false)

  const {
    mutateFunction: { deleteBlock },
  } = usePageSWR(pageId)
  const { filterBlocksMapSet } = useBlocksStore(
    (state) => ({
      filterBlocksMapSet: state.filterBlocksMapSet,
    }),
    shallow
  )

  const {
    mutateFunction: { updateBlock },
  } = usePageSWR(pageId)

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
        case 'Escape':
          setPopupShow(false)
          break
        case 'Backspace':
          if (blockContent.content.length <= 1) {
            setPopupShow(false)
          }
          if (blockContent.content.length <= 0 && bigThenOne && !popupShow) {
            deleteBlock(pageId, blockData.id, blockIndex)
          }
          break
        default:
          return
      }
    }
  }

  const blockContentSet = useCallback(
    (blockContent: Omit<BlockInputType['blockData'], 'pageId'>) => {
      setBlockContent((prevContent) => ({ ...prevContent, ...blockContent }))
    },
    []
  )

  const memoPopupShowSet = useCallback(
    (show: boolean) => setPopupShow(show),
    []
  )
  const memoFocusSet = useCallback((focus: boolean) => setIsFocus(focus), [])

  useEffect(() => {
    if (
      !debounceValue?.content?.startsWith('/') &&
      debounceValue.content !== blockData.content
    ) {
      updateBlock(debounceValue.id, {
        ...debounceValue,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue])

  useEffect(() => {
    if (blockData.focus) {
      setIsFocus(true)
    }
  }, [blockData])

  useEffect(() => {
    if (isEmpty && isFocus) {
      textareaRef.current?.focus()
    }
    if (!isEmpty) newBlock.current = false
    setPopupShow(!!newBlock.current)
  }, [isEmpty, isFocus])

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  useEffect(() => {
    if (blockContent.content.startsWith('/')) return
    if (compositionEnd) {
      setIsEmpty(blockContent.content.length <= 0)
    }
  }, [blockContent, compositionEnd])

  return (
    <BlockInputWrapper
      isEmpty={isEmpty}
      popupShowSet={memoPopupShowSet}
      popupShow={popupShow}
      focusSet={memoFocusSet}
      isFocus={isFocus}
      blockData={blockContent}
      blockIndex={blockIndex}
      blockDataSet={blockContentSet}
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
            onChange={(e) => {
              filterBlocksMapSet(e.target.value.replace('/', ''))
              blockContentSet({ ...blockContent, content: e.target.value })
            }}
            onCompositionUpdate={() => setCompositionEnd(false)}
            onCompositionEnd={() => setCompositionEnd(true)}
          />
        ) : (
          <TextBlock
            blockData={blockContent}
            className="add_block-input"
            blockContentSet={blockContentSet}
            isFocus={isFocus}
          />
        )}
      </AddBlocknputWrapper>
    </BlockInputWrapper>
  )
}

export default React.memo(BlockInputContent)
