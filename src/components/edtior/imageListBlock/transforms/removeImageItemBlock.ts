import {
  removeNodes,
  findNodePath,
  getParentNode,
  getEndPoint,
  Value,
  getPreviousPath,
  getNextNode,
  getStartPoint,
} from '@udecode/plate'
import { focusEditorElem } from '../utils/focusEditorElem'
import { BaseImageOption } from './type'

export const removeImageItemBlock = <V extends Value>({
  editor,
  element,
}: BaseImageOption<V>) => {
  const currentImageItemBlockPath = findNodePath(editor, element)

  if (currentImageItemBlockPath) {
    const prePath = getPreviousPath(currentImageItemBlockPath)
    const nextNode = getNextNode(editor, { at: currentImageItemBlockPath })

    if (prePath || nextNode) {
      removeNodes(editor, { at: currentImageItemBlockPath })
      if (prePath)
        focusEditorElem({ editor, path: getStartPoint(editor, prePath) })
      else
        focusEditorElem({
          editor,
          path: getStartPoint(editor, currentImageItemBlockPath),
        })
    } else {
      const parent = getParentNode(editor, currentImageItemBlockPath)
      if (parent) {
        removeNodes(editor, { at: parent[1] })
        focusEditorElem({ editor, path: getStartPoint(editor, parent[1]) })
      }
    }
  }
}
