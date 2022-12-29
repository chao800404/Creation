import React, { useState, useEffect, useCallback, useRef } from 'react'
import shallow from 'zustand/shallow'
import { useDrop } from 'react-dnd'
import { SIDE_OPTION } from '../../../utils/config'
import { ResDataType, useListSWR } from '../../../hook/useListSWR'
import { BsFillBookmarkStarFill } from 'react-icons/bs'
import FeaturesBtn from '../../button/featuresBtn'
import { motion, AnimatePresence } from 'framer-motion'
import WrapperScrollbar from '../../scroll/wrapperScrollbar'
import WorkspaceItem from '../../list-item/workspaceItem'
import { FeatureTagWrapper } from './favorite.styles'
import { TreeViewType } from '../treeView/type'
import { showMenuPopup } from '../../popup/menuPopup'
import { usePageControllerStore } from '../../../store/usePageControllerStore'

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
        height > 150 && height < 350 && favoriteTagHeightSet(height)
      }
    },
    [favoriteTagHeightSet, pointerDown]
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
          onClick={() => favoriteTagToggle(!favoriteTagOpen)}
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

export default FavoriteTag
