import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_PARAGRAPH,
  withPlaceholders,
} from '@udecode/plate'
import { ELEMENT_DESC } from '../desc'
import { ELEMENT_EH1, ELEMENT_EH2, ELEMENT_EH3 } from '../eHeading-element'

export const withStyledPlaceHolders = (components: unknown) => {
  return withPlaceholders(components, [
    {
      key: ELEMENT_PARAGRAPH,
      placeholder: 'Type "/" for commands',
      hideOnBlur: true,
    },
    {
      key: ELEMENT_H1,
      placeholder: 'Heading-1',
      hideOnBlur: true,
    },
    {
      key: ELEMENT_H2,
      placeholder: 'Heading-2',
      hideOnBlur: true,
    },
    {
      key: ELEMENT_H3,
      placeholder: 'Heading-3',
      hideOnBlur: true,
    },
    {
      key: ELEMENT_EH1,
      placeholder: 'Title',
      hideOnBlur: false,
    },
    {
      key: ELEMENT_EH2,
      placeholder: 'Title',
      hideOnBlur: false,
    },
    {
      key: ELEMENT_EH3,
      placeholder: 'Title',
      hideOnBlur: false,
    },
    {
      key: ELEMENT_DESC,
      placeholder: 'Content',
      hideOnBlur: false,
    },
  ])
}
