import React from 'react'
import { Box, BoxProps, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { IconType } from 'react-icons'
import IconContainer from '../iconContainer/iconContainer'

interface ControlBtnProps extends BoxProps {
  text: string
  icon?: IconType
}

const ControlBtn: React.FC<ControlBtnProps> = (props) => {
  const { text, icon, ...otherProps } = props
  return (
    <Flex
      as={motion.button}
      whileTap={{ y: '.1rem' }}
      initial={{ y: 0 }}
      p=".2rem .5rem"
      gap="2"
      {...otherProps}
    >
      {icon && <IconContainer size="1rem" icon={icon} type="base" />}

      {text}
    </Flex>
  )
}

export default ControlBtn
