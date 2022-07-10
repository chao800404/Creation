import * as React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import Button from '../button/button'
import Logo from '../logo/logo'
import useStore from '../../store/store'
import shallow from 'zustand/shallow'

const Navbar = () => {
  const toggle = useStore((state) => state.toggle, shallow)

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

      <Button handleClick={() => toggle()} text="立即開始" size="base" />
    </Flex>
  )
}

export default React.memo(Navbar)
