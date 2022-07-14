import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { SIDE_OPTION } from '../../utils/config'
import IconContainer from '../iconContainer/iconContainer'
import Accordion from '../accordion/accordion'
import { WorkspaceItemProp } from '../../types/base'
import useStore from '../../store/store'

const baseIcon = SIDE_OPTION.workspaceItem.icon

const WorkspaceItem: React.FC<WorkspaceItemProp> = ({
  icon = baseIcon[0],
  text,
  id,
}) => {
  const setHover = useStore((state) => state.setWorksapceItemHover)

  return (
    <Flex
      align="center"
      justify="space-between"
      onMouseEnter={setHover}
      onMouseLeave={setHover}
    >
      <Accordion text={text}>
        <IconContainer size="1.2rem" icon={icon} />
      </Accordion>
      <Flex>
        <Box>
          <IconContainer size="1.2rem" icon={baseIcon[2]} />
        </Box>
        <Box>
          <IconContainer size="1.2rem" icon={baseIcon[1]} />
        </Box>
      </Flex>
    </Flex>
  )
}

export default React.memo(WorkspaceItem)
