import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import IconContainer from '../iconContainer/iconContainer'
import { SIDE_OPTION } from '../../utils/config'
import useStore from '../../store/store'
import { WorkspaceItem } from '../../types/workspace'
import shallow from 'zustand/shallow'

const WorkspaceControl = () => {
  const addItem = useStore((state) => state.addToList, shallow)

  const handleAddWorkspaceItem = () => {
    addItem('Nextjs')
  }

  return (
    <Flex gap="2">
      <Box cursor="pointer" onClick={handleAddWorkspaceItem}>
        <IconContainer icon={SIDE_OPTION.workspaces.icon[0]} />
      </Box>
      <Box cursor="pointer">
        <IconContainer icon={SIDE_OPTION.workspaces.icon[1]} />
      </Box>
      <Box cursor="pointer">
        <IconContainer icon={SIDE_OPTION.workspaces.icon[2]} />
      </Box>
    </Flex>
  )
}

export default React.memo(WorkspaceControl)
