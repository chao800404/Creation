import React from 'react'
import { motion } from 'framer-motion'
import IconContainer from '../iconContainer/iconContainer'
import { SIDE_OPTION } from '../../utils/config'
import { AccordionWrapper } from './accordion.styles'
import BaseItem from '../list-item/baseItem'

type AccordionType = {
  text: string
  sideWidth?: number
  open?: boolean
  children?: JSX.Element
  onClick?: () => void
  id?: string
}

const Accordion: React.FC<AccordionType> = ({
  text,
  children,
  sideWidth,
  onClick,
  open,
  id,
}) => {
  return (
    <AccordionWrapper id={id} onClick={onClick}>
      <BaseItem text={text} width={((sideWidth as number) * 45) / 100}>
        <motion.div animate={{ rotate: open ? '90deg' : '0deg' }}>
          <IconContainer icon={SIDE_OPTION.base.icon} />
        </motion.div>
        {children || <></>}
      </BaseItem>
    </AccordionWrapper>
  )
}

export default React.memo(Accordion)
