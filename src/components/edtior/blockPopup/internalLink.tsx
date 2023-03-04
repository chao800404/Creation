import React, { useEffect, useRef, useState, forwardRef } from 'react'
import WrapperScrollbar from '../../scroll/wrapperScrollbar'
import { BaseImageProps, ImagePopupItemProps } from '../image/type'
import { SelectIsEmpty, SelectItemWrapper } from './blockPopup.styles'
import { replaceText } from '../../../utils/filterFile'
import { InternalLinkProps, SelectElemRef, SelectItemProps } from './type'
import { HideImage } from '@styled-icons/material-twotone/HideImage'
import Tippy from '@tippyjs/react'

type InternalLinkAttrs = InternalLinkProps<
  ImagePopupItemProps,
  BaseImageProps<ImagePopupItemProps>['handleUrlSet']
>

const SelectItem = forwardRef(function SelectItem(
  { children, active, handleOnClick }: SelectItemProps,
  ref: SelectElemRef
) {
  return (
    <SelectItemWrapper onClick={handleOnClick} ref={ref} active={active}>
      {children}
    </SelectItemWrapper>
  )
})

const InternalLink = forwardRef<HTMLInputElement, InternalLinkAttrs>(
  function InternalLink(
    {
      items,
      index,
      renderItem: RenderItem,
      handleUrlSet,
      setIndex,
      setListLength,
    },
    inputRef
  ) {
    const [searchFields, setSearchFields] = useState('')
    const elemRef = useRef<HTMLDivElement>(null)
    const [itemHeight, setItemHeight] = useState<null | number>(null)

    const filterImages =
      searchFields?.length > 0
        ? items.filter((item) => replaceText(item.name).includes(searchFields))
        : items

    useEffect(() => {
      if (elemRef && elemRef.current) {
        setItemHeight(elemRef.current.getBoundingClientRect().height)
      }
    }, [])

    useEffect(() => {
      setListLength(filterImages.length)
    }, [filterImages, setListLength])

    return (
      <>
        <input
          type="text"
          placeholder="Search Image"
          autoFocus={true}
          defaultValue={searchFields || ''}
          ref={inputRef}
          onChange={(e) => {
            setSearchFields(e.target.value)
            setIndex(0)
          }}
          onKeyDown={(e) => {
            const key = e.key
            if (key === 'Enter') handleUrlSet(filterImages[index])
          }}
        />

        {filterImages && filterImages.length > 0 ? (
          <WrapperScrollbar move={index * (itemHeight ? itemHeight : 20)}>
            <div className="popup_field-name ">
              {!searchFields ? 'SAVED IMAGE' : 'FILTER IMAGE'}
            </div>
            {filterImages?.map((props, i) => (
              <SelectItem
                ref={elemRef}
                active={index === i}
                key={`${props.name}-${index}`}
                handleOnClick={(e) => {
                  e.preventDefault()
                  handleUrlSet(props)
                }}
              >
                <RenderItem searchFields={searchFields} {...props} />
              </SelectItem>
            ))}
          </WrapperScrollbar>
        ) : (
          <SelectIsEmpty className="center">
            <Tippy
              content={'You can open a new doc to create a image group'}
              className="tippy_style"
            >
              <HideImage width={'3.2rem'} height={'3.2rem'} />
            </Tippy>
            <span>No relevant images found.</span>
          </SelectIsEmpty>
        )}
      </>
    )
  }
)

export default InternalLink
