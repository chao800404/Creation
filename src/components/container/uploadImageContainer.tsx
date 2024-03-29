import React, { useState, useCallback } from 'react'
import UploadFile from '../input/upload'
import { UploadImageContainerWrapper } from './container.styles'
import { ImageType } from '../input/upload'
import { motion } from 'framer-motion'
import UploadImageFeature from '../features/uploadImageFeature'
import { usePageSWR } from '../../hook/usePageSWR'
import { useRouter } from 'next/router'

const variants = {
  show: {
    backgroundColor: '#BAD6F8',
    opacity: 0.3,
    border: '1px solid #59A5FF',
    zIndex: 300,
  },
  hidden: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    border: 'dashed #dedede',
    zIndex: -1,
  },
}

const UploadImageContainer = ({
  setToggleShow,
  handleUpload,
  typesetting = 'column',
}: {
  setToggleShow?: (toggle: boolean) => void
  handleUpload: (file: ImageType) => void
  typesetting: 'column' | 'row'
}) => {
  const [file, setFile] = React.useState<ImageType>({
    imageName: '',
    file: null,
    errorMessage: undefined,
  })
  const [onDrag, setOnDrag] = useState(false)

  // const { mutateFunction } = usePageSWR(id)

  // const handleUpload = () => {
  //   if (file.file && file.errorMessage === undefined) {
  //     !!setToggleShow && setToggleShow(false)
  //     mutateFunction.uploadCoverImageFile(file.file as File)
  //   }
  // }

  const handleOnUpload = () => handleUpload(file)

  const setDragWrapper = useCallback((drag: boolean) => {
    setOnDrag(drag)
  }, [])

  return (
    <UploadImageContainerWrapper>
      <div className="uploadImage-content-box">
        <motion.div
          className="uploadImage-content-box-cover"
          variants={variants}
          animate={onDrag ? 'show' : 'hidden'}
        />
        <UploadImageFeature file={file} typesetting={typesetting} />
        <UploadFile
          style={{
            top: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            position: 'absolute',
            zIndex: 500,
          }}
          setFile={setFile}
          setOnDrag={setDragWrapper}
        />
      </div>
      <div
        className="uploadImage-content-desc"
        style={{ color: file.errorMessage ? 'red' : '' }}
      >
        {file.errorMessage
          ? file.errorMessage
          : file?.imageName.length > 0
          ? file?.imageName
          : 'The maximum size file is 2MB'}
      </div>
      <motion.button
        data-type="upload-cover-image"
        className="uploadImage-content-btn"
        onClick={handleOnUpload}
        whileTap={{
          scale: 0.98,
          y: 1,
        }}
      >
        Upload file
      </motion.button>
    </UploadImageContainerWrapper>
  )
}

export default UploadImageContainer
