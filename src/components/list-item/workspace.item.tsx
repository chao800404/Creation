import React, { useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { SIDE_OPTION } from '../../utils/config'
import IconContainer from '../iconContainer/iconContainer'
import Accordion from '../accordion/accordion'
import { WorkspaceItemProp } from '../../types/base'

import { Reorder, useDragControls } from 'framer-motion'
const baseIcon = SIDE_OPTION.workspaceItem.icon

const WorkspaceItem: React.FC<WorkspaceItemProp> = ({
  icon = baseIcon[0],
  text,
  id,
  order,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const controls = useDragControls()

  return (
    <Reorder.Item value={order} dragListener={false} dragControls={controls}>
      <Flex
        align="center"
        justify="space-between"
        onMouseEnter={() => setIsHovered((hover) => !hover)}
        onMouseLeave={() => setIsHovered((hover) => !hover)}
        id={id}
        cursor="pointer"
        color={isHovered ? 'brand.secondary-900' : 'brand.secondary-700'}
      >
        <Accordion text={text}>
          <IconContainer size="1.2rem" icon={icon} />
        </Accordion>

        {isHovered && (
          <Flex>
            <Box
              cursor="grab"
              className="reorder-handle"
              onPointerDown={(e: React.MouseEvent) => controls.start(e)}
            >
              <IconContainer size="1.2rem" icon={baseIcon[2]} />
            </Box>
            <Box>
              <IconContainer size="1.2rem" icon={baseIcon[1]} />
            </Box>
          </Flex>
        )}
      </Flex>
    </Reorder.Item>
  )
}

export default React.memo(WorkspaceItem)
