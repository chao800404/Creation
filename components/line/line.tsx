import { Box } from '@chakra-ui/react'

const Line = ({ mr, ml }: { mr?: string; ml?: string }) => {
  return (
    <Box
      w="45%"
      h="5"
      as="span"
      position="relative"
      mr={mr}
      ml={ml}
      _before={{
        content: `""`,
        position: 'absolute',
        width: '100%',
        height: '1px',
        top: '50%',
        backgroundColor: 'gray.400',
      }}
    />
  )
}

export default Line
