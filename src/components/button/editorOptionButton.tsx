import React from 'react'
import { EditorOptionButtonWrapper } from './button.styles'

type EditorOptionButtonType = {
  children: JSX.Element
  className?: string
  color?: string
  onClick: (e: React.MouseEvent) => void
}

const EditorOptionButton: React.FC<EditorOptionButtonType> = ({
  children,
  color,
  ...otherProps
}) => {
  return (
    <EditorOptionButtonWrapper style={{ color: color }} {...otherProps}>
      {children}
    </EditorOptionButtonWrapper>
  )
}

export default EditorOptionButton
