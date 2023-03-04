import {
  findNodePath,
  getPluginType,
  HeadingsPlugin,
  insertElements,
  PlateEditor,
  selectEditor,
  someNode,
  TElement,
  Value,
} from '@udecode/plate'
import {
  getAboveNode,
  getEndPoint,
  insertNodes,
  setElements,
  withoutNormalizing,
} from '@udecode/plate-core'
import { focusEditorElem } from '../../imageListBlock'
import { MyImageItemElement } from '../../plateTypes'
import {
  ELEMENT_EXPANDABLE_HEADING_1,
  ELEMENT_EXPANDABLE_HEADING_2,
  ELEMENT_EXPANDABLE_HEADING_3,
} from '../createExpandableHeadingPlugin'
import { getEmptyExpandableHeading } from '../utils/getEmptyExpandableHeading'

export const setExpandableHeading = <V extends Value>(
  editor: PlateEditor<V>,
  { levels }: HeadingsPlugin
) => {
  withoutNormalizing(editor, () => {
    if (
      !someNode(editor, {
        match: {
          type: [
            getPluginType(editor, ELEMENT_EXPANDABLE_HEADING_1),
            getPluginType(editor, ELEMENT_EXPANDABLE_HEADING_2),
            getPluginType(editor, ELEMENT_EXPANDABLE_HEADING_3),
          ],
        },
      })
    ) {
      const node = getAboveNode(editor)

      if (node) {
        insertElements(editor, getEmptyExpandableHeading(editor, { levels }), {
          at: node[1],
        })

        selectEditor(editor, { at: { path: [...node[1], 0, 0], offset: 0 } })
      }
    }
  })
}
