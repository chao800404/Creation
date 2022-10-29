import React from 'react'
import { EditorOptionButtonWrapper } from './button.styles'

type EditorOptionButtonType = {
  children: JSX.Element
  className?: string
  active?: boolean
  onClick: (e: React.MouseEvent) => void
}

const EditorOptionButton: React.FC<EditorOptionButtonType> = ({
  children,
  active,
  ...otherProps
}) => {
  return (
    <EditorOptionButtonWrapper
      style={active ? { color: '#e8e8e8' } : {}}
      {...otherProps}
    >
      {children}
    </EditorOptionButtonWrapper>
  )
}

export default EditorOptionButton
