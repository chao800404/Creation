import React from 'react'

import { motion } from 'framer-motion'
import { chakra, shouldForwardProp } from '@chakra-ui/react'

const MotionWrapper = chakra(motion.div, {
  shouldForwardProp: (prop) => {
    return shouldForwardProp(prop) || prop === 'transition'
  },
})

export default MotionWrapper
