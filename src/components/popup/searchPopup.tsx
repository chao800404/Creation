import React from 'react'
import { SearchPopupWrapper } from './popup.styles'
import { SlMagnifier } from 'react-icons/sl'
import { motion, AnimatePresence } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, scaleX: 0.6 },
  show: {
    opacity: 1,
    scaleX: 1,
  },
}

const SearchPopup: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <SearchPopupWrapper>
          <motion.div
            data-type="search-popup"
            animate="show"
            initial="hidden"
            className="search_popup"
            variants={variants}
            exit="hidden"
            transition={{
              default: {
                duration: 0.1,
                ease: [0, 0.71, 0.2, 1.01],
              },
              scaleX: {
                type: 'spring',
                damping: 7,
                stiffness: 200,
                restDelta: 0.3,
              },
            }}
          >
            <div className="search_popup--content">
              <div className="search_popup--icon">
                <SlMagnifier color="#1c1c1c" fontSize="1.2rem" />
              </div>
              <input
                className="search_popup--input"
                placeholder="Search Docs"
              />
            </div>
          </motion.div>
        </SearchPopupWrapper>
      )}
    </AnimatePresence>
  )
}

export default SearchPopup
