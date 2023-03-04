import { TElement } from '@udecode/plate'
import {
  getAboveNode,
  getBlockAbove,
  getPluginType,
  getStartPoint,
  insertNodes,
  PlateEditor,
  selectEditor,
  someNode,
  Value,
  withoutNormalizing,
} from '@udecode/plate-core'
import { ELEMENT_IMAGE_LIST_BLOCK } from '../index'
import {
  getEmptyImageListBlock,
  GetEmptyImageListBlockOption,
} from '../utils/getEmptyImageListBlock'
import { Location } from 'slate'

type TImageBlcokElement = TElement & GetEmptyImageListBlockOption

export const insertImageListBlock = <V extends Value>(
  editor: PlateEditor<V>,
  { quant = 3 }: GetEmptyImageListBlockOption
) => {
  withoutNormalizing(editor, () => {
    if (
      !someNode(editor, {
        match: { type: getPluginType(editor, ELEMENT_IMAGE_LIST_BLOCK) },
      })
    ) {
      const node = getAboveNode(editor)
      insertNodes<TImageBlcokElement>(
        editor,
        getEmptyImageListBlock(editor, { quant }),
        { at: node?.[1] }
      )
      selectEditor(editor, { at: getStartPoint(editor, node?.[1] as Location) })
    }
  })
}
