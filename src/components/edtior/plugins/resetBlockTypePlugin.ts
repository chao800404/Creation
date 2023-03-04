import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_DEFAULT,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_PARAGRAPH,
  ELEMENT_TODO_LI,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  ResetNodePlugin,
} from '@udecode/plate'
import { ELEMENT_DESC } from '../desc'
import { MyPlatePlugin } from '../plateTypes'
import { ELEMENT_EH1, ELEMENT_EH2, ELEMENT_EH3 } from '../eHeading-element'
import { ELEMENT_LINK_BUTTON } from '../linkButton'

const resetBlockTypesCommonRule = {
  types: [
    ELEMENT_TODO_LI,
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_H3,
    ELEMENT_H4,
    ELEMENT_H5,
    ELEMENT_H6,
    ELEMENT_BLOCKQUOTE,
    ELEMENT_EH1,
    ELEMENT_EH2,
    ELEMENT_EH3,
    ELEMENT_LINK_BUTTON,
  ],
  defaultType: ELEMENT_DEFAULT,
}

export const resetBlockTypePlugin: Partial<MyPlatePlugin<ResetNodePlugin>> = {
  options: {
    rules: [
      {
        ...resetBlockTypesCommonRule,
        hotkey: 'Enter',
        predicate: isBlockAboveEmpty,
      },
      {
        ...resetBlockTypesCommonRule,
        hotkey: 'Backspace',
        predicate: isSelectionAtBlockStart,
      },
    ],
  },
}
