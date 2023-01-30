import {
  ColorPickerToolbarDropdown,
  MarkToolbarButton,
  MarkToolbarButtonProps,
  MARK_COLOR,
  ToolbarButtonProps,
  Value,
} from '@udecode/plate'
import React, { useState } from 'react'
import { MdArrowDropUp } from 'react-icons/md'
import { BsCheckLg } from 'react-icons/bs'
import useWindowPointerToggle from '../../../utils/useWindowPointerToggle'
import { ColorPickerToolbarDropdownProps } from './type'

type BasicProps = {
  data: MarkToolbarButtonProps<Value>[]
}

const BasicMarkToolbarSelectButton: React.FC<BasicProps> = ({ data }) => {
  const [selectName, setSelectName] = useState(data[0].name)
  const { ref, toggle, handleToggleSet } = useWindowPointerToggle()

  return (
    <span className="mark_selector">
      {data.map(
        ({ name, ...otherProps }) =>
          selectName === name && (
            <MarkToolbarButton key={name} {...otherProps} />
          )
      )}
      <span
        onClick={() => handleToggleSet(!toggle)}
        className="mark_selector-drop"
      >
        <MdArrowDropUp />
      </span>
      {toggle && (
        <span className="mark_selector-popup" ref={ref}>
          {data.map(({ name, icon, ...otherProps }) => (
            <div
              className="mark_selector-popup-item"
              key={name}
              onClick={() => {
                setSelectName(name)
                handleToggleSet(false)
              }}
            >
              <span>{selectName === name && <BsCheckLg />}</span>
              <span>{icon}</span>
              <span>{name}</span>
            </div>
          ))}
        </span>
      )}
    </span>
  )
}

type BasicColorBtnProps = {
  data: (ColorPickerToolbarDropdownProps & ToolbarButtonProps)[]
}

const BasicColorSelectButton = ({ data }: BasicColorBtnProps) => {
  const { ref, toggle, handleToggleSet } = useWindowPointerToggle()
  const [selectName, setSelectName] = useState(data[0].name)

  return (
    <span className="mark_selector">
      {data.map(
        ({ name, ...otherProps }) =>
          selectName === name && (
            <ColorPickerToolbarDropdown key={name} {...otherProps} />
          )
      )}
      <span
        onClick={() => handleToggleSet(!toggle)}
        className="mark_selector-drop"
        ref={ref}
      >
        <MdArrowDropUp />
      </span>

      {toggle && (
        <span className="mark_selector-popup" ref={ref}>
          {data.map(({ name, icon, ...otherProps }) => (
            <div
              className="mark_selector-popup-item"
              key={name}
              onClick={() => {
                setSelectName(name)
                handleToggleSet(false)
              }}
            >
              <span>{selectName === name && <BsCheckLg />}</span>
              <span>{icon}</span>
              <span>{name}</span>
            </div>
          ))}
        </span>
      )}
    </span>
  )
}

export { BasicMarkToolbarSelectButton, BasicColorSelectButton }
