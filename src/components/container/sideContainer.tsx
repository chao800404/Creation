import React, { useRef } from 'react'
import WorkspaceItem from '../list-item/workspaceItem'
import WrapperScrollbar from '../scroll/wrapperScrollbar'
import { SideContainerWrapper } from './container.styles'
import { usePageControllerStore } from '../../../src/store'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { List, Emoji } from '@prisma/client'
import shallow from 'zustand/shallow'

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
  const focusId = usePageControllerStore((state) => state.focusId, shallow)

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
              isActive={focusId === item.id}
            />
          ))}
        </SideContainerWrapper>
      </WrapperScrollbar>
    </motion.div>
  )
}

export default React.memo(SideContainer)
