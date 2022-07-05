import React from 'react'
import { signIn, signOut } from 'next-auth/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const BasicButton = () => {
  return (
    <Link href="login">
      <Button
        as={motion.div}
        bg="gray.800"
        borderRadius="none"
        loadingText=""
        color="white"
        variant="solid"
        size="base"
        whileTap={{ scale: 0.98 }}
        _hover={{ bg: 'gray.900' }}
      >
        立即開始
      </Button>
    </Link>
  )
}

export default BasicButton
