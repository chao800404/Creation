import React, { forwardRef } from 'react'
import UploadImageContainer from '../../container/uploadImageContainer'
import { InternalLinkProps } from '../blockPopup/type'
import { BaseImageProps, ImagePopupItemProps } from './type'

export const UploadImageElement = forwardRef<
  HTMLInputElement,
  InternalLinkProps<
    ImagePopupItemProps,
    BaseImageProps<unknown>['handleUrlSet']
  >
>(function UploadImageElement(props, ref) {
  const { handleUrlSet } = props

  return (
    <UploadImageContainer
      typesetting="row"
      handleUpload={({ imageName, file }) => {
        if (file) {
          const url = URL.createObjectURL(file)
          handleUrlSet(url)
        }
      }}
    />
  )
})
