import {
  AlignToolbarButton,
  AlignToolbarButtonProps,
  ToolbarButtonProps,
} from '@udecode/plate'
import { useState } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import { MdArrowDropUp } from 'react-icons/md'
import useWindowPointerToggle from '../../../utils/useWindowPointerToggle'

import { AlignLeft } from '@styled-icons/fluentui-system-regular/AlignLeft'
import { CenterVertical } from '@styled-icons/fluentui-system-regular/CenterVertical'
import { AlignRight } from '@styled-icons/fluentui-system-regular/AlignRight'
import { TextAlignJustify } from '@styled-icons/fluentui-system-regular/TextAlignJustify'
import { markTooltip } from '../basic-marks/Tooltip'
import React from 'react'

type AlignToolbarProps = {
  data: (AlignToolbarButtonProps & { name: string })[]
}

export const AlignToolbar = ({ data }: AlignToolbarProps) => {
  const { ref, toggle, handleToggleSet } = useWindowPointerToggle()
  const [selectName, setSelectName] = useState(data[0].name)
  const [height, setHeight] = useState(0)

  React.useEffect(() => {
    const height = ref.current?.getBoundingClientRect().height
    !!height && setHeight(height)
  }, [ref, toggle])

  return (
    <span className="mark_selector">
      {data.map(
        ({ name, ...otherProps }) =>
          selectName === name && (
            <AlignToolbarButton key={name} {...otherProps} />
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
        <span
          className="mark_selector-popup"
          ref={ref}
          style={{ top: -height - 10 }}
        >
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
