import { VerticalAlignCenter } from '@styled-icons/material-outlined/VerticalAlignCenter'
import { VerticalAlignTop } from '@styled-icons/material-outlined/VerticalAlignTop'
import { VerticalAlignBottom } from '@styled-icons/material-outlined/VerticalAlignBottom'
import { CenterVertical } from '@styled-icons/fluentui-system-regular/CenterVertical'
import { AlignRight } from '@styled-icons/fluentui-system-regular/AlignRight'
import { AlignLeft } from '@styled-icons/fluentui-system-regular/AlignLeft'
import { Align, Vertical } from './type'

export const VirticalBtn = [
  {
    name: 'top' as Vertical,
    icon: <VerticalAlignTop />,
  },
  {
    name: 'center' as Vertical,
    icon: <VerticalAlignCenter />,
  },
  {
    name: 'bottom' as Vertical,
    icon: <VerticalAlignBottom />,
  },
]

export const AlignBtn = [
  {
    name: 'left' as Align,
    icon: <AlignLeft />,
  },
  {
    name: 'center' as Align,
    icon: <CenterVertical />,
  },
  {
    name: 'right' as Align,
    icon: <AlignRight />,
  },
]
