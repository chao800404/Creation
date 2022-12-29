import React, { useState } from 'react'
import IconContainer from '../iconContainer/iconContainer'
import { GroupItemWrapper } from './item.styles'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'
import { GroupButtonType } from '../../store/useMenuPopupStore'
import PopupItem from './popup-item'

const variants = {
  hidden: {
    x: -10,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 2,
      type: 'tween',
      default: { ease: 'anticipate' },
    },
  },
}

const GroupItem = (
  props: GroupButtonType & {
    dataType: string
    width: number
    hiddenMenuPopup: () => void
  }
) => {
  const { children, desc, dataType, width, icon, hiddenMenuPopup } = props
  const [show, setShow] = useState(false)
  return (
    <GroupItemWrapper
      onMouseEnter={() => setShow((show) => !show)}
      onMouseLeave={() => setShow((show) => !show)}
    >
      {icon ? <IconContainer color="inherit" icon={icon} /> : <div />}

      <p>{desc.replace('_', ' ')}</p>
      <span>
        <MdKeyboardArrowRight />
      </span>
      <AnimatePresence>
        {show && (
          <motion.div
            initial="hidden"
            exit="hidden"
            animate="show"
            className="grop_item-children round_sm"
            variants={variants}
            style={{ backgroundColor: '#eeeeee' }}
          >
            {children?.map((button, index) => (
              <PopupItem
                width={width}
                key={index}
                desc={button.desc.replaceAll('_', ' ')}
                icon={button.icon}
                onClick={() => {
                  // if (button.onClick) button.onClick()
                  hiddenMenuPopup()
                }}
                dataType={dataType}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </GroupItemWrapper>
  )
}

export default GroupItem
