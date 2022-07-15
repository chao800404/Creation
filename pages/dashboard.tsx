/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback, useState } from 'react'
import { SIDE_OPTION } from '../src/utils/config'
import { useSession } from 'next-auth/react'
import { Reorder } from 'framer-motion'

import { Flex, Text, Box, Spinner, Center } from '@chakra-ui/react'
import {
  Side,
  SearchBarBtn,
  DashBoardContainer,
  Accordion,
  IconContainer,
  FeaturesBtn,
  SidebarContainer,
  WorkspaceItem,
  DashboardMain,
  WorkspaceControl,
} from '../src/components/index'

import useStore from '../src/store/store'
import shallow from 'zustand/shallow'

const Dashboard = ({}) => {
  const { data, status } = useSession()
  const setUser = useStore((state) => state.addUser, shallow)
  const list = useStore((state) => state.list, shallow)

  useEffect(() => {
    if (status === 'authenticated') {
      const { user } = data
      if (user) {
        for (const [key, value] of Object.entries(user)) {
          setUser(key, value as string)
        }
      }
    }
  }, [data, status])

  if (status === 'loading') {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    )
  }

  const {
    searchBarBtn,
    favorite,
    interfaces,
    workspaces,
    importFile,
    trash,
    newPage,
  } = SIDE_OPTION

  return (
    <Flex w="full" minH="100vh" flex="1 1 0%">
      <Side>
        <Box p="0 1rem">
          <SearchBarBtn text={searchBarBtn.text} />
          <Flex direction="column" gap="2" mt="10">
            <Accordion
              color={SIDE_OPTION.base.color.active}
              text={favorite.text}
            />
            <Accordion
              color={SIDE_OPTION.base.color.active}
              text={interfaces.text}
              icon={interfaces.icon}
            />
          </Flex>
          <Flex fontWeight="400" mt="5" align="center" justify="space-between">
            <Text>{workspaces.text}</Text>
            <WorkspaceControl />
          </Flex>
        </Box>
        <SidebarContainer>
          {list &&
            list?.map((item, index) => (
              <WorkspaceItem key={index} text={item?.title} id={item?.id} />
            ))}
        </SidebarContainer>

        <Box p="0 1rem" borderTop="1px" borderColor="brand.secondary-600">
          <Flex h="8rem" direction="column" p=".3rem 0">
            <FeaturesBtn
              flex="1"
              display="flex"
              justifyItems="center"
              icon={importFile.icon}
              text={importFile.text}
            />
            <FeaturesBtn
              flex="1"
              display="flex"
              justifyItems="center"
              icon={trash.icon}
              text={trash.text}
            />
            <FeaturesBtn
              flex="1"
              display="flex"
              justifyItems="center"
              icon={newPage.icon}
              text={newPage.text}
            />
          </Flex>
        </Box>
      </Side>
      <DashBoardContainer>
        <DashboardMain></DashboardMain>
      </DashBoardContainer>
    </Flex>
  )
}

export default Dashboard
