import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import Edit from '../edit/eaditTable'
import { AnimatePresence, motion } from 'framer-motion'
import ControlBtn from '../button/controlBtn'
import { randomPath } from '../../utils/randomPath'
import { SiCoveralls } from 'react-icons/si'
import { BsImage } from 'react-icons/bs'
import useStore from '../../store/store'
import shallow from 'zustand/shallow'
import { EMOJI_ICON } from '../../utils/emoji'

const random = (imagePaths: string[]) => {
  const length = imagePaths.length
  const randomNumb = randomPath(length)
  const randomImage = imagePaths[randomNumb]
  return randomImage
}

const HeaderInput = () => {
  const [hovered, setHovered] = React.useState(false)
  const [text, setText] = React.useState('')
  const coverImageMap = useStore((state) => state.coverImageMap, shallow)
  const { setCoverImage, coverImageSrc } = useStore(
    (state) => ({
      setCoverImage: state.setCoverImageSrc,
      coverImageSrc: state.activeItem?.coverImageSrc,
    }),
    shallow
  )
  const { emoji, uploadEmoji } = useStore(
    (state) => ({
      uploadEmoji: state.setEmoji,
      emoji: state.activeItem?.emoji,
    }),
    shallow
  )
  const setTile = useStore((state) => state.updateListTitle)

  const handleOnClick = () => {
    const imagePaths = Object.values(coverImageMap).flatMap((path) => path)
    const randomPath = random(imagePaths)
    setCoverImage(randomPath)
  }

  const handleOnAddEmoji = () => {
    const imagePaths = Object.values(EMOJI_ICON)
    const randomPath = random(imagePaths)
    uploadEmoji(randomPath)
  }

  React.useEffect(() => {
    setTile(text)
  }, [text, setTile])

  return (
    <Box
      onPointerEnter={() => setHovered((hover) => !hover)}
      onPointerLeave={() => setHovered((hover) => !hover)}
      pos="relative"
    >
      <AnimatePresence>
        {hovered && (
          <Flex
            fontSize=".9rem"
            bg="white"
            pos="absolute"
            top="-2rem"
            borderRadius="sm"
            overflow="hidden"
            boxShadow="sm"
            color="brand.secondary-700"
            h="1.8rem"
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {!(emoji?.length > 0) && (
              <ControlBtn
                text="????????????"
                icon={SiCoveralls}
                borderRight="1px solid"
                borderColor="brand.secondary-400"
                onClick={handleOnAddEmoji}
              />
            )}

            {!coverImageSrc && (
              <ControlBtn
                icon={BsImage}
                text="????????????"
                onClick={handleOnClick}
              />
            )}
          </Flex>
        )}
      </AnimatePresence>

      <Edit
        fontSize="2.8rem"
        placeholder="Untitled"
        // isPreviewFocusable={false}
        fontWeight="bold"
        onChange={setText}
        text={text}
      />
    </Box>
  )
}

export default HeaderInput
