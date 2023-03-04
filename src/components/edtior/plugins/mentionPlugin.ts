import {
  MentionPlugin,
  KEYS_HEADING,
  ELEMENT_TABLE,
  ELEMENT_PARAGRAPH,
  getBlockAbove,
  isStartPoint,
  isElement,
  ELEMENT_DEFAULT,
  getParentNode,
} from '@udecode/plate'
import { MyPlatePlugin } from '../plateTypes'

export const mentionPlugin: Partial<MyPlatePlugin<MentionPlugin>> = {
  key: '/',
  options: {
    trigger: '/',
    query: (editor) => {
      // const blockPath = getBlockAbove(editor)?.[1]
      // const type = getBlockAbove(editor)?.[0]?.type
      // const parentType = getBlockAbove(editor, {
      //   at: blockPath?.slice(0, blockPath.length),
      // })?.[0].type

      // return (
      //   !!editor.selection &&
      //   !!blockPath &&
      //   isStartPoint(editor, editor.selection.anchor, blockPath) &&
      //   !parentType &&
      //   type === ELEMENT_DEFAULT
      // )

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
