import * as React from 'react'

import { HeaderContainer } from './header.styles'
import { useSession } from 'next-auth/react'
import BasicButton from '../button/button'

const Header = () => {
  const { data, status } = useSession()

  return (
    <HeaderContainer>
      <BasicButton
        text={data ? 'Sign Out' : 'Sign In'}
        authProvider="google"
        isSignIn={!!data}
        isLoading={status === 'loading' ? true : false}
      />
    </HeaderContainer>
  )
}

export default Header
