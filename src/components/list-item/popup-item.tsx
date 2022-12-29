import React from 'react'
import BaseItem from './baseItem'
import { IconType } from 'react-icons'
import { PopupItemWrapper } from './item.styles'

type PopupItemTyep = {
  icon: IconType | undefined
  width: number
  desc: string
  dataType: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

const PopupItem: React.FC<PopupItemTyep> = ({
  icon,
  dataType,
  desc,
  onClick,
  width,
}) => {
  return (
    <PopupItemWrapper width={width} data-type={dataType} onClick={onClick}>
      <div className="container">
        <BaseItem fontSize=".8rem" text={desc} icon={icon} />
      </div>
    </PopupItemWrapper>
  )
}

export default PopupItem
