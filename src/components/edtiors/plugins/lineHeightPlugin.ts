import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_PARAGRAPH,
  StyledElement,
  withProps,
} from '@udecode/plate'
import { css } from 'styled-components'
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
      ],
    },
  },
}
