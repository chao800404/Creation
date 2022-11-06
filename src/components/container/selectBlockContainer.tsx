import React, { useEffect, useRef, useState } from 'react'
import { SelectBlockContainerWrapper } from './container.styles'
import { BLOCK_SELECTOR } from '../../utils/config'
import Image from 'next/image'
import { motion } from 'framer-motion'

const SelectBlockContainer = () => {
  const elemRef = useRef<HTMLUListElement | null>(null)
  const [focusIndex, setFocusIndex] = useState<number>(0)

  useEffect(() => {
    if (elemRef && elemRef.current) {
      elemRef.current?.focus()
      const element = elemRef.current
      const handleOnKeydown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
          setFocusIndex((prev) =>
            prev < BLOCK_SELECTOR.length - 1 ? prev + 1 : prev
          )
        } else if (e.key === 'ArrowUp') {
          setFocusIndex((prev) => (prev > 0 ? prev - 1 : prev))
        }
      }
      element.addEventListener('keydown', handleOnKeydown)
      return () => {
        element.removeEventListener('keydown', handleOnKeydown)
      }
    }
  }, [])

  return (
    <SelectBlockContainerWrapper ref={elemRef} tabIndex={0}>
      {BLOCK_SELECTOR.map((item, index) => (
        <motion.li
          className="select_block-btn"
          key={index}
          onClick={() => console.log(true)}
          // whileHover={{ backgroundColor: '#efefef' }}
          tabIndex={index}
          style={{
            backgroundColor: index === focusIndex ? '#efefef' : 'rgba(0,0,0,0)',
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
        </motion.li>
      ))}
    </SelectBlockContainerWrapper>
  )
}

export default SelectBlockContainer
