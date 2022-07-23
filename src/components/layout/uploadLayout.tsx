import React from 'react'
import { Center, Flex, Text, Button, Box } from '@chakra-ui/react'
import { BsImages } from 'react-icons/bs'
import Image from 'next/image'
import UploadFile from '../input/upload'

import MotionContainer from '../container/motionContainer'
import { ImageType, UploadLayoutType } from '../../types/base'

const UploadLayout: React.FC<UploadLayoutType> = ({
  onClick,
  file,
  setFile,
}) => {
  const [dragEnter, setDragEnter] = React.useState<boolean>(false)

  return (
    <Center h="full" color="brand.secondary-700">
      <Flex direction="column" gap="2" h="full" w="full">
        <Center pos="relative" w="inherit" h="full">
          <Flex
            mt="5"
            mb="5"
            direction="column"
            align="center"
            border={dragEnter ? '2px solid' : 'dashed'}
            borderColor={dragEnter ? 'rgba(192,225,255,0.5)' : '#E4E4E4'}
            bg={dragEnter ? 'rgba(192,225,255,0.2)' : 'transparent'}
            w="full"
            h="full"
            justify="center"
          >
            {file?.imageFilePath ? (
              <>
                <Box pos="absolute" w="80%" h="50%">
                  <Image
                    src={file.imageFilePath}
                    layout="fill"
                    objectFit="cover"
                    alt="image"
                  />
                </Box>
                <Text pos="absolute" bottom="1.5rem">
                  {file.imageName}
                </Text>
              </>
            ) : (
              <MotionContainer
                animate={{
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: '2',
                  repeat: 'Infinity',
                }}
              >
                <BsImages color="inherit" fontSize="4rem" />
              </MotionContainer>
            )}

            <Text mt="3">點擊或拉取上傳圖片</Text>
            <Text fontSize=".3rem" color="brand.secondary-300">
              jpg、gif、png、webp
            </Text>
          </Flex>

          <UploadFile
            top="0"
            w="full"
            h="full"
            opacity="0"
            position="absolute"
            setFile={setFile}
            setDragEnter={setDragEnter}
          />
        </Center>
        <Text align="center" m="2">
          上傳圖片不能超過5mb
        </Text>
        <Button
          data-type="upload-cover-image"
          color="brand.secondary-700"
          pos="relative"
          w="full"
          onClick={onClick}
        >
          上傳檔案
        </Button>
      </Flex>
    </Center>
  )
}

export default React.memo(UploadLayout)
