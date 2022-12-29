import React, { useState } from 'react'
import { useMenuPopupStore } from '../../store/useMenuPopupStore'
import useOnClickOutside from '../../utils/useOnClickOutside'
const WrapperRename = ({
  text,
  showInput,
  width,
  onChange,
  onKeyDown,
}: {
  text: string
  showInput: boolean
  width?: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>
}) => {
  return showInput ? (
    <input
      defaultValue={text}
      autoFocus={true}
      onFocus={(e) => e.target.select()}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  ) : (
    <p style={{ width: width ? width : 'calc(100% - 4rem)' }}>{text}</p>
  )
}

export default WrapperRename
