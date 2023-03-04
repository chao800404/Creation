import React, { useState, useRef, forwardRef, useCallback } from 'react'
import { BaseImageProps } from '../image/type'

import { ButtonBlockPopupWrapper } from './blockPopup.styles'

type SearchFields = {
  searchFields: string
}

export type BlockPopupElemProps<T> = {
  labels: {
    name: string
  }[]
  items: T[]
  children: JSX.Element[]
  renderItem: (props: T & SearchFields) => JSX.Element
} & BaseImageProps<T>

function BlockPopupElem<T>({
  labels,
  children,
  items,
  renderItem,
  handleUrlSet,
}: BlockPopupElemProps<T>) {
  const [labelIndex, setLabelIndex] = useState(0)
  const [index, setIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const [listLength, setListLength] = useState(items.length)

  const handleOnKeydown = useCallback(
    ({ key }: { key: string }) => {
      const inputElem = inputRef.current
      const value = inputElem?.value.length
      const cusPos = inputElem?.selectionEnd
      switch (key) {
        case 'ArrowRight':
          if (inputElem && inputElem.type === 'text') {
            cusPos === value &&
              setLabelIndex((prev) => (prev + 1) % labels.length)
          } else {
            setLabelIndex((prev) => (prev + 1) % labels.length)
          }
          break

        case 'ArrowLeft':
          if (inputElem && inputElem.type === 'text') {
            cusPos === 0 &&
              setLabelIndex(
                (prev) => (prev - 1 + labels.length) % labels.length
              )
          } else {
            setLabelIndex((prev) => (prev - 1 + labels.length) % labels.length)
          }
          break

        case 'ArrowUp':
          setIndex((prev) => (prev - 1 + listLength) % listLength)
          break
        case 'ArrowDown':
          setIndex((prev) => (prev + 1) % listLength)
          break
      }
    },
    [listLength, labels.length]
  )

  return (
    <ButtonBlockPopupWrapper
      contentEditable={false}
      className="round_sm box"
      onKeyDown={handleOnKeydown}
      style={{ gridTemplateColumns: `repeat(${labels.length} , 1fr)` }}
    >
      {labels.map(({ name }, index) => (
        <div
          key={`${name}-${index}`}
          className={`popup_label center ${
            labelIndex === index && `active-${index}`
          }`}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setLabelIndex(index)
          }}
        >
          <span>{name}</span>
        </div>
      ))}

      <div className="popup_container">
        {children &&
          React.Children?.map(children, (child, i) => {
            return (
              i === labelIndex &&
              React.cloneElement(child, {
                index,
                items,
                renderItem,
                handleUrlSet,
                setIndex,
                setListLength,
                ref: inputRef,
              })
            )
          })}
      </div>
    </ButtonBlockPopupWrapper>
  )
}

export { BlockPopupElem }
