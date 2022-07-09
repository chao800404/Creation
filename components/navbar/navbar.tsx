import * as React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import BasicButton from '../button/button'
import Logo from '../logo/logo'

const Navbar = () => {
  return (
    <Flex
      pos="fixed"
      align="center"
      justifyContent="space-between"
      bg="white"
      shadow="md"
      w="100%"
      zIndex="30"
      as="header"
    >
      <Box ml="10">
        <Logo />
      </Box>

      <BasicButton text="立即開始" size="base" />
    </Flex>
  )
}

export default React.memo(Navbar)
