import React from 'react'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Base from '../list-item/base'
import IconContainer from '../iconContainer/iconContainer'
import { SIDE_OPTION } from '../../utils/config'
import { BaseProps } from '../../types/base'

const Accordion: React.FC<BaseProps> = ({ text, icon, color, children }) => {
  return (
    <Box>
      <Base text={text} color="inherit">
        <Box as={motion.span}>
          {icon ? (
            <IconContainer icon={icon} />
          ) : (
            <IconContainer icon={SIDE_OPTION.base.icon} />
          )}
        </Box>
        {children}
      </Base>
    </Box>
  )
}

export default Accordion
