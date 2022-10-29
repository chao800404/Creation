import React from 'react'
import { IconType } from 'react-icons'
import { BASE_ICON_SIZE } from '../../utils/config'
import { IconContainerWrapper } from './icon.styles'

const IconContainer = ({
  icon,
  size = BASE_ICON_SIZE,
  color,
}: {
  icon: IconType
  size?: string
  color?: string
}) => {
  return (
    <IconContainerWrapper>
      {React.createElement(icon, {
        style: { fontSize: size, color: color ? color : 'inherit' },
      })}
    </IconContainerWrapper>
  )
}

export default IconContainer
