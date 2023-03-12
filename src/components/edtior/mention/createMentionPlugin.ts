import {
  isSelectionInMentionInput,
  mentionOnKeyDownHandler,
  MentionPlugin,
  withMention,
} from '@udecode/plate'
import { createPluginFactory } from '@udecode/plate-core'

export const ELEMENT_MENTION_SELECT = 'mention_select'
export const ELEMENT_MENTION_INPUT = 'mention_input'

/**
 * Enables support for autocompleting @mentions.
 */
export const createMentionSelectPlugin = createPluginFactory<MentionPlugin>({
  key: ELEMENT_MENTION_SELECT,
  isElement: true,
  isInline: true,
  isVoid: true,
  handlers: {
    onKeyDown: mentionOnKeyDownHandler({ query: isSelectionInMentionInput }),
  },
  withOverrides: withMention,
  options: {
    trigger: '@',
    createMentionNode: (item) => ({ value: item.text }),
  },
  plugins: [
    {
      key: ELEMENT_MENTION_INPUT,
      isElement: true,
      isInline: true,
    },
  ],
  then: (editor, { key }) => ({
    options: {
      id: key,
    },
  }),
})
