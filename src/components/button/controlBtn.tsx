import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'

interface ControlBtnProps extends BoxProps {
  text: string
}

const ControlBtn: React.FC<ControlBtnProps> = (props) => {
  const { text, ...otherProps } = props
  return (
    <Box
      as={motion.button}
      whileTap={{ y: '.1rem' }}
      initial={{ y: 0 }}
      p=".2rem .5rem"
      {...otherProps}
    >
      {text}
    </Box>
  )
}

export default ControlBtn
