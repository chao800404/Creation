import React, { useState } from 'react'
import { OptionToolWrapper } from './optionTool.styles'
import { DiagonalArrowLeftDownOutline } from '@styled-icons/evaicons-outline/DiagonalArrowLeftDownOutline'
import { motion, AnimatePresence } from 'framer-motion'
import useWindowPointerToggle from '@/utils/useWindowPointerToggle'
import { ThreeDots } from '@styled-icons/bootstrap/ThreeDots'

const variants = {
  open: {
    width: '135px',
    height: '122px',
    transition: { ease: [0.17, 0.67, 0.83, 0.67] },
  },
  closed: {
    width: '30px',
    height: '20px',
    transition: { ease: [0.17, 0.67, 0.83, 0.67] },
  },
}

type OptionToolProps = {
  className: string
  children: React.ReactNode
}

const OptionTool: React.FC<OptionToolProps> = ({ className, children }) => {
  // const [isOpen, setIsOpen] = useState(false)
  const {
    ref,
    handleToggleSet,
    toggle: isOpen,
  } = useWindowPointerToggle<HTMLDivElement>()

  return (
    <OptionToolWrapper
      className={`${className}`}
      onClick={() => handleToggleSet(!isOpen)}
      ref={ref}
    >
      <motion.div
        className="option"
        variants={variants}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ default: { ease: 'linear' } }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 1.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              className="option-content"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>

        {!isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5, transition: { duration: 2.1 } }}
            className="option-icon center"
          >
            <ThreeDots />
          </motion.div>
        )}
      </motion.div>
    </OptionToolWrapper>
  )
}
React.memo(OptionTool).displayName = 'OptionTool'

export { OptionTool }
