import React, { useRef } from 'react'
import WorkspaceItem from '../list-item/workspaceItem'
import WrapperScrollbar from '../scroll/wrapperScrollbar'
import { SideContainerWrapper } from './container.styles'
import { usePageStore } from '../../../src/store'
import { motion } from 'framer-motion'

import { Page, Emoji } from '@prisma/client'
import { useRouter } from 'next/router'

type SideContainerType = {
  list: (Page & { emoji: Emoji })[]
  height?: string
  maxH?: string
}

const SideContainer: React.FC<SideContainerType> = ({
  list,
  maxH,
  height = 'full',
}) => {
  const scrollElem = useRef<HTMLDivElement | null>(null)
  const { page } = useRouter().query
  const id = (page && (page[0] as string)) || ''

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
              isActive={id === item.id || false}
            />
          ))}
        </SideContainerWrapper>
      </WrapperScrollbar>
    </motion.div>
  )
}

export default React.memo(SideContainer)
