import React from 'react'
import { Container, Box } from '@chakra-ui/react'
import DashboardBanner from '../banner/dashboardBanner'

const DashboardMain = () => {
  return (
    <Box
      bg="brand.secondary-100"
      h="100vh"
      w="full"
      overflow="auto"
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888888',
          borderRadius: '24px',
        },
      }}
    >
      <Box h="3rem" />
      <DashboardBanner />
      <Container h="100%" maxW="8xl">
        <Box h="200vh">ewjfijwefpowjefjwe</Box>
      </Container>
    </Box>
  )
}

export default React.memo(DashboardMain)
