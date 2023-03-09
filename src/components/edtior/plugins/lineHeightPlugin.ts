import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_PARAGRAPH,
  ELEMENT_TODO_LI,
} from '@udecode/plate'
import { ELEMENT_DESC } from '../desc'
import { MyPlatePlugin } from '../plateTypes'

export const lineHeightPlugin: Partial<MyPlatePlugin> = {
  inject: {
    props: {
      defaultNodeValue: 1,
      validNodeValues: [1, 1.2, 1.5, 2, 3],
      validTypes: [
        ELEMENT_PARAGRAPH,
        ELEMENT_H1,
        ELEMENT_H2,
        ELEMENT_H3,
        ELEMENT_H4,
        ELEMENT_H5,
        ELEMENT_H6,
        ELEMENT_DESC,
        ELEMENT_TODO_LI,
        ELEMENT_BLOCKQUOTE,
      ],
    },
  },
}
