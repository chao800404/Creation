import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Box, Flex, Text } from '@chakra-ui/react'

const logo = () => {
  return (
    <Link href="/">
      <a>
        <Flex>
          <Box w="3rem" h="100%" color="red" />
          <Image
            src="/static/svg/logo.svg"
            alt="Creation Logo"
            width={40}
            height={40}
          />
          <Box w="1rem" h="100%" color="red" />
          <Text fontSize="3xl">Creation</Text>
        </Flex>
      </a>
    </Link>
  )
}

export default logo
