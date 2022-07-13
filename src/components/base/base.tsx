import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { BaseProps } from '../../types/base'
import IconContainer from '../iconContainer/iconContainer'

const Base: React.FC<BaseProps> = ({ text, icon, children, color }) => {
  return (
    <Flex cursor="pointer" align="center" p="2px 0">
      {children}
      {icon && <IconContainer icon={icon} />}
      <Text ml="2" fontSize="sm" color={color}>
        {text}
      </Text>
    </Flex>
  )
}

export default Base
