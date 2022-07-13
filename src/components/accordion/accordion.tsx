import React, { useState } from 'react'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Base from '../base/base'
import IconContainer from '../iconContainer/iconContainer'
import { SIDE_OPTION } from '../../utils/config'
import { IconType } from 'react-icons'

const Accordion = ({
  text,
  icon,
  color,
}: {
  text: string
  icon?: IconType
  color?: string
}) => {
  const [toggle, setToggle] = useState(false)
  const [hover, setHover] = useState(false)

  return (
    <Box
      onClick={() => !icon && setToggle((prev) => !prev)}
      onMouseEnter={() => setHover((hover) => !hover)}
      onMouseLeave={() => setHover((hover) => !hover)}
      color={
        color
          ? color
          : hover
          ? SIDE_OPTION.base.color.active
          : SIDE_OPTION.base.color.base
      }
    >
      <Base text={text} color="inherit">
        <Box as={motion.span} animate={{ rotate: toggle ? 90 : 0 }}>
          {icon ? (
            <IconContainer icon={icon} color={SIDE_OPTION.base.color.active} />
          ) : (
            <IconContainer icon={SIDE_OPTION.base.icon} />
          )}
        </Box>
      </Base>
    </Box>
  )
}

export default Accordion
