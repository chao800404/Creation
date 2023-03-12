import { Images } from '@styled-icons/bootstrap/Images'
import { VerticalAlignCenter } from '@styled-icons/material-outlined/VerticalAlignCenter'
import { VerticalAlignTop } from '@styled-icons/material-outlined/VerticalAlignTop'
import { VerticalAlignBottom } from '@styled-icons/material-outlined/VerticalAlignBottom'
import { CenterVertical } from '@styled-icons/fluentui-system-regular/CenterVertical'
import { AlignRight } from '@styled-icons/fluentui-system-regular/AlignRight'
import { AlignLeft } from '@styled-icons/fluentui-system-regular/AlignLeft'
import { DeleteLines } from '@styled-icons/fluentui-system-regular/DeleteLines'
import { CloudDownload } from '@styled-icons/boxicons-solid/CloudDownload'
import {
  PlateEditor,
  removeNodes,
  setNodes,
  TImageElement,
  Value,
} from '@udecode/plate'
import { StyledIcon } from '@styled-icons/styled-icon'
import { Path } from 'slate'
import saveAs from 'file-saver'
import { string } from 'zod'

export type PathType = { path?: Path; url?: string }

export type ImageControllerItem = {
  name: string
  icon: StyledIcon
  pos?: string
  command: <P extends PathType>(editor: PlateEditor<Value>, props: P) => void
}

export const IMAGE_CONTROLLER_ITEMS: ImageControllerItem[] = [
  {
    name: 'reset',
    icon: Images,
    command: (editor, { path }) =>
      setNodes<TImageElement>(
        editor,
        { url: null, version: null, align: null, width: '100%' },
        { at: path }
      ),
  },
  {
    name: 'vertical_top',
    pos: 'top',
    icon: VerticalAlignTop,
    command: (editor, { path }) =>
      setNodes<TImageElement>(editor, { vertical: 'top' }, { at: path }),
  },
  {
    name: 'vertical_center',
    pos: 'center',
    icon: VerticalAlignCenter,
    command: (editor, { path }) =>
      setNodes<TImageElement>(editor, { vertical: 'center' }, { at: path }),
  },
  {
    name: 'vertical_bottom',
    pos: 'bottom',
    icon: VerticalAlignBottom,
    command: (editor, { path }) =>
      setNodes<TImageElement>(editor, { vertical: 'bottom' }, { at: path }),
  },
  {
    name: 'align_left',
    pos: 'left',
    icon: AlignLeft,
    command: (editor, { path }) =>
      setNodes<TImageElement>(editor, { align: 'left' }, { at: path }),
  },
  {
    name: 'align_center',
    pos: 'center',
    icon: CenterVertical,
    command: (editor, { path }) =>
      setNodes<TImageElement>(editor, { align: 'center' }, { at: path }),
  },
  {
    name: 'align_right',
    pos: 'right',
    icon: AlignRight,
    command: (editor, { path }) =>
      setNodes<TImageElement>(editor, { align: 'right' }, { at: path }),
  },
  {
    name: 'download',
    icon: CloudDownload,
    command: (editor, { url }) => url && saveAs(url, 'image.jpg'),
  },
  {
    name: 'delete',
    icon: DeleteLines,
    command: (editor, { path }) => removeNodes(editor, { at: path }),
  },
]
