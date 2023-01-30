import React from 'react'
import { SelectBlockItem } from './mention.style'
import Image from 'next/image'
import { Heightlight } from '../../heightLight'
import { ComboboxItemProps, RenderFunction } from '@udecode/plate'
import { Item } from './type'

type SelectItemProps = {
  onClick: (key: string) => void
} & ComboboxItemProps<Item>

const SelectItem = (props: SelectItemProps) => {
  const { search, item, onClick } = props

  return (
    <SelectBlockItem
      className="select_block-btn"
      tabIndex={0}
      onClick={() => onClick(item.key)}
    >
      <button>
        <span>
          <Image
            className="select_block-btn-icon"
            alt={item.text}
            src={item.data.image}
            objectFit="cover"
            layout="fill"
          />
        </span>
        <span>
          <Heightlight
            text={item.text.toLocaleLowerCase()}
            searchFields={search}
            className="heightligh"
          />
        </span>
        <span>{item.data.desc}</span>
      </button>
    </SelectBlockItem>
  )
}

export default SelectItem
