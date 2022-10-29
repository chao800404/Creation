import React from 'react'
import { ListItem } from '../../types/listItem'
import { UserPopupItemWrapper } from './item.styles'

const UserPopupItem: React.FC<ListItem> = ({
  text,
  icon,
  frontSize = '1.2rem',
}) => {
  return (
    <UserPopupItemWrapper>
      {React.createElement(icon, {
        style: { fontSize: frontSize, color: 'inherit' },
      })}
      <p className="userpopup_item-desc">{text}</p>
    </UserPopupItemWrapper>
  )
}

export default UserPopupItem
