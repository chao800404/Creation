import React from 'react'
import BaseItem from './baseItem'
import { IconType } from 'react-icons'
import { PopupItemWrapper } from './item.styles'

type PopupItemTyep = {
  icon: IconType
  desc: string
  color?: string
  onClick: () => void
}

const PopupItem: React.FC<PopupItemTyep> = ({ icon, color, desc, onClick }) => {
  return (
    <PopupItemWrapper onClick={onClick}>
      <div className="container">
        <BaseItem fontSize=".8rem" text={desc} icon={icon} />
      </div>
    </PopupItemWrapper>
  )
}

export default PopupItem
