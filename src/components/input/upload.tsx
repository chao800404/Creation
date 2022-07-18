import React from 'react'
import { Input, BoxProps } from '@chakra-ui/react'
import useStore from '../../store/store'

interface Event<T> {
  target: T
}

interface UploadProps extends BoxProps {
  setFile: React.Dispatch<React.SetStateAction<string | null>>
}

const UploadFile = (props: UploadProps) => {
  const { setFile } = props

  const handleUpload = (e: Event<HTMLInputElement>) => {
    const imageFile = (e.target as HTMLInputElement).files

    if (imageFile) {
      const filePath = URL.createObjectURL(imageFile[0])
      setFile((prev) => (prev = filePath))
    }
  }

  return (
    <Input {...props} type="file" accept="image/*" onChange={handleUpload} />
  )
}

export default UploadFile
