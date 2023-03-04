import { findNodePath, getStartPoint, TElement, Value } from '@udecode/plate'
import {
  getEndPoint,
  insertNodes,
  withoutNormalizing,
  getNextNode,
} from '@udecode/plate-core'
import { MyImageItemElement } from '../../plateTypes'
import { focusEditorElem } from '../utils/focusEditorElem'
import { getEmptyImageItemBlock } from '../utils/getEmptyImageItemBlock'
import { GetEmptyImageListBlockOption } from '../utils/getEmptyImageListBlock'
import { BaseImageOption } from './type'

type TImageBlcokElement = TElement & GetEmptyImageListBlockOption

export const insertImageItemBlock = <V extends Value>({
  editor,
  element,
}: BaseImageOption<V>) => {
  withoutNormalizing(editor, () => {
    const currentImageItemBlockPath = findNodePath(editor, element)
    if (currentImageItemBlockPath) {
      const newPath = [...currentImageItemBlockPath]
      const lastPos = newPath.pop()

      if (lastPos !== undefined) {
        newPath.push(lastPos + 1)
        insertNodes(editor, getEmptyImageItemBlock(editor), {
          at: newPath,
        })
        focusEditorElem({
          editor: editor,
          path: getStartPoint(editor, newPath),
        })
      }
    }
  })
}
