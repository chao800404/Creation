import React from 'react'
import { Center } from '@chakra-ui/react'
import { IconType } from 'react-icons'

const IconContainer = ({ icon }: { icon: IconType }) => {
  return (
    <Center cursor="pointer" _hover={{ bg: 'brand.secondary-600' }} p=".2rem">
      {React.createElement(icon, { style: { fontSize: '1rem' } })}
    </Center>
  )
}

export default IconContainer
