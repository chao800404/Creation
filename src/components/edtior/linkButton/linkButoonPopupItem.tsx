import React from 'react'
import { LinkItem } from './type'
import { LinkButoonPopupItemWrapper } from './linkButton.styles'

export const LinkButoonPopupItem = ({ src, name, emoji }: LinkItem) => {
  return (
    <LinkButoonPopupItemWrapper>
      <span className="linkPopup-emoji">{emoji}</span>
      <div className="linkPopup-desc">{name}</div>
    </LinkButoonPopupItemWrapper>
  )
}
