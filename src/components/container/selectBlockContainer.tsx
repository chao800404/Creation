import React from 'react'
import { SelectBlockContainerWrapper } from './container.styles'
import { BLOCK_SELECTOR } from '../../utils/config'
import Image from 'next/image'

const SelectBlockContainer = () => {
  return (
    <SelectBlockContainerWrapper>
      {BLOCK_SELECTOR.map((item, index) => (
        <li
          className="select_block-btn"
          key={index}
          onClick={() => console.log(true)}
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
