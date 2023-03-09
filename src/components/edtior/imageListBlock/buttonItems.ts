import { ImageAdd } from '@styled-icons/boxicons-regular/ImageAdd'
import { DeleteLines } from '@styled-icons/fluentui-system-regular/DeleteLines'
import { InsertColumnRight } from '@styled-icons/remix-editor/InsertColumnRight'
import { StyledIcon } from '@styled-icons/styled-icon'
import { addImageUrl } from './transforms/addImageUrl'
import { resetImageUrl } from './transforms/resetImageUrl'
import { insertImageItemBlock } from './transforms/insertImageItemBlock'
import { removeImageItemBlock } from './transforms/removeImageItemBlock'
import { BaseImageOption } from './transforms/type'
import { CloudDownload } from '@styled-icons/boxicons-solid/CloudDownload'
import { TElement, Value } from '@udecode/plate'
import { Reset } from '@styled-icons/boxicons-regular/Reset'

export type ImageItemBtnProps = {
  icon: StyledIcon
  desc?: string
  className?: string
  content?: () => React.ReactNode
  format?: <V extends Value>(
    option: BaseImageOption<V>,
    element?: TElement
  ) => void
}

export const BUTTON_ITEMS: ImageItemBtnProps[] = [
  {
    icon: ImageAdd,
    desc: 'Add an image',
    className: 'add',
    format: addImageUrl,
  },
  {
    icon: DeleteLines,
    desc: 'Delete Item',
    className: 'delete',
    format: removeImageItemBlock,
  },
  {
    icon: InsertColumnRight,
    desc: 'Insert Item',
    className: 'insert',
    format: insertImageItemBlock,
  },
]

export const BUTTON_HASURL_ITEMS: ImageItemBtnProps[] = [
  {
    icon: Reset,
    desc: 'Reset Item',
    className: 'add',
    format: resetImageUrl,
  },
  {
    icon: DeleteLines,
    desc: 'Delete Item',
    className: 'delete',
    format: removeImageItemBlock,
  },
  {
    icon: InsertColumnRight,
    desc: 'Insert Item',
    className: 'insert',
    format: insertImageItemBlock,
  },
  {
    icon: CloudDownload,
    desc: 'Download',
    className: 'download',
  },
]
