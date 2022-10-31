import React from 'react'
import { BsImages } from 'react-icons/bs'
import { UploadImageFeatureWrapper } from './feature.styles'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ImageType } from '../input/upload'

const UploadImageFeature = ({ file }: { file: ImageType }) => {
  return (
    <UploadImageFeatureWrapper>
      {file?.file ? (
        <div className="uploadImageFeature-content">
          <Image
            src={URL.createObjectURL(file.file)}
            layout="fill"
            objectFit="cover"
            alt="image"
          />
        </div>
      ) : (
        <div>
          <motion.div
            animate={{
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <BsImages
              style={{ margin: 'auto' }}
              color="inherit"
              fontSize="4rem"
            />
          </motion.div>
          <p className="uploadImageFeature-desc-1">
            <span>click or drag image</span>
            <span>jpg、gif、png、webp</span>
          </p>
        </div>
      )}
    </UploadImageFeatureWrapper>
  )
}

export default UploadImageFeature
