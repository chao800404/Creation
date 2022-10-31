import React from 'react'
import { SelectImageContainerWrapper } from './container.styles'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { usePageSWR } from '../../hook/usePageSWR'

const SelectImageContainer = ({
  coverGroup,
  groupName,
  setToggleShow,
}: {
  coverGroup: string[]
  groupName: string
  setToggleShow: (toggle: boolean) => void
}) => {
  const { page: id } = useRouter().query
  const { mutateFution } = usePageSWR(id as string)

  const handleClick = (e: React.MouseEvent) => {
    const target = (e.target as HTMLElement).closest('.cover_image')
    const src = target && target.getAttribute('data-src')
    if (src) {
      mutateFution.uploadCoverImage(id as string, src)
      setToggleShow(false)
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
              width="80"
              height="55"
              objectFit="cover"
              priority={true}
            />
          </div>
        ))}
    </SelectImageContainerWrapper>
  )
}

export default SelectImageContainer
