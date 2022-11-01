import React, { useEffect, useRef, useState } from 'react'
import shallow from 'zustand/shallow'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { IoTrashOutline } from 'react-icons/io5'
import PopupItem from '../list-item/popup-item'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { WorkspaceItemPopupWrapper } from './popup.styles'
import { useRouter } from 'next/router'
import { useListSWR } from '../../hook/useListSWR'

const WorkspaceItemPopup = ({ focusNodeDom }: { focusNodeDom: string }) => {
  const popupElem = useRef<HTMLDivElement>(null)
  const { page } = useRouter().query
  const {
    data: { favorite },
    mutateFution,
  } = useListSWR(page as string)
  const router = useRouter()

  const [toggle, setToggle] = useState(false)
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const [itemId, setItemId] = useState<null | string>(null)

  const {
    data: { list },
  } = useListSWR()

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
              wrapperOnClick(() => {
                const index = list?.findIndex((item) => item.id === itemId)
                index && list
                  ? router.push(list[index - 1].id)
                  : router.push('/')
                mutateFution.deleteList(itemId as string)
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
                  mutateFution.updateListItem(itemId, 'favorite', !favorite)
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
