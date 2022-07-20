import React from 'react'
import { Container, Box, Flex, Heading } from '@chakra-ui/react'
import DashboardBanner from '../banner/dashboardBanner'
import { scrollBar } from '../../utils/style'
import Image from 'next/image'
import Edit from '../edit/eaditTable'
import ChangeCoverControl from '../control/changeCoverControl'
import { AnimatePresence } from 'framer-motion'
import useStore from '../../store/store'
import shallow from 'zustand/shallow'
import InitialContainer from '../container/initialContainer'
import HeaderInput from '../input/headerInput'

const DashboardMain = () => {
  const [text, setText] = React.useState('')
  const [start, setStart] = React.useState(false)

  // const imageCoverSrc = useStore((state) => state.coverImageSrc, shallow)

  const imageCoverSrc = useStore((state) => state.coverImageSrc, shallow)

  const { hovered, setHovered } = useStore(
    (state) => ({
      hovered: state.toggleHoverdCover,
      setHovered: state.setToggleHoverdCover,
    }),
    shallow
  )

  const toggle = useStore((state) => state.toggleChangeCoverPopup, shallow)

  const handlePointerEvent = () => {
    if (!toggle) {
      setHovered()
    }
  }

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
            >
              <Image src="/static/icon/1f3aa.svg" layout="fill" alt="icon" />
            </Box>
            <Box pos="relative" w="15rem">
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
