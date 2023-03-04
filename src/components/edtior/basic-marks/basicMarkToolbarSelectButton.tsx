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
import { ColorPickerToolbarDropdownProps } from './type'
import Tippy from '@tippyjs/react'

type BasicProps = {
  data: MarkToolbarButtonProps<Value>[]
}

const BasicMarkToolbarSelectButton: React.FC<BasicProps> = ({ data }) => {
  const [selectName, setSelectName] = useState(data[0].name)
  const [visible, setVisible] = useState(false)
  const hide = () => setVisible(false)
  const toggle = () => setVisible((prev) => !prev)

  const render = React.useCallback(() => {
    return (
      <span className="mark_selector-popup">
        {data.map(({ name, icon }) => (
          <div
            className="mark_selector-popup-item"
            key={name}
            onClick={() => {
              setSelectName(name)
              hide()
            }}
          >
            <span>{selectName === name && <BsCheckLg />}</span>
            <span>{icon}</span>
            <span>{name}</span>
          </div>
        ))}
      </span>
    )
  }, [data, selectName])

  return (
    <Tippy
      interactive={true}
      interactiveBorder={20}
      visible={visible}
      onClickOutside={hide}
      content={<>{render()}</>}
    >
      <div className="mark_selector">
        {data.map(
          ({ name, ...otherProps }) =>
            selectName === name && (
              <MarkToolbarButton key={name} {...otherProps} />
            )
        )}
        <span onClick={toggle} className="mark_selector-drop">
          <MdArrowDropUp />
        </span>
      </div>
    </Tippy>
  )
}

type BasicColorBtnProps = {
  data: (ColorPickerToolbarDropdownProps & ToolbarButtonProps)[]
}

const BasicColorSelectButton = ({ data }: BasicColorBtnProps) => {
  const [selectName, setSelectName] = useState(data[0].name)
  const [visible, setVisible] = useState(false)
  const hide = () => setVisible(false)
  const toggle = () => setVisible((prev) => !prev)

  const render = React.useCallback(() => {
    return (
      <span className="mark_selector-popup">
        {data.map(({ name, icon }) => (
          <div
            className="mark_selector-popup-item"
            key={name}
            onClick={() => {
              setSelectName(name)
              hide()
            }}
          >
            <span>{selectName === name && <BsCheckLg />}</span>
            <span>{icon}</span>
            <span>{name}</span>
          </div>
        ))}
      </span>
    )
  }, [data, selectName])

  return (
    <Tippy
      interactive={true}
      interactiveBorder={20}
      visible={visible}
      onClickOutside={hide}
      content={<>{render()}</>}
    >
      <div className="mark_selector">
        {data.map(
          ({ name, ...otherProps }) =>
            selectName === name && (
              <ColorPickerToolbarDropdown key={name} {...otherProps} />
            )
        )}
        <span onClick={toggle} className="mark_selector-drop">
          <MdArrowDropUp />
        </span>
      </div>
    </Tippy>
  )
}

export { BasicMarkToolbarSelectButton, BasicColorSelectButton }
