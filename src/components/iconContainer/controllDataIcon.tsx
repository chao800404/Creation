import React from 'react'
import { IconType } from 'react-icons'
import IconContainer from './iconContainer'

import { ControllDataIconWrapper } from './icon.styles'

type ControllDataIconType = {
  id: string | undefined
  toggle: boolean
  openIcon: IconType
  closeIcon: IconType
  openIconDesc?: string
  closeIconDesc?: string
  onClick: () => void
}

const ControllDataIcon: React.FC<ControllDataIconType> = ({
  id,
  toggle,
  openIcon,
  closeIcon,
  openIconDesc,
  closeIconDesc,
  onClick,
}) => {
  return (
    <ControllDataIconWrapper
      animate={{
        width: id ? 'auto' : '0',
        visibility: id ? 'visible' : 'hidden',
      }}
    >
      <div className="controllerIcon" onClick={onClick}>
        <IconContainer icon={toggle ? openIcon : closeIcon} />
        {openIconDesc && closeIconDesc && (
          <p>{toggle ? openIconDesc : closeIconDesc}</p>
        )}
      </div>
      <span className="controller_bound_line" />
    </ControllDataIconWrapper>
  )
}

export default React.memo(ControllDataIcon)
