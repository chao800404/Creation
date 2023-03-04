import {
  ELEMENT_PARAGRAPH,
  ExitBreakPlugin,
  KEYS_HEADING,
} from '@udecode/plate'

import { ELEMENT_LINK_BUTTON } from '../linkButton'
import { MyPlatePlugin } from '../plateTypes'

export const exitBreakPlugin: Partial<MyPlatePlugin<ExitBreakPlugin>> = {
  options: {
    rules: [
      {
        hotkey: 'mod+enter',
      },
      {
        hotkey: 'mod+shift+enter',
        before: true,
      },
      {
        hotkey: 'enter',
        query: {
          start: true,
          end: true,
          allow: [...KEYS_HEADING, ELEMENT_LINK_BUTTON],
        },
        level: 1,
        defaultType: ELEMENT_PARAGRAPH,
        relative: true,
      },
    ],
  },
}
