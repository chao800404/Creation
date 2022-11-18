import React from 'react'
import { IconType } from 'react-icons'
import { UserPopupItemWrapper } from './item.styles'

type ListItem = {
  text: string
  icon: IconType
  fontSize?: string
}

const UserPopupItem: React.FC<ListItem> = ({
  text,
  icon,
  fontSize = '1.2rem',
}) => {
  return (
    <UserPopupItemWrapper>
      {React.createElement(icon, {
        style: { fontSize: fontSize, color: 'inherit' },
      })}
      <p className="userpopup_item-desc">{text}</p>
    </UserPopupItemWrapper>
  )
}

export default UserPopupItem
