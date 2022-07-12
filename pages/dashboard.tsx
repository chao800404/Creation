import React from 'react'
import { Button } from '@chakra-ui/react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { Flex, Box } from '@chakra-ui/react'
import { Side, SearchBarBtn, DashBoardContainer } from '../components/index'

const Dashboard = ({}) => {
  const handleSignOut = async () => await signOut()

  return (
    <Flex w="full" h="100vh" flex="1 1 0%">
      <Side>
        <SearchBarBtn text="Qucik Find In a Base" />
      </Side>
      <DashBoardContainer></DashBoardContainer>
    </Flex>
  )
}

export default Dashboard
