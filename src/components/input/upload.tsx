import React from 'react'
import { MouseEvent } from 'react'

interface Event<T> extends MouseEvent<T> {
  target: EventTarget & T
}

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export type ImageType = {
  imageName: string
  file: File | null
  errorMessage?: string
}

type Styles = {
  style: React.CSSProperties | undefined
}

interface UploadProps extends Styles {
  setFile: React.Dispatch<React.SetStateAction<ImageType>>
  setOnDrag: (drag: boolean) => void
}

const UploadFile = (props: UploadProps) => {
  const { setOnDrag, setFile, style } = props

  const getFilePath = React.useCallback(
    (imageFile: FileList | null) => {
      if (!imageFile) return
      const errorMessage: string[] = []
      const isImage = ACCEPTED_IMAGE_TYPES.includes(imageFile[0].type)
      const isLessFile = imageFile[0].size / 1024 < 2000
      const validateFileSize = isImage && isLessFile
      const imageName = validateFileSize ? imageFile[0].name : ''

      if (!isImage) {
        errorMessage.push('File types error')
      }

      if (!isLessFile) {
        errorMessage.push('File requires less than 2mb')
      }

      setFile(
        (prev) =>
          (prev = {
            ...prev,
            imageName: errorMessage.length > 0 ? '' : imageName,
            file: errorMessage.length > 0 ? null : imageFile[0],
            errorMessage:
              errorMessage.length > 0 ? errorMessage.join(',') : undefined,
          })
      )
    },
    [setFile]
  )

  const handleUpload = async (e: Event<HTMLInputElement>) => {
    const imageFile = (e.target as HTMLInputElement).files
    getFilePath(imageFile)
  }

  const handleDragEnter = (e: React.DragEvent<HTMLInputElement>) => {
    e.stopPropagation()
    e.preventDefault()
    setOnDrag(true)
  }

  const handleDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const handleDrageLeave = (e: React.DragEvent<HTMLInputElement>) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.stopPropagation()
    e.preventDefault()

    const dt = e.dataTransfer
    if (dt) {
      const imageFile = dt.files
      setOnDrag(false)
      getFilePath(imageFile)
    }
  }

  return (
    <input
      style={style}
      type="file"
      autoFocus={true}
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
