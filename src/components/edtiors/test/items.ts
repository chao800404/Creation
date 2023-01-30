import cuid from 'cuid'
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_PARAGRAPH,
  ELEMENT_TABLE,
  ELEMENT_TODO_LI,
  ELEMENT_IMAGE,
  ELEMENT_UL,
  ELEMENT_OL,
  ELEMENT_HR,
  setNodes,
  PlateEditor,
  Value,
} from '@udecode/plate'

import { createHeadingPlugin } from '@udecode/plate-heading'

const getSuggestionItems = [
  {
    text: 'Heading_1',
    key: ELEMENT_H1,
    data: {
      desc: 'Big section heading.',
      image: '/static/blocks/header.png',
    },

    // command: ({ editor, range }: CommandType) => {
    //   editor
    //     .chain()
    //     .focus()
    //     .deleteRange(range)
    //     .setNode('heading', { level: 1 })
    //     .run()
    // },
  },
  // {
  //   text: 'Expandable_header',
  //   key: '',
  //   data: {
  //     desc: 'Big section heading.',
  //     image: '/static/blocks/header.png',
  //   },

  //   // command: ({ editor, range }: CommandType) => {
  //   //   editor
  //   //     .chain()
  //   //     .focus()
  //   //     .deleteRange(range)
  //   //     .setNode('expandableHeader', { level: 1 })
  //   //     .run()
  //   // },
  // },
  {
    text: 'Heading_2',
    key: ELEMENT_H2,
    data: {
      desc: 'Medium section heading.',
      image: '/static/blocks/subheader.png',
    },

    // command: ({ editor, range }: CommandType) => {
    //   editor
    //     .chain()
    //     .focus()
    //     .deleteRange(range)
    //     .setNode('heading', { level: 2 })
    //     .run()
    // },
  },
  {
    text: 'Heading_3',
    key: ELEMENT_H3,
    data: {
      desc: 'Small section heading.',
      image: '/static/blocks/subsubheader.png',
    },

    // command: ({ editor, range }: CommandType) => {
    //   editor
    //     .chain()
    //     .focus()
    //     .deleteRange(range)
    //     .setNode('heading', { level: 3 })
    //     .run()
    // },
  },
  {
    text: 'Paragraph',
    key: ELEMENT_PARAGRAPH,
    data: {
      desc: 'Just start writing with plain text.',
      image: '/static/blocks/en-US.png',
    },

    // command: ({ editor, range }: CommandType) => {
    //   editor.chain().focus().deleteRange(range).setNode('paragraph').run()
    // },
  },
  {
    text: 'Table',
    key: ELEMENT_TABLE,
    data: {
      desc: 'Add simple a tabular content.',
      image: '/static/blocks/simple-table.png',
    },

    // command: ({ editor, range }: CommandType) => {
    //   editor
    //     .chain()
    //     .focus()
    //     .deleteRange(range)
    //     .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
    //     .run()
    // },
  },
  {
    text: 'To-do_list',
    key: ELEMENT_TODO_LI,
    data: {
      desc: 'Embed a sub-page inside the page.',
      image: '/static/blocks/to-do-list.png',
    },

    // command: ({ editor, range }: CommandType) => {
    //   editor.chain().focus().deleteRange(range).toggleTaskList().run()
    // },
  },
  {
    text: 'Bullested_list',
    key: ELEMENT_UL,
    data: {
      desc: 'Create a simple bulleted list.',
      image: '/static/blocks/bulleted-list.png',
    },

    // command: ({ editor, range }: CommandType) => {
    //   editor.chain().focus().deleteRange(range).toggleBulletList().run()
    // },
  },
  {
    text: 'Numbered_list',
    key: ELEMENT_OL,
    data: {
      desc: 'Create a list with numbering.',
      image: '/static/blocks/numbered-list.png',
    },

    // command: ({ editor, range }: CommandType) => {
    //   editor.chain().focus().deleteRange(range).toggleOrderedList().run()
    // },
  },
  // {
  //   text: 'Code',
  //   key: '',
  //   data: {
  //     desc: 'Capture a code snippet.',
  //     image: '/static/blocks/code.png',
  //   },

  //   // command: ({ editor, range }: CommandType) => {
  //   //   editor.chain().focus().deleteRange(range).setCodeBlock().run()
  //   // },
  // },
  // {
  //   text: 'Blockquote',
  //   key: '',
  //   data: {
  //     desc: 'Capture a quote.',
  //     image: '/static/blocks/block-quote.png',
  //   },

  //   // command: ({ editor, range }: CommandType) => {
  //   //   editor.chain().focus().deleteRange(range).toggleBlockquote().run()
  //   // },
  // },
  // {
  //   text: 'Link_button',
  //   key: '',
  //   data: {
  //     desc: 'Shortcut type(button).',
  //     image: '/static/blocks/link-button.png',
  //   },

  //   // command: ({ editor, range }: CommandType) => {
  //   //   editor
  //   //     .chain()
  //   //     .focus()
  //   //     .deleteRange(range)
  //   //     .setNode('linkButtonNode')
  //   //     .run()
  //   // },
  // },
  {
    text: 'Horizontal_divider',
    key: ELEMENT_HR,
    data: {
      desc: 'Shortcut:type enter(---)',
      image: '/static/blocks/horizontal-divider.png',
    },

    // command: ({ editor, range }: CommandType) => {
    //   editor.chain().focus().deleteRange(range).setHorizontalRule().run()
    // },
  },
  {
    text: 'Image',
    key: ELEMENT_IMAGE,
    data: {
      desc: 'Shortcut:type (image)',
      image: '/static/blocks/image.png',
    },

    // command: ({ editor, range }: CommandType) => {
    //   editor
    //     .chain()
    //     .focus()
    //     .deleteRange(range)
    //     .setImage({ src: '', alt: '' })
    //     .setNode('paragraph')
    //     .run()
    // },
  },
]

export default getSuggestionItems
