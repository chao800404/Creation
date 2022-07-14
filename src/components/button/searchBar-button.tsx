import React, { useEffect, useState } from 'react'
import { Button, Kbd, Box } from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'
import { useDisclosure } from '@chakra-ui/react'
import SearchPopup from '../search/searchPopup'

type SearchBarBtnProps = {
  text: string
}

const KeyBoard = () => (
  <Box display="flex" alignItems="center" as="span">
    <Kbd bg="brand.secondary-400">Ctrl</Kbd> + <Kbd>K</Kbd>
  </Box>
)

const SearchBarBtn: React.FC<SearchBarBtnProps> = ({ text }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [keydown, setKeydown] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const ctrlKey = e.ctrlKey
      const key = e.key
      if (ctrlKey && key === 'k') {
        e.preventDefault()
        setKeydown((toggle) => !toggle)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    keydown ? onOpen() : onClose()
  }, [keydown, onClose, onOpen])

  return (
    <>
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
        onClick={onOpen}
        _hover={{
          bg: 'brand.secondary-600',
          border: 'solid 1px rgba(0,0,0,.2)',
        }}
      >
        {text}
      </Button>
      <SearchPopup isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default React.memo(SearchBarBtn)
