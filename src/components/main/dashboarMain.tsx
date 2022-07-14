import React from 'react'
import { Container, Box } from '@chakra-ui/react'

const DashboardMain = () => {
  return (
    <Box bg="brand.secondary-100" h="full">
      <Container h="200vh" maxW="8xl">
        <Box h="3rem" />
      </Container>
    </Box>
  )
}

export default React.memo(DashboardMain)
