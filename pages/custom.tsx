import React, { useEffect, useState } from 'react'
import { Navbar, Banner, LoginPopup, Features } from '../components/index'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import encodeUser from '../utils/encodeUser'
import { NextApiResponse, NextApiRequest } from 'next'
import { useRouter, RouterEvent } from 'next/router'

const Custom = ({ user }) => {
  const handleSignOut = async () => await signOut()

  return (
    <div>
      <Button onClick={handleSignOut} colorScheme="blue">
        Sign Out
      </Button>
      <Link href="/coffee">coffee</Link>
      <div>{user?.name}</div>
    </div>
  )
}

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const user = await encodeUser(req)

  if (!user) {
    return {
      redirect: {
        destination: '/',
        statusCode: 307,
      },
    }
  }

  return {
    props: {
      user,
    },
  }
}

export default Custom
