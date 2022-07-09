import React, { memo } from 'react'

import { Button, ButtonGroup } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { buttonProps } from '../../types/button'

import { FcGoogle } from 'react-icons/fc'

const BasicButton = ({
  url,
  text,
  size,
  ml,
  bg = 'gray.800',
  type = 'basic',
  handleClick,
}: buttonProps) => {
  if (type === 'google') {
    return (
      <Button
        w="full"
        bg="white"
        border="1px"
        borderColor="gray.400"
        leftIcon={<FcGoogle />}
        onClick={handleClick}
      >
        Google
      </Button>
    )
  }

  if (type === 'email') {
    return (
      <Button
        w="full"
        as={motion.button}
        type="button"
        bg={bg}
        borderRadius="none"
        color="white"
        variant="solid"
        size={size}
        whileTap={{ scale: 0.98 }}
        _hover={{ bg: 'gray.900' }}
        ml={ml}
        cursor="pointer"
        onClick={handleClick}
      >
        {text}
      </Button>
    )
  }

  return (
    <Button
      as={motion.a}
      bg={bg}
      borderRadius="none"
      color="white"
      variant="solid"
      size={size}
      whileTap={{ scale: 0.98 }}
      _hover={{ bg: 'gray.900' }}
      ml={ml}
      cursor="pointer"
      onClick={handleClick}
    >
      {text}
    </Button>
  )
}

export default memo(BasicButton)
