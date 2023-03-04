import { AlignToolbarButton, AlignToolbarButtonProps } from '@udecode/plate'
import { useState } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import { MdArrowDropUp } from 'react-icons/md'
import Tippy from '@tippyjs/react'
import { CenterVertical } from '@styled-icons/fluentui-system-regular/CenterVertical'
import { AlignRight } from '@styled-icons/fluentui-system-regular/AlignRight'
import { AlignLeft } from '@styled-icons/fluentui-system-regular/AlignLeft'
import { TextAlignJustify } from '@styled-icons/fluentui-system-regular/TextAlignJustify'
import { markTooltip } from '../basic-marks/Tooltip'
import React from 'react'

type AlignToolbarProps = {
  data: (AlignToolbarButtonProps & { name: string })[]
}

export const AlignToolbar = ({ data }: AlignToolbarProps) => {
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
              <AlignToolbarButton key={name} {...otherProps} />
            )
        )}
        <span onClick={toggle} className="mark_selector-drop">
          <MdArrowDropUp />
        </span>
      </div>
    </Tippy>
  )
}

export const alignData: AlignToolbarProps['data'] = [
  {
    value: 'center',
    icon: <CenterVertical />,
    name: 'Center',
    tooltip: markTooltip({ name: 'Align', command: 'Center' }),
  },
  {
    value: 'left',
    icon: <AlignLeft />,
    name: 'Left',
    tooltip: markTooltip({ name: 'Align', command: 'Left' }),
  },
  {
    value: 'right',
    icon: <AlignRight />,
    name: 'Right',
    tooltip: markTooltip({ name: 'Align', command: 'Right' }),
  },
  {
    value: 'justify',
    icon: <TextAlignJustify />,
    name: 'Justify',
    tooltip: markTooltip({ name: 'Align', command: 'Justify' }),
  },
]
