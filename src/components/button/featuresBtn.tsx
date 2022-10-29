import React from 'react'
import BaseItem from '../list-item/baseItem'

import { IconType } from 'react-icons'
import { FeatureBtnWrapper } from './button.styles'

type FetureType = {
  icon: IconType
  text: string
}

const FeaturesBtn: React.FC<FetureType> = ({ icon, text }) => {
  return (
    <FeatureBtnWrapper>
      <BaseItem text={text} icon={icon} fontSize="2rem" fontWeight="bold" />
    </FeatureBtnWrapper>
  )
}

export default React.memo(FeaturesBtn)
