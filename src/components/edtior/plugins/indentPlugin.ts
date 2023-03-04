import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_PARAGRAPH,
  IndentPlugin,
  setIndent,
} from '@udecode/plate'
import { MyPlatePlugin, MyValue } from '../plateTypes'
import {
  Hotkeys,
  KeyboardHandlerReturnType,
  PlateEditor,
  getAboveNode,
  isSelectionAtBlockStart,
} from '@udecode/plate-core'
import { ELEMENT_DESC } from '../desc'

const onKeyDownIndent =
  <E extends PlateEditor<MyValue>>(editor: E): KeyboardHandlerReturnType =>
  (e) => {
    if (e.key === 'Backspace') {
      const isSelectStart = isSelectionAtBlockStart(editor)
      const node = getAboveNode(editor)
      if (isSelectStart && node && node[0].indent) {
        e.preventDefault()
        setIndent(editor, { offset: -1 })
      }
    }
    if (Hotkeys.isTab(editor, e)) {
      e.preventDefault()
      setIndent(editor, { offset: 1 })
    }

    if (Hotkeys.isUntab(editor, e)) {
      e.preventDefault()
      setIndent(editor, { offset: -1 })
    }
  }

export const indentPlugin: Partial<MyPlatePlugin<IndentPlugin>> = {
  inject: {
    props: {
      validTypes: [
        ELEMENT_PARAGRAPH,
        ELEMENT_H1,
        ELEMENT_H2,
        ELEMENT_H3,
        ELEMENT_H4,
        ELEMENT_H5,
        ELEMENT_H6,
        ELEMENT_BLOCKQUOTE,
        ELEMENT_CODE_BLOCK,
        ELEMENT_DESC,
      ],
    },
  },
  options: {
    indentMax: 1,
  },
  handlers: {
    onKeyDown: onKeyDownIndent,
  },
}
