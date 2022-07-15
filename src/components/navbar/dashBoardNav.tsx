import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import shallow from 'zustand/shallow'
import useStore from '../../store/store'
import { imageFormatFilter } from '../../utils/filterFile'
import Image from 'next/image'
import { truncatedText } from '../../utils/truncatedText'
import UserPopup from '../popup/userPopup'

const DashBoardNav = () => {
  const { name, email, image } = useStore((state) => state.user, shallow)

  return (
    <Flex
      w="inherit"
      h="3rem"
      display="flex"
      alignItems="center"
      bg="white"
      p="0 2rem"
      justify="space-between"
      pos="fixed"
      top="0"
      right="0"
    >
      <Box />

      {name && <UserPopup name={name} email={email} image={image} />}
    </Flex>
  )
}

export default React.memo(DashBoardNav)
