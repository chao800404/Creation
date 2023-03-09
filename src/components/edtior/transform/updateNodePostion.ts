import {
  findNode,
  findNodePath,
  focusEditor,
  getNodeParent,
  insertNodes,
  PlateEditor,
  removeNodes,
  TElement,
  Value,
  getEndPoint,
} from '@udecode/plate'
import { Path } from 'slate'
import { focusEditorElem } from '../imageListBlock'
import { MyImageItemElement, MyImageListElement } from '../plateTypes'

type UpdateNodePostionOption = {
  dragId: string
  hoverId: string
}

export const updateNodePostion = <V extends Value>(
  editor: PlateEditor<V>,
  { dragId, hoverId }: UpdateNodePostionOption
) => {
  const dragNode = findNode(editor, {
    at: [],
    match: { id: dragId },
  })
  const hoverNode = findNode(editor, {
    at: [],
    match: { id: hoverId },
  })
  if (dragNode && hoverNode && !Path.equals(dragNode[1], hoverNode[1])) {
    const parentNode = getNodeParent(editor, dragNode[1])
    const parentPath = findNodePath(editor, parentNode)

    console.log(dragNode[0], hoverNode[0])

    if (parentNode) {
      const children = parentNode.children.map((item) => {
        if (item.id === dragNode[0].id) {
          return hoverNode[0]
        } else if (item.id === hoverNode[0].id) {
          return dragNode[0]
        } else {
          return item
        }
      })

      removeNodes(editor, { at: parentPath })
      insertNodes<MyImageListElement>(
        editor,
        { ...parentNode, children } as MyImageListElement,
        {
          at: parentPath,
        }
      )
      focusEditorElem({ editor, path: getEndPoint(editor, dragNode[1]) })
    }
  }
}
