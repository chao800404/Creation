import React, { memo, useState } from 'react'
import { signIn, signOut } from 'next-auth/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { buttonProps } from '../../types/button'
import useStore from '../../store/store'
import { FcGoogle } from 'react-icons/fc'
import { UserSlice } from '../../types/user'
import shallow from 'zustand/shallow'

const BasicButton = ({
  url,
  text,
  size,
  ml,
  bg = 'gray.800',
  type = 'basic',
  validity,
}: buttonProps) => {
  const router = useRouter()
  const toggle = useStore((state) => state.toggle, shallow)
  const setShowError = useStore((state) => state.setShowError)
  const { username, email } = useStore((state) => state.user, shallow)

  const handleClick = () => {
    if (url) return router.push(`${url}`)
    if (type === 'google') return signIn('google')
    if (type === 'email') {
      if (!validity) {
        return setShowError(!validity)
      }
      return signIn('email', {
        username,
        email,
      })
    }
    return toggle()
  }

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
