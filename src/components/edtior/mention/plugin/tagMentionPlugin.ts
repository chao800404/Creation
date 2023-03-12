import {
  MentionPlugin,
  getBlockAbove,
  isStartPoint,
  TComboboxItem,
  isEndPoint,
  getPluginType,
  isBlockAboveEmpty,
  ELEMENT_PARAGRAPH,
  ELEMENT_DEFAULT,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from '@udecode/plate'
import { ELEMENT_EH1, ELEMENT_EH2, ELEMENT_EH3 } from '../../eHeading-element'
import { MyPlatePlugin } from '../../plateTypes'
import { MentionElement } from '../mentionElement'

export const tagMentionPlugin: Partial<
  MyPlatePlugin<MentionPlugin<{ color: string }>>
> = {
  key: '#',
  component: MentionElement,
  isElement: true,
  options: {
    trigger: '#',
    createMentionNode: (item) => ({
      value: item.text,
      color: item.data.color,
    }),
    query: (editor) => {
      const focusBlock = getBlockAbove(editor)
      const isEmpty = isBlockAboveEmpty(editor)
      const type = focusBlock?.[0].type

      if (
        type === ELEMENT_PARAGRAPH ||
        type === ELEMENT_DEFAULT ||
        type === ELEMENT_H1 ||
        type === ELEMENT_H2 ||
        type === ELEMENT_H3 ||
        type === ELEMENT_H4 ||
        type === ELEMENT_H5 ||
        type === ELEMENT_H6 ||
        type === ELEMENT_EH1 ||
        type === ELEMENT_EH2 ||
        type === ELEMENT_EH3
      )
        return (
          !!editor.selection &&
          !!focusBlock &&
          !isEmpty &&
          isEndPoint(editor, editor.selection.anchor, focusBlock?.[1])
        )
      else return false
    },
  },
}
