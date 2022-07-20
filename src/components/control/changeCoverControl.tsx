import React from 'react'

import { Box, Flex, BoxProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import ChageCoverPopup from '../popup/chageCoverPopup'
import useStore from '../../store/store'
import shallow from 'zustand/shallow'

const ChangeCoverControl = (props: BoxProps) => {
  // const popupElemRef = React.useRef<HTMLDivElement>(null)

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

  // const [controlCover, setControlCover] = React.useState({
  //   reposition: false,
  //   changCover: false,
  // })

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
        <Box>
          <ChageCoverPopup
            pos="absolute"
            left="-100%"
            bg="white"
            zIndex="500"
            top="1rem"
          />
        </Box>
      )}
    </Flex>
  )
}

export default ChangeCoverControl
