import React, { useRef } from 'react'
import WorkspaceItem from '../list-item/workspaceItem'
import WrapperScrollbar from '../scroll/wrapperScrollbar'
import { SideContainerWrapper } from './container.styles'

import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { List, Emoji } from '@prisma/client'

type SideContainerType = {
  list: (List & { emoji: Emoji })[]
  height?: string
  maxH?: string
}

const SideContainer: React.FC<SideContainerType> = ({
  list,
  maxH,
  height = 'full',
}) => {
  const scrollElem = useRef<HTMLDivElement | null>(null)
  const {
    query: { page },
  } = useRouter()

  return (
    <motion.div
      style={{
        position: 'relative',
        zIndex: 300,
        maxHeight: `${maxH}`,
        height: `${height}`,
      }}
      ref={scrollElem}
      onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      <WrapperScrollbar isSide={true}>
        <SideContainerWrapper>
          {list?.map((item) => (
            <WorkspaceItem
              key={item.id}
              title={item.title as string}
              id={item.id}
              icon={item.emoji}
              isActive={page === item.id}
            />
          ))}
        </SideContainerWrapper>
      </WrapperScrollbar>
    </motion.div>
  )
}

export default React.memo(SideContainer)
