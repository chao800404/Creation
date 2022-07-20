import React from 'react'
import { Input, BoxProps } from '@chakra-ui/react'
import { MouseEvent } from 'react'
import { ImageType } from '../../types/base'

interface Event<T> extends MouseEvent<T> {
  target: EventTarget & T
}

interface UploadProps extends BoxProps {
  setFile: React.Dispatch<React.SetStateAction<ImageType>>
  setDragEnter: React.Dispatch<React.SetStateAction<boolean>>
}

const UploadFile = (props: UploadProps) => {
  const { setFile, setDragEnter, ...otherProps } = props

  const getFilePath = React.useCallback(
    (imageFile: FileList | null) => {
      if (!imageFile) return
      const filePath = URL.createObjectURL(imageFile[0])
      setFile(
        (prev) =>
          (prev = {
            ...prev,
            imageFilePath: filePath,
            imageName: imageFile[0].name,
          })
      )
    },
    [setFile]
  )

  const handleUpload = (e: Event<HTMLInputElement>) => {
    const imageFile = (e.target as HTMLInputElement).files
    getFilePath(imageFile)
  }

  const handleDragEnter = (e: React.DragEvent<HTMLInputElement>) => {
    e.stopPropagation()
    e.preventDefault()

    setDragEnter((enter) => !enter)
  }

  const handleDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const handleDrageLeave = (e: React.DragEvent<HTMLInputElement>) => {
    e.stopPropagation()
    e.preventDefault()
    setDragEnter((enter) => !enter)
  }

  const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.stopPropagation()
    e.preventDefault()

    const dt = e.dataTransfer
    if (dt) {
      const imageFile = dt.files
      setDragEnter((enter) => (enter = false))
      getFilePath(imageFile)
    }
  }

  return (
    <Input
      {...otherProps}
      type="file"
      accept="image/*"
      onChange={handleUpload}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDrageLeave}
    />
  )
}

export default UploadFile
