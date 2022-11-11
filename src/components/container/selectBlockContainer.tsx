import React, { useEffect, useState } from 'react'
import { SelectBlockContainerWrapper } from './container.styles'
import { useBlocksStore } from '../../store/useBlocksStore'
import Image from 'next/image'
import shallow from 'zustand/shallow'
import { clearTimeout } from 'timers'

const SelectBlockContainer = () => {
  const {
    blocksMap,
    filterBlocks,
    popupShow,
    incrOrDecrFocusIndex,
    focusIndex,
    focusIndexSet,
  } = useBlocksStore(
    (state) => ({
      blocksMap: state.blocksMap,
      filterBlocks: state.filterBlocks,
      popupShow: state.popupShow,
      incrOrDecrFocusIndex: state.incrOrDecrFocusIndex,
      focusIndex: state.focusIndex,
      focusIndexSet: state.focusIndexSet,
    }),
    shallow
  )
  const [keyonStart, keyonStartSet] = useState(false)

  useEffect(() => {
    if (popupShow) {
      const handleOnKeydown = (e: KeyboardEvent) => {
        keyonStartSet(true)
        switch (e.key) {
          case 'ArrowDown':
            incrOrDecrFocusIndex('ArrowDown')
            break
          case 'ArrowUp':
            e.preventDefault()
            incrOrDecrFocusIndex('ArrowUp')
            break
          case 'Enter':
            console.log(focusIndex)
            break
        }
        const timeout = setTimeout(() => keyonStartSet(false), 100)
        return () => clearTimeout(timeout)
      }
      document.addEventListener('keydown', handleOnKeydown, false)
      return () => {
        document.removeEventListener('keydown', handleOnKeydown, false)
      }
    }
  }, [blocksMap.length, popupShow, incrOrDecrFocusIndex, focusIndex])

  const blocksMapContent = filterBlocks.length > 0 ? filterBlocks : blocksMap

  return (
    <SelectBlockContainerWrapper tabIndex={0}>
      {blocksMapContent.map((item, index) => (
        <li
          className="select_block-btn"
          key={index}
          onClick={() => console.log(true)}
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
