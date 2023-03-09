import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { BlockPopupElem } from '../blockPopup/blockPopup'
import ExternalLink from '../blockPopup/externalLink'
import InternalLink from '../blockPopup/internalLink'
import { LinkButoonPopupItem } from './linkButoonPopupItem'
import { LinkButtonPopupProps, LinkItem } from './type'

const labels = [{ name: 'INTERNAL LINK' }, { name: 'EXTERNAL LINK' }]

const LinkButtonPopup = ({
  toggle,
  items,
  handleSetSrc,
}: LinkButtonPopupProps<LinkItem>) => {
  return (
    <AnimatePresence>
      {toggle && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="base_image-popup"
        >
          <BlockPopupElem<LinkItem>
            labels={labels}
            items={items}
            renderItem={LinkButoonPopupItem}
            handleUrlSet={handleSetSrc}
          >
            {React.createElement(InternalLink)}
            {React.createElement(ExternalLink)}
          </BlockPopupElem>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

React.memo(LinkButtonPopup).displayName = 'LinkButtonPopup'

export { LinkButtonPopup }
