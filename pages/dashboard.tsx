import React from 'react'
import { SIDE_OPTION } from '../src/utils/config'

import { signOut } from 'next-auth/react'
import { Flex, Text, Box } from '@chakra-ui/react'
import {
  Side,
  SearchBarBtn,
  DashBoardContainer,
  Accordion,
  IconContainer,
  FeaturesBtn,
  SidebarContainer,
  SearchPopup,
} from '../src/components/index'

const Dashboard = ({}) => {
  const handleSignOut = async () => await signOut()
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
    <Flex w="full" h="100vh" flex="1 1 0%">
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
            <Flex gap="2">
              {workspaces.icon.map((icon, index) => (
                <IconContainer key={index} icon={icon} />
              ))}
            </Flex>
          </Flex>
        </Box>
        <SidebarContainer>
          <Accordion text="離散數學" />
          <Accordion text="FrontEnd" />
          <Accordion text="線性代數" />
          <Accordion text="演算法" />
          <Accordion text="演算法" />
          <Accordion text="演算法" />
          <Accordion text="演算法" />
          <Accordion text="演算法" />
          <Accordion text="演算法" />
          <Accordion text="演算法" />
          <Accordion text="演算法" />
          <Accordion text="演算法" />
          <Accordion text="演算法" />
          <Accordion text="演算法" />
          <Accordion text="演算法" />
          <Accordion text="演算法" />
          <Accordion text="演算法" />
          <Accordion text="演算法" />
          <Accordion text="演算法" />
          <Accordion text="演算法" />
          <Accordion text="演算法" />
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
      <DashBoardContainer></DashBoardContainer>
    </Flex>
  )
}

export default Dashboard
