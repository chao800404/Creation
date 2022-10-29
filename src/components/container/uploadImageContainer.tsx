import React, { useState, useCallback } from 'react'
import UploadFile from '../input/upload'
import { UploadImageContainerWrapper } from './container.styles'
import { Cover } from '@prisma/client'
import { ImageType } from '../input/upload'
import { motion } from 'framer-motion'
import UploadImageFeature from '../features/uploadImageFeature'

import { usePageStore } from '../../store'
import shallow from 'zustand/shallow'
import { uploadFile } from '../../utils/fetch'
import { useSWRConfig } from 'swr'

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
}: {
  setToggleShow: (toggle: boolean) => void
}) => {
  const [file, setFile] = React.useState<ImageType>({
    imageFilePath: null,
    imageName: '',
    file: null,
    errorMessage: undefined,
  })
  const [onDrag, setOnDrag] = useState(false)

  const { id, imageSet } = usePageStore(
    (state) => ({ id: state.id, imageSet: state.imageSet }),
    shallow
  )

  const { mutate } = useSWRConfig()

  const handleUpload = () => {
    if (file.file && file.errorMessage === undefined && file.imageFilePath) {
      setToggleShow(false)
      imageSet(file.imageFilePath)

      mutate(
        `/api/page/${id}`,
        uploadFile('uploadImage', { id, file: file.file }),
        {
          populateCache: (uploadImage, page) => {
            const cloneCache = { ...page }
            cloneCache.data.cover.image = uploadImage.data.image
            imageSet(uploadImage.data.image)
            return cloneCache
          },

          revalidate: false,
        }
      )
    }
  }

  const setDragWrapper = useCallback((drag: boolean) => {
    setOnDrag(drag)
  }, [])

  return (
    <UploadImageContainerWrapper>
      <div className="uploadImage-content">
        <div className="uploadImage-content-box">
          <motion.div
            className="uploadImage-content-box-cover"
            variants={variants}
            animate={onDrag ? 'show' : 'hidden'}
          />
          <UploadImageFeature file={file} />
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
          onClick={handleUpload}
          whileTap={{
            scale: 0.98,
            y: 1,
          }}
        >
          Upload file
        </motion.button>
      </div>
    </UploadImageContainerWrapper>
  )
}

export default React.memo(UploadImageContainer)
