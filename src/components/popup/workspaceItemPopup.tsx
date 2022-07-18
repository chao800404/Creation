import React, { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import shallow from 'zustand/shallow'
import useStore from '../../store/store'
import { AiOutlineStar } from 'react-icons/ai'
import { IoTrashOutline } from 'react-icons/io5'
import PopupItem from '../list-item/popup-item'

const WorkspaceItemPopup = ({ id }: { id: string }) => {
  const popupElem = useRef<HTMLDivElement>(null)

  const setRightClickId = useStore((state) => state.setRightClickId, shallow)
  const removeListItem = useStore((state) => state.removeListItem, shallow)

  useEffect(() => {
    const cancelPopup = (e: MouseEvent) => {
      const elem = (e.target as HTMLElement).closest(
        '[data-type = "workspace-item-popup"]'
      ) as HTMLElement
      if (popupElem && popupElem.current) {
        if (elem?.id === popupElem?.current?.id) return
        setRightClickId('')
      }
    }

    window.addEventListener('click', cancelPopup)
    return () => window.removeEventListener('click', cancelPopup)
  }, [setRightClickId, popupElem])

  const handleClick = () => removeListItem(id)

  return (
    <Box
      pos="absolute"
      top=".5rem"
      right="1rem"
      w="9.5rem"
      h="10rem"
      borderRadius=".3rem"
      bg="brand.secondary-100"
      boxShadow="md"
      border="1px"
      borderColor="gray.300"
      zIndex="300"
      data-type="workspace-item-popup"
      ref={popupElem}
      id="workspace-item-popup"
      p="1"
    >
      <PopupItem
        text="刪除項目"
        icon={IoTrashOutline}
        handleClick={handleClick}
      />
      <PopupItem
        text="加入我的最愛"
        icon={AiOutlineStar}
        handleClick={() => {
          console.log()
        }}
      />
    </Box>
  )
}

export default WorkspaceItemPopup
