import React, { useEffect, useRef, useState } from 'react'
import { SelectBlockContainerWrapper } from './container.styles'
import { useBlocksStore } from '../../store/useBlocksStore'
import Image from 'next/image'
import shallow from 'zustand/shallow'
import { clearTimeout } from 'timers'

const SelectBlockContainer = () => {
  const { blocksMap, filterBlocks, show, focusIndexSet, focusIndex } =
    useBlocksStore(
      (state) => ({
        blocksMap: state.blocksMap,
        filterBlocks: state.filterBlocks,
        show: state.show,
        focusIndexSet: state.focusIndexSet,
        focusIndex: state.focusIndex,
      }),
      shallow
    )
  const [keyonStart, keyonStartSet] = useState(false)

  useEffect(() => {
    if (show) {
      const handleOnKeydown = (e: KeyboardEvent) => {
        keyonStartSet(true)
        if (e.key === 'ArrowDown') {
          focusIndexSet(
            focusIndex < blocksMap.length - 1 ? focusIndex + 1 : focusIndex
          )
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          focusIndexSet(focusIndex > 0 ? focusIndex - 1 : focusIndex)
        }
        const timeout = setTimeout(() => keyonStartSet(false), 100)
        return () => clearTimeout(timeout)
      }
      document.addEventListener('keydown', handleOnKeydown)
      return () => {
        document.removeEventListener('keydown', handleOnKeydown)
      }
    }
  }, [blocksMap.length, show, focusIndexSet, focusIndex])

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
