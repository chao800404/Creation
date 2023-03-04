import { ELEMENT_IMAGE_ITEM_BLOCK } from '../imageListBlock/imageListBlockPlugin'
import {
  ELEMENT_PARAGRAPH,
  insertText,
  NormalizeTypesPlugin,
} from '@udecode/plate'
import {
  insertElements,
  PlateEditor,
  setElements,
  Value,
  WithPlatePlugin,
  getAboveNode,
} from '@udecode/plate-core'

export const withForcedTitleLayout = <
  V extends Value = Value,
  E extends PlateEditor<V> = PlateEditor<V>
>(
  editor: E,
  {
    options: { rules, onError },
    props,
    key,
  }: WithPlatePlugin<NormalizeTypesPlugin, V, E>
) => {
  const { normalizeNode } = editor

  editor.normalizeNode = ([currentNode, currentPath]) => {
    if (!currentPath.length && rules) {
      const imgBlockNode = getAboveNode(editor, {
        match: { type: key },
      })

      if (imgBlockNode) {
        const imgBlock = imgBlockNode[0]
        const path = imgBlockNode[1]
        const headNode = imgBlock.children[0]
        const pNode = imgBlock.children[1]

        if (headNode.type !== rules[0].strictType) {
          setElements(
            editor,
            { type: rules[0].strictType },
            { at: [...path, 0] }
          )
        } else if (!pNode && rules[1].strictType) {
          insertElements(
            editor,
            { type: rules[1].strictType, children: [{ text: '' }] },
            { at: [...path, 1] }
          )
        }
      }
    }

    return normalizeNode([currentNode, currentPath])
  }

  return editor
}
