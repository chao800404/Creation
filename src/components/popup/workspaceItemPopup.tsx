import React, { useEffect, useRef, useState } from 'react'
import shallow from 'zustand/shallow'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { IoTrashOutline } from 'react-icons/io5'
import PopupItem from '../list-item/popup-item'
import { motion } from 'framer-motion'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { usePageStore } from '../../store'
import { WorkspaceItemPopupWrapper } from './popup.styles'
import { useDeleteList } from '../../hook/useDeleteList'
import { useRouter } from 'next/router'

const WorkspaceItemPopup = ({ focusNodeDom }: { focusNodeDom: string }) => {
  const popupElem = useRef<HTMLDivElement>(null)
  const listDelete = useDeleteList()
  const router = useRouter()
  const { page } = useRouter().query

  const { toggleFavorite } = usePageStore(
    (state) => ({
      toggleFavorite: state.stateAndItemUpdateAsync,
    }),
    shallow
  )
  const [toggle, setToggle] = useState(false)
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const [favorite, setFavorite] = useState(false)
  const [itemId, setItemId] = useState<null | string>(null)

  useEffect(() => {
    const handlePointerDown = (e: MouseEvent) => {
      const popupElem = (e.target as HTMLElement).closest(
        '[data-type = "workspace-item-popup"]'
      ) as HTMLElement

      const elem = (e.target as HTMLElement).closest(
        `[data-type = ${focusNodeDom}]`
      ) as HTMLElement

      if (!popupElem) {
        setToggle(false)
        setItemId(null)
      }

      if (elem) {
        if (e.buttons === 2) {
          setMousePosition({ x: e.pageX, y: e.pageY })
          setToggle(true)
          setItemId(elem.id)
        }
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [focusNodeDom])

  useEffect(() => {
    if (toggle && itemId) {
      const item = usePageStore
        .getState()
        .list.find((item) => item.id === itemId)

      item && setFavorite(item?.favorite)
    }
  }, [itemId, toggle])

  const wrapperOnClick = (fn: () => void) => {
    fn()
    setToggle((prev) => !prev)
  }

  return (
    <>
      {toggle && (
        <WorkspaceItemPopupWrapper
          data-type="workspace-item-popup"
          ref={popupElem}
          id="workspace-item-popup"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            transform: `translate(${mousePosition.x}px,${mousePosition.y}px)`,
          }}
        >
          <PopupItem
            desc="Delete"
            icon={IoTrashOutline}
            onClick={() => {
              if (itemId == page) {
                router.push('/')
              }
              wrapperOnClick(() => {
                listDelete(itemId as string)
              })
            }}
          />
          <PopupItem
            desc={favorite ? 'unfavorite' : 'favorite'}
            icon={favorite ? AiFillStar : AiOutlineStar}
            onClick={() => {
              wrapperOnClick(
                () =>
                  itemId &&
                  toggle &&
                  toggleFavorite(itemId, 'favorite', !favorite)
              )
            }}
          />
          <PopupItem
            desc="rename"
            icon={MdOutlineDriveFileRenameOutline}
            color="inherit"
            onClick={async () => {
              if (itemId) {
                // setRename(true)
              }
            }}
          />
        </WorkspaceItemPopupWrapper>
      )}
    </>
  )
}

export default WorkspaceItemPopup
