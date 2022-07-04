import Button from '@mui/material/Button'
import React from 'react'
import { signIn, signOut } from 'next-auth/react'
import CircularProgress from '@mui/material/CircularProgress'

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
    <Button
      size="medium"
      variant="contained"
      onClick={() => (isSignIn ? signOut() : signIn(authProvider))}
      sx={{
        width: 200,
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      {isLoading ? (
        <span>{text}</span>
      ) : (
        <CircularProgress sx={{ display: 'flex', color: 'inherit' }} />
      )}
    </Button>
  )
}

export default BasicButton
