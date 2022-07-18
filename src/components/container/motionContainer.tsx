import React from 'react'

import { motion, isValidMotionProp } from 'framer-motion'
import { chakra } from '@chakra-ui/react'

const MotionContainer = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
})

export default MotionContainer
