import React, { useRef } from 'react'
import { SIDE_OPTION } from '../../utils/config'
import IconContainer from '../iconContainer/iconContainer'
import Accordion from '../accordion/accordion'
import { useLayoutControllerStore } from '../../store'
import shallow from 'zustand/shallow'

import { WorkspaceItemWrapper } from './item.styles'
import { motion } from 'framer-motion'

import Link from 'next/link'
import { Emoji } from '@prisma/client'

const baseIcon = SIDE_OPTION.workspaceItem.icon

type WorkspaceItemType = {
  title: string
  id: string
  icon: Emoji
  isActive: boolean
}

const WorkspaceItem: React.FC<WorkspaceItemType> = ({
  icon,
  title,
  id,
  isActive,
}) => {
  const sideWidth = useLayoutControllerStore(
    (state) => state.sideWidth,
    shallow
  )

  if (title === undefined || title === null || title.length <= 0)
    title = '未命名檔案'

  return (
    <WorkspaceItemWrapper
      data-type="workspace-item-container"
      className="workspace-item"
      id={id}
      color={isActive ? '#ffffff' : '#888888'}
      hoverColor={isActive ? '#ffffff' : '#1c1c1c'}
      backgroundColor={isActive ? '#1c1c1c' : '#ffffff'}
    >
      <Link href={`/${id}`}>
        <motion.a className="workspaceItem_content">
          <Accordion id={icon?.id} text={title} sideWidth={sideWidth || 0}>
            {icon && icon?.image?.length > 0 ? (
              <div style={{ padding: '0.2rem', fontSize: '.9rem' }}>
                {icon?.image}
              </div>
            ) : (
              <IconContainer size="1.2rem" icon={baseIcon[0]} />
            )}
          </Accordion>
          <div className="WorkspaceItem_feature">
            <div className="WorkspaceItem_feature-grab">
              <IconContainer size="1.2rem" icon={baseIcon[2]} />
            </div>
            <div>
              <IconContainer size="1.2rem" icon={baseIcon[1]} />
            </div>
          </div>
        </motion.a>
      </Link>
    </WorkspaceItemWrapper>
  )
}

export default React.memo(WorkspaceItem)
