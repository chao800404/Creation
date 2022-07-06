import React from 'react'

import { Container } from '@chakra-ui/react'
import { Grid, GridItem, Text, Flex, Box, Center } from '@chakra-ui/react'
import Image from 'next/image'
import Button from '../button/button'

const banner = () => {
  return (
    <Box
      h="100vh"
      backgroundPosition="center"
      backgroundImage="url('static/png/banner-bg.png')"
    >
      <Container h="100%" maxW="container.xl">
        <Grid h="inherit" templateColumns="repeat(2, 1fr)" gap={0}>
          <GridItem gridRow="1 / sapn 1" display="flex" alignItems="center">
            <Box
              w="100%"
              pos="relative"
              h="40rem"
              _before={{
                content: `""`,
                position: 'absolute',
                width: '130%',
                height: '.6rem',
                bgGradient:
                  'linear(to-r, transparent 10%, gray.500 35%, transparent 100%)',
                bottom: `.3rem`,
                borderRadius: `50%`,
                opacity: `.5`,
                filter: `blur(.2rem)`,
              }}
            >
              <Image
                layout="fill"
                src="/static/webp/banner-container.webp"
                alt="banner-image"
                objectFit="contain"
                priority
              />
            </Box>
          </GridItem>
          <GridItem gridRow="1 / sapn 1">
            <Flex justify="center" h="100%" direction="column" align="center">
              <Box w="70%">
                <Text fontSize="7xl" lineHeight={12} fontWeight="black">
                  Creation <br /> My Stories.
                </Text>
                <Text fontSize="md" fontWeight="bold" mt={8}>
                  提供數位筆記功能，整合了線上筆記、文件管理、專案管理、知識資料庫等，一體集成，實現從工作到生活。
                </Text>
                <Box mt={8} color="white">
                  <Button size="md" bg="gray.500" text="立即登入" />
                  <Button size="md" ml={2} text="windows" url="/" />
                </Box>
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}

export default banner
