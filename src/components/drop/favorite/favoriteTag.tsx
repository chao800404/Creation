import React, { useState, useEffect, useCallback, useRef } from 'react'
import { shallow } from 'zustand/shallow'
import { ResDataType, useListSWR } from '../../../hook/useListSWR'
import { BsFillBookmarkStarFill } from 'react-icons/bs'
import FeaturesBtn from '../../button/featuresBtn'
import { motion, AnimatePresence } from 'framer-motion'
import WrapperScrollbar from '../../scroll/wrapperScrollbar'
import WorkspaceItem from '../../list-item/workspaceItem'
import { FeatureTagWrapper } from './favorite.styles'
import { TreeViewType } from '../treeView/type'
import { usePageControllerStore } from '../../../store/usePageControllerStore'
import dynamic from 'next/dynamic'
import { pageMap } from '../../../lib/yjs'

const variants = (height: number) => ({
  hide: {
    height: 0,
  },
  show: {
    height,
  },
})

const FavoriteTag: React.FC<TreeViewType> = ({ list, id, menuMap }) => {
  const {
    favoriteTagOpen,
    favoriteTagToggle,
    favoriteTagHeightSet,
    favoriteTagHeight,
  } = usePageControllerStore(
    (state) => ({
      favoriteTagOpen: state.favoriteTagOpen,
      favoriteTagToggle: state.favoriteTagToggle,
      favoriteTagHeightSet: state.favoriteTagHeightSet,
      favoriteTagHeight: state.favoriteTagHeight,
    }),
    shallow
  )
  const [pointerDown, setPointerDown] = useState(false)
  const elemRef = useRef<HTMLDivElement | null>(null)

  const {
    mutateFunction: { addNewPage, updatePageConfig },
  } = useListSWR()

  const favoriteList = list.filter((item) => item.data?.favorite)

  const handlePointer = useCallback(
    (e: PointerEvent) => {
      const elem = elemRef.current
      if (elem && pointerDown) {
        document.body.style.cursor = 'ns-resize'
        const { top } = elem.getBoundingClientRect()
        const height = e.pageY - top
        if (height > 150 && height < 350) {
          pageMap.set('pageMap', { favHeight: height })
        }
      }
    },

    [pointerDown]
  )

  useEffect(() => {
    const handlePointerUp = () => setPointerDown(false)
    const handlePointerMove = (e: PointerEvent) => handlePointer(e)

    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerup', handlePointerUp)
    return () => {
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerup', handlePointerUp)
    }
  }, [handlePointer])

  useEffect(() => {
    const handleChange = () => {
      const favTag = pageMap.get('pageMap')

      if (favTag !== undefined) {
        const [key] = Object.keys(favTag)

        switch (key) {
          case 'open':
            typeof favTag.open === 'boolean' && favoriteTagToggle(favTag.open)
            break
          case 'favHeight':
            typeof favTag.favHeight === 'number' &&
              favoriteTagHeightSet(favTag.favHeight)
            break
        }
        // favoriteTagToggle(favTag.open)
      }
    }
    pageMap.observe(handleChange)
    return () => pageMap.unobserve(handleChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FeatureTagWrapper
      isDrag={pointerDown}
      content={`content + ${favoriteList.length}`}
      hasFavorite={favoriteList.length > 0}
    >
      <div className="accordion">
        <FeaturesBtn
          icon={BsFillBookmarkStarFill}
          text={'Favorite'}
          style={{ padding: '2px .5rem', borderBottom: '1px solid #e3e3e3' }}
          onClick={() => pageMap.set('pageMap', { open: !favoriteTagOpen })}
        />
      </div>
      <AnimatePresence>
        {favoriteTagOpen && (
          <motion.div
            ref={elemRef}
            variants={variants(favoriteTagHeight)}
            initial="hide"
            animate="show"
            exit="hide"
            style={{
              position: 'relative',
              height: `${favoriteTagHeight}px`,
              borderBottom: '1px solid #e3e3e3',
            }}
            onContextMenu={(e) => e.preventDefault()}
          >
            <>
              <WrapperScrollbar>
                {favoriteList.map((item) => (
                  <WorkspaceItem
                    key={item.id}
                    {...item}
                    isSelected={item.id === id}
                    hasChild={list.some((its) => its.parent === item.id)}
                    addNewPage={addNewPage}
                    dataType="workspace-item"
                    menuMap={menuMap}
                    updatePageConfig={updatePageConfig}
                  />
                ))}
              </WrapperScrollbar>
              <div
                data-type="feature-drag"
                className="feature_drag_bound"
                onPointerDown={(e) => {
                  e.preventDefault()
                  setPointerDown(true)
                }}
              />
            </>
          </motion.div>
        )}
      </AnimatePresence>
    </FeatureTagWrapper>
  )
}

export default dynamic(() => Promise.resolve(FavoriteTag), { ssr: false })
