import React from 'react'
import { SimpleGrid, Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const EmojiLayout = ({ emojis }: { emojis: Record<string, string> }) => {
  return (
    <SimpleGrid columns={8}>
      {Object.keys(emojis).map((emoji, index) => (
        <Box
          className="emoji"
          key={index}
          data-emoji={emojis[emoji]}
          fontSize="1.5rem"
          as={motion.span}
          cursor="pointer"
          whileHover={{ backgroundColor: '#E4E1E1' }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
        >
          {emojis[emoji]}
        </Box>
      ))}
    </SimpleGrid>
  )
}

export default React.memo(EmojiLayout)
