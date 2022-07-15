import React from 'react'
import { Center } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { BASE_ICON_SIZE } from '../../utils/config'

const IconContainer = ({
  icon,
  size = BASE_ICON_SIZE,
}: {
  icon: IconType
  size?: string
}) => {
  return (
    <Center _hover={{ bg: 'brand.secondary-600' }} p=".2rem">
      {React.createElement(icon, {
        style: { fontSize: size, color: 'inherit' },
      })}
    </Center>
  )
}

export default IconContainer
