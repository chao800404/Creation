import {
  MentionPlugin,
  KEYS_HEADING,
  ELEMENT_TABLE,
  ELEMENT_PARAGRAPH,
  getBlockAbove,
  isStartPoint,
} from '@udecode/plate'
import { MyPlatePlugin } from '../plateTypes'

export const mentionPlugin: Partial<MyPlatePlugin<MentionPlugin>> = {
  key: '/',
  options: {
    trigger: '/',
    query: (editor) => {
      const blockPath = getBlockAbove(editor)?.[1]
      return (
        !!editor.selection &&
        !!blockPath &&
        isStartPoint(editor, editor.selection.anchor, blockPath)
      )
    },
  },
  isElement: false,
}
