import React, { useState } from 'react'
import { useMenuPopupStore } from '../../store/useMenuPopupStore'
import useOnClickOutside from '../../utils/useOnClickOutside'
const WrapperRename = ({
  text,
  showInput,
  width,
  onChange,
  onKeyDown,
  fontWeight,
}: {
  text: string
  showInput: boolean
  width?: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>
  fontWeight?: number
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
    <p style={{ width: width ? width : 'calc(100% - 4rem)', fontWeight }}>
      {text}
    </p>
  )
}

export default WrapperRename
