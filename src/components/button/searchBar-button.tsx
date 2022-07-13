import React from 'react'
import { Button, Kbd, Box } from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'

type SearchBarBtnProps = {
  text: string
}

const KeyBoard = () => (
  <Box display="flex" alignItems="center" as="span">
    <Kbd bg="brand.secondary-400">Ctrl</Kbd> + <Kbd>K</Kbd>
  </Box>
)

const SearchBarBtn: React.FC<SearchBarBtnProps> = ({ text }) => {
  return (
    <Button
      color="brand.secondary-700"
      fontSize="xs"
      fontWeight="400"
      w="full"
      h="2rem"
      bg="brand.secondary-600"
      leftIcon={<BiSearch size="1rem" />}
      rightIcon={<KeyBoard />}
      shadow="sm"
      _hover={{
        bg: 'brand.secondary-600',
        border: 'solid 1px rgba(0,0,0,.2)',
      }}
    >
      {text}
    </Button>
  )
}

export default SearchBarBtn
