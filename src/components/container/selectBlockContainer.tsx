import React, { useEffect, useState, useCallback } from 'react'
import { SelectBlockContainerWrapper } from './container.styles'
import { useBlocksStore } from '../../store/useBlocksStore'
import Image from 'next/image'
import shallow from 'zustand/shallow'
import { clearTimeout } from 'timers'
import { usePageSWR } from '../../hook/usePageSWR'
import { useRouter } from 'next/router'
import { blockTypeSelector } from '../../lib/tiptap'

type SelectBlockContainerType = {
  id: string
  focusIndex: number
  blockIndex: number
  focusIndexSet: (index: React.SetStateAction<number>) => void
}

const SelectBlockContainer: React.FC<SelectBlockContainerType> = ({
  id,
  focusIndex,
  focusIndexSet,
  blockIndex,
}) => {
  const { blocksMap, filterBlocks } = useBlocksStore(
    (state) => ({
      blocksMap: state.blocksMap,
      filterBlocks: state.filterBlocks,
    }),
    shallow
  )

  const [keyonStart, keyonStartSet] = useState(false)
  const { page } = useRouter().query
  const {
    mutateFunction: { updateBlock },
  } = usePageSWR((page && page[0]) || '')

  const updataBlockContent = useCallback(() => {
    const block = blocksMap[focusIndex]
    updateBlock(id, {
      name: block.name,
      content: blockTypeSelector(block.name).initContent,
      type: block.type,
      index: blockIndex,
      id,
    })
  }, [blockIndex, blocksMap, focusIndex, id, updateBlock])

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
          keyonStartSet(true)
          updataBlockContent()
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
  }, [blocksMap, filterBlocks, focusIndex, focusIndexSet, updataBlockContent])

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
          onClick={updataBlockContent}
          tabIndex={index}
          style={{
            backgroundColor: index === focusIndex ? '#efefef' : 'rgba(0,0,0,0)',
          }}
          onMouseEnter={(e) => {
            if (!keyonStart) {
              const targetIndex = e.currentTarget.tabIndex
              focusIndexSet(targetIndex)
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
