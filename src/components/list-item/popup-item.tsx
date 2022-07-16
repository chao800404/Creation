import React from 'react'
import { Box, Center } from '@chakra-ui/react'
import Base from '../list-item/base'
import { PopupType } from '../../types/base'

const PopupItem: React.FC<PopupType> = ({ icon, text, handleClick }) => {
  return (
    <Box
      _hover={{
        bg: 'brand.secondary-600',
        borderRadius: '.2rem',
      }}
      onClick={handleClick}
    >
      <Box ml="3">
        <Base fontSize=".5rem" text={text} icon={icon} />
      </Box>
    </Box>
  )
}

export default PopupItem
