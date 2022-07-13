import React, { useState } from 'react'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Base from '../base/base'
import IconContainer from '../iconContainer/iconContainer'
import { SIDE_OPTION } from '../../utils/config'
import { IconType } from 'react-icons'

const Accordion = ({ text, icon }: { text: string; icon?: IconType }) => {
  const [toggle, setToggle] = useState(false)

  return (
    <Box onClick={() => !icon && setToggle((prev) => !prev)}>
      <Base text={text}>
        <Box as={motion.span} animate={{ rotate: toggle ? 90 : 0 }}>
          {icon ? (
            <IconContainer icon={icon} />
          ) : (
            <IconContainer icon={SIDE_OPTION.base.icon} />
          )}
        </Box>
      </Base>
    </Box>
  )
}

export default Accordion
