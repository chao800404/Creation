import React, { useMemo } from 'react'
import { OptionToolWrapper } from './optionTool.styles'
import { motion, AnimatePresence } from 'framer-motion'
import useWindowPointerToggle from '@/utils/useWindowPointerToggle'
import { ThreeDots } from '@styled-icons/bootstrap/ThreeDots'

type OptionToolProps = {
  className: string
  children: React.ReactNode
  showWidth?: string
  showHeight?: string
}

const OptionTool: React.FC<OptionToolProps> = ({
  className,
  children,
  showWidth = null,
  showHeight = null,
}) => {
  const {
    ref,
    handleToggleSet,
    toggle: isOpen,
  } = useWindowPointerToggle<HTMLDivElement>()

  const variants = useMemo(() => {
    return {
      open: {
        width: showWidth ? showWidth : '135px',
        height: showHeight ? showHeight : '122px',
        transition: { ease: [0.17, 0.67, 0.83, 0.67] },
      },
      closed: {
        width: '30px',
        height: '20px',
        transition: { ease: [0.17, 0.67, 0.83, 0.67] },
      },
    }
  }, [showHeight, showWidth])

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
              initial={{ opacity: 0, y: 10 }}
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
