import React from 'react'
import { SelectBlockItem } from './container.styles'
import Image from 'next/image'
import shallow from 'zustand/shallow'
import { BlockSelectorType } from '../../hook/type'
import { useKeydownStore } from '../../store/useKeydownStore'
import { Heightlight } from '../heightLight'

type SelectBlockContainerType = {
  blocksSelectMap: BlockSelectorType[]
  searchFields: string
  blockContentSet: (index: number) => void
}

const SelectBlockContainer: React.FC<SelectBlockContainerType> = ({
  blocksSelectMap,
  blockContentSet,
  searchFields,
}) => {
  const i = useKeydownStore((state) => state.index, shallow)

  return (
    <ul>
      {blocksSelectMap.map((item, index) => {
        const blockName = item.name.replace('_', ' ')

        return (
          <SelectBlockItem
            className="select_block-btn"
            key={index}
            onClick={() => blockContentSet(index)}
            tabIndex={0}
            isActive={index === i}
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
              <span>
                <Heightlight
                  text={blockName.toLocaleLowerCase()}
                  searchFields={searchFields}
                  className="heightligh"
                />
              </span>
              <span>{item.desc}</span>
            </button>
          </SelectBlockItem>
        )
      })}
    </ul>
  )
}

export default SelectBlockContainer
