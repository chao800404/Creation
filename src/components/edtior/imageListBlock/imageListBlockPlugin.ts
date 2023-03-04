import { createPluginFactory } from '@udecode/plate-core'
import { ELEMENT_DESC } from '../desc'
import { ELEMENT_EH3 } from '../eHeading-element'

import { withForcedTitleLayout } from '../withWrapper'
import { handleOnKeydown } from './utils/handleOnKeydown'

export const ELEMENT_IMAGE_LIST_BLOCK = 'image_list_block'
export const ELEMENT_IMAGE_ITEM_BLOCK = 'image_item_block'

export const createImageListBlockPlugin = createPluginFactory({
  key: ELEMENT_IMAGE_LIST_BLOCK,
  isElement: true,
  deserializeHtml: {
    rules: [{ validNodeName: 'IMAGE_LIST_BLOCK' }],
  },
  handlers: {
    onKeyDown: handleOnKeydown,
  },
  plugins: [
    {
      key: ELEMENT_IMAGE_ITEM_BLOCK,
      isElement: true,
      deserializeHtml: {
        rules: [
          {
            validNodeName: 'IMAGE_ITEM_BLOCK',
          },
        ],
      },
      options: {
        rules: [{ strictType: ELEMENT_EH3 }, { strictType: ELEMENT_DESC }],
      },
      withOverrides: withForcedTitleLayout,
    },
  ],
})
