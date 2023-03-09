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
  setElements,
  TEditor,
  ELEMENT_CODE_BLOCK,
  getPreventDefaultHandler,
  insertTable,
  insertNodes,
  insertEmptyCodeBlock,
  getPluginType,
  ELEMENT_DEFAULT,
  insertTableColumn,
  insertTableRow,
  getBlockAbove,
  ELEMENT_TR,
  TTableElement,
  removeNodes,
  getAboveNode,
  insertEmptyElement,
  insertElements,
} from '@udecode/plate'
import { ELEMENT_LINK_BUTTON } from '../linkButton'
import { ELEMENT_IMAGE_LIST_BLOCK } from '../imageListBlock'
import { insertImageListBlock } from '../imageListBlock/transforms/insertImageListBlock'
import {
  ELEMENT_EXPANDABLE_HEADING_1,
  ELEMENT_EXPANDABLE_HEADING_2,
  ELEMENT_EXPANDABLE_HEADING_3,
} from '../expandableHeading'
import { setExpandableHeading } from '../expandableHeading/transforms'

export type SuggestionItem = {
  text: string
  key: string
  data: {
    desc: string
    image: string
  }
  command: <V extends Value>(editor: PlateEditor<V>) => void
}

const getSuggestionItems: SuggestionItem[] = [
  {
    text: 'Heading_1',
    key: ELEMENT_H1,
    data: {
      desc: 'Big section heading.',
      image: '/static/blocks/header.png',
    },
    command: (editor) => setElements(editor, { type: ELEMENT_H1 }),
  },
  {
    text: 'Expandable_header',
    key: ELEMENT_EXPANDABLE_HEADING_1,
    data: {
      desc: 'Shortcut type(button).',
      image: '/static/blocks/toggle_heading_1.png',
    },
    command: (editor) => {
      setExpandableHeading(editor, { levels: 1 })
    },
  },
  {
    text: 'Heading_2',
    key: ELEMENT_H2,
    data: {
      desc: 'Medium section heading.',
      image: '/static/blocks/subheader.png',
    },
    command: (editor) => setElements(editor, { type: ELEMENT_H2 }),
  },
  {
    text: 'Expandable_header',
    key: ELEMENT_EXPANDABLE_HEADING_2,
    data: {
      desc: 'Shortcut type(button).',
      image: '/static/blocks/toggle_heading_2.png',
    },
    command: (editor) => {
      setExpandableHeading(editor, { levels: 2 })
    },
  },
  {
    text: 'Heading_3',
    key: ELEMENT_H3,
    data: {
      desc: 'Small section heading.',
      image: '/static/blocks/subsubheader.png',
    },
    command: (editor) => setElements(editor, { type: ELEMENT_H3 }),
  },
  {
    text: 'Expandable_header',
    key: ELEMENT_EXPANDABLE_HEADING_3,
    data: {
      desc: 'Shortcut type(button).',
      image: '/static/blocks/toggle_heading_3.png',
    },
    command: (editor) => {
      setExpandableHeading(editor, { levels: 3 })
    },
  },
  {
    text: 'Paragraph',
    key: ELEMENT_PARAGRAPH,
    data: {
      desc: 'Just start writing with plain text.',
      image: '/static/blocks/en-US.png',
    },
    command: (editor) => setElements(editor, { type: ELEMENT_PARAGRAPH }),
  },
  {
    text: 'Table',
    key: ELEMENT_TABLE,
    data: {
      desc: 'Add simple a tabular content.',
      image: '/static/blocks/simple-table.png',
    },
    command: (editor) => {
      // editor.insertTable(3, 3, { columnWidth: 200, maxWidth: 500 })
      insertTable(editor, { colCount: 3, rowCount: 3 })
    },
  },
  {
    text: 'To-do_list',
    key: ELEMENT_TODO_LI,
    data: {
      desc: 'Embed a sub-page inside the page.',
      image: '/static/blocks/to-do-list.png',
    },
    command: (editor) => setElements(editor, { type: ELEMENT_TODO_LI }),
  },
  {
    text: 'Bullested_list',
    key: ELEMENT_UL,
    data: {
      desc: 'Create a simple bulleted list.',
      image: '/static/blocks/bulleted-list.png',
    },
    command: (editor) => setElements(editor, { type: ELEMENT_UL }),
  },
  {
    text: 'Numbered_list',
    key: ELEMENT_OL,
    data: {
      desc: 'Create a list with numbering.',
      image: '/static/blocks/numbered-list.png',
    },
    command: (editor) => setElements(editor, { type: ELEMENT_OL }),
  },
  {
    text: 'Code_Block',
    key: ELEMENT_CODE_BLOCK,
    data: {
      desc: 'Capture a code snippet.',
      image: '/static/blocks/code.png',
    },
    command: (editor) => {
      insertEmptyCodeBlock(editor, {
        defaultType: getPluginType(editor, ELEMENT_DEFAULT),
        insertNodesOptions: { select: true },
      })
    },
  },
  // {
  //   text: 'Blockquote',
  //   key: '',
  //   data: {
  //     desc: 'Capture a quote.',
  //     image: '/static/blocks/block-quote.png',
  //   },

  {
    text: 'Horizontal_divider',
    key: ELEMENT_HR,
    data: {
      desc: 'Shortcut:type enter(---)',
      image: '/static/blocks/horizontal-divider.png',
    },
    command: (editor) => {
      insertElements(editor, [
        {
          type: ELEMENT_HR,
          children: [{ text: '' }],
        },
        { type: ELEMENT_PARAGRAPH, children: [{ text: '' }] },
      ])
    },
  },
  {
    text: 'Image',
    key: ELEMENT_IMAGE,
    data: {
      desc: 'Shortcut:type (image)',
      image: '/static/blocks/image.png',
    },
    command: (editor) => {
      setElements(editor, { type: ELEMENT_IMAGE })
    },
  },
  {
    text: 'Link_button',
    key: ELEMENT_LINK_BUTTON,
    data: {
      desc: 'Shortcut type(button).',
      image: '/static/blocks/link-button.png',
    },
    command: (editor) => {
      setElements(editor, { type: ELEMENT_LINK_BUTTON })
    },
  },
  {
    text: 'Image_List_block',
    key: ELEMENT_IMAGE_LIST_BLOCK,
    data: {
      desc: 'Shortcut type(button).',
      image: '/static/blocks/image-list-block.png',
    },
    command: (editor) => {
      insertImageListBlock(editor, { quant: 4 })
    },
  },
]

export default getSuggestionItems
