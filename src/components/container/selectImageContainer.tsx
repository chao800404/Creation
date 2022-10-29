import React, { MouseEventHandler, useRef } from 'react'
import { SelectImageContainerWrapper } from './container.styles'
import Image from 'next/image'
import { usePageStore } from '../../store'
import shallow from 'zustand/shallow'
import { useSWRConfig } from 'swr'
import { updateData } from '../../utils/fetch'
import { useUploadLocalCoverImage } from '../../hook/useUploadLocalCoverImage'

const SelectImageContainer = ({
  coverGroup,
  groupName,
  setToggleShow,
}: {
  coverGroup: string[]
  groupName: string
  setToggleShow: (toggle: boolean) => void
}) => {
  const muatate = useUploadLocalCoverImage()

  const { id, imageSet } = usePageStore(
    (state) => ({ id: state.id, imageSet: state.imageSet }),
    shallow
  )

  const handleClick = (e: React.MouseEvent) => {
    const target = (e.target as HTMLElement).closest('.cover_image')
    const src = target && target.getAttribute('data-src')
    if (src) {
      imageSet(src)
      setToggleShow(false)
      muatate(id, src)
    }
  }

  return (
    <SelectImageContainerWrapper>
      <p className="selectImage-header">
        {groupName?.toUpperCase().replaceAll('_', ' ')}
      </p>
      {coverGroup &&
        coverGroup?.map((path, index) => (
          <div
            className="selectImage-content cover_image"
            data-src={path}
            key={index}
            onClick={handleClick}
          >
            <Image
              alt={`${groupName}-${index}`}
              src={path as string}
              layout="fill"
              objectFit="cover"
              priority={true}
            />
          </div>
        ))}
    </SelectImageContainerWrapper>
  )
}

export default SelectImageContainer
