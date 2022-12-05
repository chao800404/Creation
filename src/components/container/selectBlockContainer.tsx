import React, { useEffect, useState, useCallback } from 'react'
import { SelectBlockContainerWrapper } from './container.styles'
import { useBlocksStore } from '../../store/useBlocksStore'
import Image from 'next/image'
import shallow from 'zustand/shallow'
import { clearTimeout } from 'timers'
import { usePageSWR } from '../../hook/usePageSWR'
import { useRouter } from 'next/router'
import { blockTypeSelector } from '../../lib/tiptap'
import { BlockInputType, BlockSelectorType } from '../../hook/type'

type SelectBlockContainerType = {
  id: string
  focusIndex: number
  blockData: Omit<BlockInputType['blockData'], 'pageId'>
  focusIndexSet: (index: React.SetStateAction<number>) => void
  blockDataSet: (
    blockContent: Omit<BlockInputType['blockData'], 'pageId'>
  ) => void
}

const SelectBlockContainer: React.FC<SelectBlockContainerType> = ({
  id,
  focusIndex,
  focusIndexSet,
  blockDataSet,
  blockData,
}) => {
  const { blocksMap, filterBlocks } = useBlocksStore(
    (state) => ({
      blocksMap: state.blocksMap,
      filterBlocks: state.filterBlocks,
    }),
    shallow
  )

  const block = blocksMap[focusIndex]
  const [keyonStart, keyonStartSet] = useState(false)

  const createNewBlockContent = useCallback(
    (block: BlockSelectorType) => {
      return {
        name: block.name,
        content: blockTypeSelector(block.name, id).initContent,
        type: block.type,
      }
    },
    [id]
  )

  useEffect(() => {
    const blockMapContent = filterBlocks.length > 0 ? filterBlocks : blocksMap
    const handleOnKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          keyonStartSet(true)
          if (focusIndex < blockMapContent.length - 1)
            focusIndexSet((prev) => prev + 1)
          break
        case 'ArrowUp':
          keyonStartSet(true)
          e.preventDefault()
          if (focusIndex > 0) focusIndexSet((prev) => prev - 1)
          break
        case 'Enter':
          blockDataSet({
            ...blockData,
            ...createNewBlockContent(block),
          })
          keyonStartSet(true)
          break
        default:
          return
      }
      const timeout = setTimeout(() => keyonStartSet(false), 100)
      return () => clearTimeout(timeout)
    }
    document.addEventListener('keydown', handleOnKeydown, false)
    return () => {
      document.removeEventListener('keydown', handleOnKeydown, false)
    }
  }, [
    block,
    blockData,
    blockDataSet,
    blocksMap,
    createNewBlockContent,
    filterBlocks,
    focusIndex,
    focusIndexSet,
  ])

  useEffect(() => {
    keyonStartSet(false)
    focusIndexSet(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const blocksMapContent = filterBlocks.length > 0 ? filterBlocks : blocksMap

  return (
    <SelectBlockContainerWrapper tabIndex={0}>
      {blocksMapContent.map((item, index) => (
        <li
          className="select_block-btn"
          key={index}
          onClick={() =>
            blockDataSet({
              ...blockData,
              ...createNewBlockContent(block),
            })
          }
          tabIndex={0}
          data-index={index}
          style={{
            backgroundColor: index === focusIndex ? '#efefef' : 'rgba(0,0,0,0)',
          }}
          onMouseEnter={(e) => {
            if (!keyonStart) {
              e.preventDefault()
              const targetIndex = e.currentTarget.getAttribute('data-index')
              focusIndexSet(Number(targetIndex))
            }
          }}
        >
          <button>
            <span>
              <Image
                className="select_block-btn-icon"
                alt={item.name}
                src={item.image}
                objectFit="cover"
                layout="fill"
              />
            </span>
            <span>{item.name.replace('_', ' ')}</span>
            <span>{item.desc}</span>
          </button>
        </li>
      ))}
    </SelectBlockContainerWrapper>
  )
}

export default SelectBlockContainer
