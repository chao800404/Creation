import React from 'react'

import { Box, Flex, BoxProps, TabPanel, TabPanels } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import ChangePopup from '../popup/chagePopup'
import useStore from '../../store/store'
import shallow from 'zustand/shallow'
import ChangeCoverPopupGrid from '../layout/changeCoverPopupGrid'
import ChangeCoverPopupLayout from '../container/changeCoverPopupLayout'

const ChangeCoverControl = (props: BoxProps) => {
  const { togglePopup, toggle } = useStore(
    (state) => ({
      togglePopup: state.setToggleChangeCoverPopup,
      toggle: state.toggleChangeCoverPopup,
    }),
    shallow
  )
  const { controlCover, setControlCover } = useStore(
    (state) => ({
      controlCover: state.controlCoverStart.reposition,
      setControlCover: state.setControlCoverReposition,
    }),
    shallow
  )

  const coverImageMap = useStore((state) => state.coverImageMap, shallow)
  const setCoverImage = useStore((state) => state.setCoverImageSrc, shallow)

  const handleChangeCover: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const target = (e.target as HTMLElement).closest(
      '.cover_image'
    ) as HTMLElement
    if (target) {
      const src = target.dataset.src
      setCoverImage(src as string)
    }
  }

  return (
    <Flex
      {...props}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      as={motion.div}
      borderRadius="sm"
    >
      <Box p=".2rem 1rem" onClick={() => togglePopup(true)}>
        替換封面
      </Box>
      <Box w="1px" bg="brand.secondary-600" />
      <Box onClick={() => setControlCover(!controlCover)} p=".2rem 1rem">
        {controlCover ? '儲存設定' : '移動封面'}
      </Box>
      {toggle && (
        <ChangePopup
          pos="absolute"
          left="-100%"
          bg="white"
          zIndex="500"
          top="1rem"
          imageTab="畫廊"
          onClick={handleChangeCover}
          uploadImage={setCoverImage}
        >
          <ChangeCoverPopupLayout coverImageMap={coverImageMap} />
        </ChangePopup>
      )}
    </Flex>
  )
}

export default ChangeCoverControl
