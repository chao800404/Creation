import React from 'react'
import { Container, Box, Flex } from '@chakra-ui/react'
import DashboardBanner from '../banner/dashboardBanner'
import { scrollBar } from '../../utils/style'
import Image from 'next/image'
import ChangeCoverControl from '../control/changeCoverControl'
import { AnimatePresence, motion } from 'framer-motion'
import useStore from '../../store/store'
import shallow from 'zustand/shallow'
import InitialContainer from '../container/initialContainer'
import HeaderInput from '../input/headerInput'
import ChangePopup from '../popup/chagePopup'
import { EMOJI_ICON } from '../../utils/emoji'
import EmojiLayout from '../container/emojiLayout'

const DashboardMain = () => {
  const [text, setText] = React.useState('')
  const imageCoverSrc = useStore(
    (state) => state.activeItem?.coverImageSrc,
    shallow
  )
  const [toggleIcon, setToggleIcon] = React.useState(false)
  const popupIconElem = React.useRef(null)

  const { hovered, setHovered } = useStore(
    (state) => ({
      hovered: state.toggleHoverdCover,
      setHovered: state.setToggleHoverdCover,
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

  const uploadEmojiWrapper = (path: string) => {
    uploadEmoji(path)
    setToggleIcon(false)
  }

  const toggle = useStore((state) => state.toggleChangeCoverPopup, shallow)

  const handlePointerEvent = () => {
    if (!toggle) {
      setHovered()
    }
  }

  const handleOnClickEmoji = (e: React.MouseEvent) => {
    const target = (e.target as HTMLDivElement).closest(
      '.emoji'
    ) as HTMLDivElement
    const emoji = target.dataset.emoji
    if (emoji) {
      uploadEmoji(emoji)
      setToggleIcon(false)
    }
  }

  React.useEffect(() => {
    const handlePopup = (e: MouseEvent) => {
      const target = (e.target as HTMLDivElement).closest('.icon_container')
      if (target) {
        return setToggleIcon(true)
      }
      setToggleIcon(false)
    }

    window.addEventListener('click', handlePopup, false)
    return () => window.removeEventListener('click', handlePopup, false)
  }, [])

  return (
    <Box
      bg="brand.secondary-100"
      h="100vh"
      w="full"
      overflow="auto"
      css={scrollBar(true)}
    >
      <Box h="3rem" />
      {imageCoverSrc ? (
        <DashboardBanner imageCoverSrc={imageCoverSrc} />
      ) : (
        <Box h="10rem" />
      )}

      <Container h="100%" maxW="5xl">
        <Flex direction="column">
          <Flex justify="space-between">
            <Box
              w="5rem"
              h="5rem"
              pos="relative"
              transform="translateY(-2.8rem)"
              zIndex="300"
              cursor="pointer"
              ref={popupIconElem}
              className="icon_container"
            >
              {/* {emoji?.length > 0 && ( */}
              <>
                {emoji && emoji.toString().startsWith('blob') ? (
                  <Image
                    src={emoji}
                    layout="fill"
                    alt="icon"
                    objectFit="cover"
                  />
                ) : (
                  <Box fontSize="4rem">{emoji}</Box>
                )}
                {toggleIcon && (
                  <Box>
                    <ChangePopup
                      pos="absolute"
                      right="-21rem"
                      top="2rem"
                      zIndex="300"
                      bg="white"
                      imageTab="圖示"
                      onClick={handleOnClickEmoji}
                      uploadImage={uploadEmojiWrapper}
                    >
                      <EmojiLayout emojis={EMOJI_ICON} />
                    </ChangePopup>
                  </Box>
                )}
              </>
              {/* )} */}
            </Box>

            <Box pos="relative" w="full">
              <AnimatePresence>
                {hovered && (
                  <ChangeCoverControl
                    pos="absolute"
                    bottom="1rem"
                    right="1rem"
                    bg="white"
                    fontSize="sm"
                    zIndex="300"
                    cursor="pointer"
                    w="fit-content"
                    data-type="change-cover-popup"
                    transform="translateY(-5rem)"
                    onPointerEnter={handlePointerEvent}
                    onPointerLeave={handlePointerEvent}
                  />
                )}
              </AnimatePresence>
            </Box>
          </Flex>
          <HeaderInput />
          {!text && <InitialContainer />}
        </Flex>
      </Container>
    </Box>
  )
}

export default React.memo(DashboardMain)
