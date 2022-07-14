import React, { ReactNode } from 'react'
import DashBoardNav from '../navbar/dashBoardNav'
import { Flex, Box } from '@chakra-ui/react'
import styled from 'styled-components'
import shallow from 'zustand/shallow'
import useStore from '../../store/store'

const DashBoardContainr = ({ children }: { children: ReactNode }) => {
  const sideLineX = useStore((state) => state.sideLineX, shallow)

  return (
    <Box flexGrow="0" flexShrink="1" w={`calc(100% - ${sideLineX}px)`}>
      <DashBoardNav />
      {children}
    </Box>
  )
}

export default DashBoardContainr
