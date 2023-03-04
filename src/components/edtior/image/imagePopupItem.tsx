import React from 'react'
import { ImagePopupItemProps } from './type'
import Image from 'next/image'
import { ImagePopupItemWrapper } from './imageElement.styles'
import { Heightlight } from '../../heightLight'

export const ImagePopupItem = ({
  name,
  src,
  searchFields,
}: ImagePopupItemProps & { searchFields: string }) => {
  return (
    <ImagePopupItemWrapper>
      {src && (
        <div className="image_container">
          <Image src={src} alt={name} objectFit="cover" layout="fill" />
        </div>
      )}
      <span className="image_title">
        <Heightlight
          searchFields={searchFields.toLocaleLowerCase()}
          text={name.toLocaleLowerCase().replace('_', ' ')}
          className="searchFields_color"
        />
      </span>
    </ImagePopupItemWrapper>
  )
}
