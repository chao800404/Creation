import React from 'react'
import { Box } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import { Grid, GridItem, Text, Flex } from '@chakra-ui/react'
import Image from 'next/image'

const banner = () => {
  return (
    <Box
      h="100vh"
      backgroundPosition="center"
      backgroundImage="url('static/png/banner-bg.png')"
    >
      <Container h="100%" maxW="container.xl">
        <Grid h="inherit" templateColumns="repeat(2, 1fr)" gap={12}>
          <GridItem gridRow="1 / sapn 1" pos="relative">
            <Image
              layout="fill"
              src="/static/webp/banner-container.webp"
              alt="banner-image"
              objectFit="contain"
            />
          </GridItem>
          <GridItem gridRow="1 / sapn 1">
            <Flex justify="center" h="100%" direction="column">
              <Text fontSize="7xl" lineHeight={12} fontWeight="black">
                Creation <br /> My Stories.
              </Text>
              <Text fontSize="md" fontWeight="bold" marginTop="2rem" w="70%">
                提供數位筆記功能，整合了線上筆記、文件管理、專案管理、知識資料庫等，一體集成，實現從工作到生活。
              </Text>
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}

export default banner
