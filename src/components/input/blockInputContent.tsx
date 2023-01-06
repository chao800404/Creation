import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { AddBlocknputWrapper } from './input.styles'
import BlockInputWrapper from './blockInputWrapper'
import { useBlocksStore } from '../../store/useBlocksStore'
import shallow from 'zustand/shallow'
import { blockContentFilter } from '../../utils/filterFile'
import { usePageSWR } from '../../hook/usePageSWR'
import { BlockInputType } from '../../hook/type'
import { useDebounce } from 'use-debounce'
import { BlockContent } from '../blocks'
import { useKeydownStore } from '../../store/useKeydownStore'
import { blockTypeSelector } from '../../lib/tiptap'

const tabs = ['All', 'Basic', 'Table']

const BlockInputContent: React.FC<
  BlockInputType & {
    pageId: string
    bigThenOne: boolean
    blockIndex: number
  }
> = ({ blockData, pageId, bigThenOne, blockIndex }) => {
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
  const [tabIndex, setTabIndex] = useState(0)
  const [searchFields, setSearchFields] = useState('')

  const i = useKeydownStore((state) => state.index, shallow)

  const { filterBlocksMapSet, blocksMap, filterBlocks } = useBlocksStore(
    (state) => ({
      filterBlocksMapSet: state.filterBlocksMapSet,
      blocksMap: state.blocksMap,
      filterBlocks: state.filterBlocks,
    }),
    shallow
  )

  const {
    mutateFunction: { updateBlock, deleteBlock, addBlock },
  } = usePageSWR(pageId)

  const hiddenPopUp = useCallback(() => {
    const { reset } = useKeydownStore.getState()
    setPopupShow(false)
    setTimeout(() => reset(), 100)
    setTabIndex(0)
  }, [])

  const blockContentSet = useCallback(
    (i: number) => {
      setBlockContent((prevContent) => ({
        ...prevContent,
        name: blocksMap[i].name,
        content: blockTypeSelector(blocksMap[i].name, blockContent.id)
          .initContent,
        type: blocksMap[i].type,
        id: blockContent.id,
      }))
      setIsEmpty(false)
      hiddenPopUp()
    },
    [blockContent.id, blocksMap, hiddenPopUp]
  )

  const inputButtonHanlder = useCallback(() => {
    if (isEmpty && blockContent.name.toLocaleLowerCase() !== 'paragraph') {
      setPopupShow(true)
      textareaRef.current?.focus()
    } else {
      addBlock(blockIndex)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const blocksSelectMap = filterBlocks.length > 0 ? filterBlocks : blocksMap

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

  console.log(blockContent.content)

  return (
    <BlockInputWrapper
      popupShow={popupShow}
      inputButtonHanlder={inputButtonHanlder}
      blockData={blockContent}
      blocksSelectMap={blocksSelectMap}
      blockContentSet={blockContentSet}
      index={i}
      hiddenPopUp={hiddenPopUp}
      tabs={tabs}
      tabIndex={tabIndex}
      searchFields={searchFields}
    >
      <AddBlocknputWrapper>
        {isEmpty ? (
          <ReactTextareaAutosize
            placeholder={popupShow ? 'Type to filter' : "Type'/'for commands"}
            className="add_block-input"
            ref={textareaRef}
            autoFocus={true}
            onKeyDown={(e) => {
              const { handleOnKeydown } = useKeydownStore.getState()
              const position = textareaRef.current?.selectionStart

              handleOnKeydown({
                keyCode: e.key,
                length: blocksSelectMap.length,
                onSlash: () => {
                  isEmpty && setPopupShow(true)
                },
                onEsc: () => hiddenPopUp(),
                onBackspace: () => {
                  if (blockContent.content.length <= 1) {
                    hiddenPopUp()
                  }
                  if (
                    blockContent.content.length <= 0 &&
                    bigThenOne &&
                    !popupShow
                  ) {
                    deleteBlock(pageId, blockData.id)
                  }
                },
                onArrowDown: () => popupShow && e.preventDefault(),
                onArrowUp: () => popupShow && e.preventDefault(),
                onEnter: () => {
                  blockContentSet(i)
                  e.preventDefault()
                },
                onLeft: () => {
                  if (tabIndex > 0) {
                    e.preventDefault()
                    setTabIndex((index) => (index -= 1))
                  }
                },
                onRight: () => {
                  if (
                    tabIndex < tabs.length - 1 &&
                    position &&
                    position >= blockContent.content.length
                  ) {
                    e.preventDefault()
                    setTabIndex((index) => (index += 1))
                  }
                },
              })
            }}
            onChange={(e) => {
              const value = e.target.value
              const firstChar = value.split('')[0]
              filterBlocksMapSet(value.replace('/', ''))
              setSearchFields(value.replace('/', ''))
              setIsEmpty(firstChar === '/' || value.length === 0)
              setBlockContent({ ...blockContent, content: value })
            }}
            onCompositionUpdate={() => setCompositionEnd(false)}
            onCompositionEnd={() => setCompositionEnd(true)}
          />
        ) : (
          <BlockContent
            blockData={blockContent}
            className="add_block-input"
            blockContentSet={(block) => {
              setBlockContent(block)
              if (!block.content || block.content.length === 0) setIsEmpty(true)
              console.log(block)
            }}
          />
        )}
      </AddBlocknputWrapper>
    </BlockInputWrapper>
  )
}

export default React.memo(BlockInputContent)
