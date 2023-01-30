import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_PARAGRAPH,
  useEditorRef,
  usePlateEditorRef,
  withPlaceholders,
} from '@udecode/plate'

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
  ])
}
