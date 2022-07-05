import React from 'react'
import { signIn, signOut } from 'next-auth/react'
import { Button, ButtonGroup } from '@chakra-ui/react'

type HeaderBtnProps = {
  text: string
  authProvider: 'google' | 'email'
  isSignIn: boolean
  isLoading: boolean
}

const BasicButton = ({
  text,
  authProvider,
  isSignIn,
  isLoading,
}: HeaderBtnProps) => {
  return (
    <Button colorScheme="green" color="brand.300" variant="solid" size="xl">
      Button
    </Button>
  )
}

export default BasicButton
