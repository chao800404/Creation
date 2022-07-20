import React from 'react'
import { Center } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { BASE_ICON_SIZE } from '../../utils/config'

const IconContainer = ({
  icon,
  type,
  size = BASE_ICON_SIZE,
}: {
  icon: IconType
  size?: string
  type?: 'base'
}) => {
  return (
    <Center
      _hover={type === 'base' ? {} : { bg: 'brand.secondary-600' }}
      p=".2rem"
    >
      {React.createElement(icon, {
        style: { fontSize: size, color: 'inherit' },
      })}
    </Center>
  )
}

export default IconContainer
