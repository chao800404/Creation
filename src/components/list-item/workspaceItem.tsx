import React, { useRef } from 'react'
import { SIDE_OPTION } from '../../utils/config'
import IconContainer from '../iconContainer/iconContainer'
import Accordion from '../accordion/accordion'
import { useLayoutControllerStore, usePageStore } from '../../store'
import shallow from 'zustand/shallow'
import { ListItem } from '../../store/slices'

import { WorkspaceItemWrapper } from './item.styles'
import { motion } from 'framer-motion'

import Link from 'next/link'

const baseIcon = SIDE_OPTION.workspaceItem.icon

type WorkspaceItemType = {
  title: ListItem['title']
  id: ListItem['id']
  icon: ListItem['emoji']
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
    >
      <Link href={`/${id || ''}`}>
        <motion.a
          className="workspaceItem_content"
          style={{
            fontWeight: 'bold',
            background: isActive ? '#1c1c1c' : '#ffffff',
            fontSize: '.9rem',
          }}
        >
          <Accordion id={icon?.id} text={title} sideWidth={sideWidth || 0}>
            {icon?.image.length > 0 ? (
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
