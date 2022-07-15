import React, { useState, useRef, useEffect } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { SIDE_OPTION } from '../../utils/config'
import IconContainer from '../iconContainer/iconContainer'
import Accordion from '../accordion/accordion'
import { WorkspaceItemProp } from '../../types/base'
import useStore from '../../store/store'
import shallow from 'zustand/shallow'
import WorkspaceItemPopup from '../popup/workspaceItemPopup'

const baseIcon = SIDE_OPTION.workspaceItem.icon

const WorkspaceItemLogo = () => (
  <Flex>
    <Box cursor="grab">
      <IconContainer size="1.2rem" icon={baseIcon[2]} />
    </Box>
    <Box>
      <IconContainer size="1.2rem" icon={baseIcon[1]} />
    </Box>
  </Flex>
)

const WorkspaceItem: React.FC<WorkspaceItemProp> = ({
  icon = baseIcon[0],
  text,
  id,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const { activeId, setActiveId } = useStore(
    (state) => ({
      activeId: state.status.activeItem,
      setActiveId: state.updateActiveItem,
    }),
    shallow
  )
  const { rightClickId, setRightClickId } = useStore(
    (state) => ({
      rightClickId: state.rightClickId,
      setRightClickId: state.setRightClickId,
    }),
    shallow
  )

  const elemRef = useRef<HTMLDivElement>(null)

  const handleClick = (e: React.MouseEvent) => {
    const elem = (e.target as HTMLElement).closest(
      '[data-type = "workspace-item"]'
    ) as HTMLElement
    if (e.buttons === 1) setActiveId(elem.id)
    if (e.buttons === 2) setRightClickId(elem.id)
  }

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        onMouseEnter={() => setIsHovered((hover) => !hover)}
        onMouseLeave={() => setIsHovered((hover) => !hover)}
        id={id}
        cursor="pointer"
        color={
          elemRef?.current?.id === activeId || isHovered
            ? 'brand.priamry-black'
            : 'brand.secondary-700'
        }
        onPointerDown={handleClick}
        data-type="workspace-item"
        pos="relative"
        ref={elemRef}
        bg={
          elemRef?.current?.id === activeId
            ? 'brand.secondary-600'
            : 'brand.secondary-300'
        }
        onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
      >
        <Accordion text={text}>
          <IconContainer size="1.2rem" icon={icon} />
        </Accordion>

        {isHovered && <WorkspaceItemLogo />}
        {elemRef?.current?.id === rightClickId && (
          <WorkspaceItemPopup id={elemRef?.current?.id} />
        )}
      </Flex>
    </>
  )
}

export default React.memo(WorkspaceItem)
