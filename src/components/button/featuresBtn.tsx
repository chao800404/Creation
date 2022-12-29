import React, { CSSProperties } from 'react'
import BaseItem from '../list-item/baseItem'

import { IconType } from 'react-icons'
import { FeatureBtnWrapper } from './button.styles'

type FetureType = {
  icon: IconType
  text: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  style?: CSSProperties
}

const FeaturesBtn: React.FC<FetureType> = ({ icon, text, style, onClick }) => {
  return (
    <FeatureBtnWrapper style={style} onClick={onClick}>
      <BaseItem text={text} icon={icon} fontSize="2rem" fontWeight="bold" />
    </FeatureBtnWrapper>
  )
}

export default React.memo(FeaturesBtn)
