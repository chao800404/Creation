import { ELEMENT_DESC } from './../../desc/descPlugin'
import { PlateEditor, Value } from '@udecode/plate-core'
import {
  ELEMENT_EXPANDABLE_HEADING_1,
  ELEMENT_EXPANDABLE_HEADING_2,
  ELEMENT_EXPANDABLE_HEADING_3,
} from '../createExpandableHeadingPlugin'
import { ELEMENT_PARAGRAPH, HeadingsPlugin } from '@udecode/plate'
import { createEHeading } from '../../eHeading-element'

export const getEmptyExpandableHeading = <V extends Value>(
  editor: PlateEditor<V>,
  { levels }: HeadingsPlugin
) => {
  let type

  switch (levels) {
    case 1:
      type = ELEMENT_EXPANDABLE_HEADING_1
      break
    case 2:
      type = ELEMENT_EXPANDABLE_HEADING_2
      break
    case 3:
      type = ELEMENT_EXPANDABLE_HEADING_3
      break
    default:
      type = ELEMENT_EXPANDABLE_HEADING_3
      break
  }

  return {
    type,
    children: [
      createEHeading(editor, { levels }),
      editor.blockFactory({ type: ELEMENT_PARAGRAPH }),
    ],
    show: true,
  }
}
