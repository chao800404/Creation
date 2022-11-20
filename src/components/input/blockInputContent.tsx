import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { AddBlocknputWrapper } from './input.styles'
import BlockInputWrapper from './blockInputWrapper'
import { useBlocksStore } from '../../store/useBlocksStore'
import shallow from 'zustand/shallow'
import TextBlock from '../blocks/textBlock'
import { blockContentFilter } from '../../utils/filterFile'
import { phoneticNotationFilter } from '../../utils/filterFile'
import { usePageSWR } from '../../hook/usePageSWR'
import { BlockInputType } from '../../hook/type'
import { useDebounce } from 'use-debounce'

// const BlockFilterType = ({
//   blockData,
//   ...otherProps
// }: {
//   blockData: BlockInputType['blockData']
//   value: string
//   className: string
//   memoEmptySet: (toggle: boolean) => void
// }) => {
//   switch (blockData?.type) {
//     case 'text':
//       return <TextBlock blockData={blockData} {...otherProps} />
//     default:
//       return <TextBlock blockData={blockData} {...otherProps} />
//   }
// }

const BlockInputContent: React.FC<
  BlockInputType & { pageId: string; blockIndex: number; bigThenOne: boolean }
> = ({ blockData, pageId, blockIndex, bigThenOne }) => {
  const textareaRef = useRef<null | HTMLTextAreaElement>(null)
  const [isEmpty, setIsEmpty] = useState<boolean>(
    blockContentFilter(blockData?.content)?.length <= 0
  )
  const [blockContent, setBlockContent] = useState<
    Omit<BlockInputType['blockData'], 'pageId'>
  >({
    name: blockData.name,
    id: blockData.id,
    content: blockData.content,
    type: blockData.type,
  })
  const newBlock = useRef(blockData.newBlock)
  const [debounceValue] = useDebounce(blockContent, 500)
  const [compositionEnd, setCompositionEnd] = useState(true)
  const [popupShow, setPopupShow] = useState(!!newBlock.current)
  const [isFocus, setIsFocus] = useState(false)
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
    newBlock.current = false
    if (isFocus && isEmpty) {
      switch (e.key) {
        case 'Enter':
          e.preventDefault()
          break
        case '/':
          setPopupShow(true)
          break
        case 'v':
          if (e.ctrlKey === true) {
            setIsEmpty(false)
          }
          break
        case 'Escape':
          setPopupShow(false)
          break
        case 'Backspace':
          if (blockContent.content.length <= 1) {
            setPopupShow(false)
          }
          if (blockContent.content.length <= 0 && bigThenOne) {
            deleteBlock(pageId, blockData.id)
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
    updateBlock(debounceValue.id, {
      ...debounceValue,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue])

  useEffect(() => {
    textareaRef.current?.focus()
    setPopupShow(!!newBlock.current)
  }, [isEmpty])

  useEffect(() => {
    if (blockContent.content.startsWith('/')) return
    setIsEmpty(blockContent.content.length <= 0)
  }, [blockContent])

  useEffect(() => {
    const isFocus = document.activeElement === textareaRef.current
    const lowerCaseValue = blockContent.content?.toLowerCase()

    if (lowerCaseValue?.startsWith('/') && isFocus) {
      const blockName = blockContent.content?.replace('/', '')
      filterBlocksMapSet(blockName)
    }
    if (
      blockContent.content?.length > 0 &&
      !phoneticNotationFilter(blockContent.content) &&
      !blockContent.content.startsWith('/') &&
      compositionEnd
    ) {
      setIsEmpty(false)
    }
  }, [compositionEnd, filterBlocksMapSet, blockContent])

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
            onChange={(e) =>
              blockContentSet({ ...blockContent, content: e.target.value })
            }
            onCompositionUpdate={() => setCompositionEnd(false)}
            onCompositionEnd={() => setCompositionEnd(true)}
          />
        ) : (
          <TextBlock
            blockData={blockContent}
            className="add_block-input"
            blockContentSet={blockContentSet}
          />
        )}
      </AddBlocknputWrapper>
    </BlockInputWrapper>
  )
}

export default BlockInputContent
