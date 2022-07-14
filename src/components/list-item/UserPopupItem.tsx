import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { ListItem } from '../../types/listItem'

const UserPopupItem: React.FC<ListItem> = ({
  text,
  icon,
  frontSize = '1.2rem',
}) => {
  return (
    <Flex align="center" gap="2">
      {React.createElement(icon, {
        style: { fontSize: frontSize, color: 'inherit' },
      })}
      <Text>{text}</Text>
    </Flex>
  )
}

export default UserPopupItem
