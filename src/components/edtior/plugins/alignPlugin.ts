import { ELEMENT_DESC } from './../desc/descPlugin'
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_PARAGRAPH,
  ELEMENT_TODO_LI,
} from '@udecode/plate'
import { MyPlatePlugin } from '../plateTypes'
import { ELEMENT_LINK_BUTTON } from '../linkButton'

export const alignPlugin: Partial<MyPlatePlugin> = {
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
        ELEMENT_LINK_BUTTON,
        ELEMENT_DESC,
        ELEMENT_TODO_LI,
      ],
    },
  },
}
