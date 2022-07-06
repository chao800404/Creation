import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Box, Flex, Text } from '@chakra-ui/react'

type LogoTypes = {
  type?: 'secondType' | 'basicType'
}

const logo = ({ type = 'basicType' }: LogoTypes) => {
  if (type === 'secondType') {
    return (
      <Flex direction="column">
        <Image
          src="/static/svg/logo.svg"
          alt="Creation Logo"
          width={70}
          height={70}
        />
        <Box w="1rem" h="100%" />
        <Text fontSize="3xl">Creation</Text>
      </Flex>
    )
  }

  return (
    <Link href="/">
      <a>
        <Flex>
          <Image
            src="/static/svg/logo.svg"
            alt="Creation Logo"
            width={40}
            height={40}
          />
          <Box w="1rem" h="100%" />
          <Text fontSize="3xl">Creation</Text>
        </Flex>
      </a>
    </Link>
  )
}

export default logo
