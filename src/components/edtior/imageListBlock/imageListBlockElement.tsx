import React from 'react'
import { ImageListWrapper } from './imageBlock.styles'
import { ImageListElement } from './type'

export const ImageListBlockElement = React.memo((props: ImageListElement) => {
  return (
    <ImageListWrapper>
      <div className={'image_list'}>{props.children}</div>
    </ImageListWrapper>
  )
})

ImageListBlockElement.displayName = 'ImageListBlockElement'
