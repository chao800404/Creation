import React from 'react'
import { Center, Flex, Text, Input, Button } from '@chakra-ui/react'
import { BsImages } from 'react-icons/bs'
import BasicButton from '../button/button'
import Image from 'next/image'
import UploadFile from '../input/upload'

import MotionContainer from '../container/motionContainer'

const ChangeCoverUpload = ({
  index,
  tabIndex,
}: {
  index: number
  tabIndex: number
}) => {
  const [file, setFile] = React.useState<string | null>(null)
  const [hovered, setHovered] = React.useState(false)

  console.log(file)

  return (
    <Center h="full">
      <Flex direction="column" gap="2" h="90%">
        <Center color="brand.secondary-700" pos="relative" w="full" h="full">
          {file ? (
            <Image src={file} layout="fill" objectFit="cover" alt="image" />
          ) : (
            <Flex
              mt="5"
              mb="5"
              direction="column"
              align="center"
              border="dashed"
              borderColor="#E4E4E4"
              p="10"
              onPointerEnter={() => setHovered((prev) => !prev)}
              onPointerLeave={() => setHovered((prev) => !prev)}
            >
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
              <Text mt="3">上傳檔案不能超過5mb</Text>
              <Text fontSize=".3rem" color="brand.secondary-300">
                jpg、gif、png、webp
              </Text>
            </Flex>
          )}
          <UploadFile
            top="0"
            w="full"
            h="full"
            opacity="0"
            position="absolute"
            setFile={setFile}
          />
        </Center>

        <Button color="brand.secondary-700" w="15rem" pos="relative" m="2">
          上傳檔案
        </Button>
      </Flex>
    </Center>
  )
}

export default React.memo(ChangeCoverUpload)
