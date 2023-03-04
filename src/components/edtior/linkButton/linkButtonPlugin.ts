import { createPluginFactory } from '@udecode/plate'

import { LinkItems } from '../../../data/LinkButtonItems'
// export declare const ELEMENT_LINK_BUTTON = 'link_button'

export const ELEMENT_LINK_BUTTON = 'link_button'

export const createLinkButton = createPluginFactory({
  key: ELEMENT_LINK_BUTTON,
  isElement: true,
  isLeaf: true,
  options: {
    hotkey: ['mod+opt+0', 'mod+shift+0'],
  },
  then: (editor) => ({
    props: {
      list: LinkItems,
    },
  }),
})
