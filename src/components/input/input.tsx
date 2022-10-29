import React from 'react'

import { InputWrapper } from './input.styles'

const BasicInput = ({
  children,
  placeholder,
  type,
  validity,
}: {
  children: React.ReactElement
  placeholder: string
  type: string
  validity: boolean
}) => {
  return (
    <>
      <InputWrapper>
        <div className="input-icon">{children}</div>
        <input
          className="input-content"
          type={type === 'username' ? 'text' : type}
          placeholder={placeholder}
          name={type}
          id={type}
        />
      </InputWrapper>
    </>
  )
}

export default BasicInput
