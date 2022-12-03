import Paragraph from '@tiptap/extension-paragraph'
import History from '@tiptap/extension-history'
import Blockquote from '@tiptap/extension-blockquote'
import Strike from '@tiptap/extension-strike'
import Italic from '@tiptap/extension-italic'
import Code from '@tiptap/extension-code'
import Bold from '@tiptap/extension-bold'
import Color from '@tiptap/extension-color'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import Heading from '@tiptap/extension-heading'
import Placeholder from '@tiptap/extension-placeholder'
import HardBreak from '@tiptap/extension-hard-break'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import Gapcursor from '@tiptap/extension-gapcursor'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'

import hljs from 'highlight.js'
import { lowlight } from 'lowlight'
import { BLOCK_SELECTOR } from '../utils/config'
import { Editor, ReactNodeViewRenderer } from '@tiptap/react'
import { ImBold, ImStrikethrough, ImUnderline } from 'react-icons/im'
import { GoItalic } from 'react-icons/go'
import { HiOutlineCode } from 'react-icons/hi'
import {
  TbBlockquote,
  TbColumnInsertLeft,
  TbColumnInsertRight,
  TbRowInsertBottom,
  TbRowInsertTop,
} from 'react-icons/tb'
import { BiColumns, BiTrash } from 'react-icons/bi'
import { RiLayoutColumnFill } from 'react-icons/ri'
import {
  MdInvertColors,
  MdInvertColorsOff,
  MdOutlineDeleteForever,
} from 'react-icons/md'
import {
  AiOutlineInsertRowAbove,
  AiOutlineInsertRowLeft,
  AiOutlineMergeCells,
  AiOutlineTable,
} from 'react-icons/ai'
import { BsTvFill } from 'react-icons/bs'
import { chain } from 'lodash'

const basicBlockFeature = [
  Document,
  Blockquote,
  Strike,
  Italic,
  Code,
  Bold,
  Color,
  TextStyle,
  Underline,
  Text,
  History.configure({ depth: 10 }),
]

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)

export const textBlockFeature = (name: string, id: string) => [
  ...basicBlockFeature,
  Paragraph.configure({
    HTMLAttributes: {
      ['data-type']: 'block-content',
      id,
      tabIndex: 0,
    },
  }),
  Placeholder.configure({
    placeholder: `${name}`,
  }),
]

export const headingBlockFeature = (name: string, id: string) => [
  ...basicBlockFeature,
  Paragraph,
  Placeholder.configure({
    placeholder: `${name}`,
  }),
  Heading.configure({
    levels: [1, 2, 3],
    HTMLAttributes: {
      ['data-type-name']: 'block-content',
      id,
      tabIndex: 0,
    },
  }),
]

export const todoListBlockFeature = (id: string) => [
  ...basicBlockFeature,
  Paragraph,
  TaskList.configure({
    HTMLAttributes: {
      ['data-type-name']: 'block-content',
      id,
      tabIndex: 0,
    },
  }),
  TaskItem.configure({
    nested: true,
  }),
]

export const listBlockFeature = (id: string) => [
  ...basicBlockFeature,
  Paragraph,
  BulletList,
  OrderedList.configure({
    HTMLAttributes: {
      ['data-type-name']: 'block-content',
      id,
      tabIndex: 0,
    },
  }),
  ListItem.configure({
    HTMLAttributes: {
      ['data-type-name']: 'block-content',
      id,
      tabIndex: 0,
    },
  }),
  ,
]

export const tableBlockFeature = [
  ...basicBlockFeature,
  Paragraph,
  Gapcursor,
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
]

export const codeBlockFeature = (id: string) => [Document, Paragraph, Text]

export const blockTypeSelector = (name: string, id: string) => {
  switch (name) {
    case BLOCK_SELECTOR[3].name:
      return {
        feature: textBlockFeature(name, id),
        initContent: '<p></p>',
      }
    case BLOCK_SELECTOR[0].name:
      return {
        feature: headingBlockFeature(name, id),
        initContent: '<h1></h1>',
      }
    case BLOCK_SELECTOR[1].name:
      return {
        feature: headingBlockFeature(name, id),
        initContent: '<h2></h2>',
      }
    case BLOCK_SELECTOR[2].name:
      return {
        feature: headingBlockFeature(name, id),
        initContent: '<h3></h3>',
      }
    case BLOCK_SELECTOR[4].name:
      return {
        feature: headingBlockFeature(name, id),
        initContent: `
        <table>
          <tbody>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
      </table>
        `,
      }
    case BLOCK_SELECTOR[5].name:
      return {
        feature: todoListBlockFeature(id),
        initContent: `<ul data-type="taskList">
        <li data-type="taskItem" data-checked="true"></li>
        <ul>`,
      }
    case BLOCK_SELECTOR[6].name:
      return {
        feature: listBlockFeature(id),
        initContent: '<ul><li></li></ul>',
      }
    case BLOCK_SELECTOR[7].name:
      return {
        feature: listBlockFeature(id),
        initContent: '<ol><li></li></ol>',
      }
    case BLOCK_SELECTOR[8].name:
      return {
        feature: codeBlockFeature(id),
        initContent: '<pre><code class="language-html"></code></pre>',
      }
    default:
      return {
        feature: listBlockFeature(id),
        initContent: '',
      }
  }
}

export const TextPopupBtns = (editor: Editor) => ({
  bold: {
    name: 'bold',
    onClick: () => editor.chain().focus().toggleBold().run(),
    disabled: !editor.can().chain().focus().toggleBold().run(),
    className: editor.isActive('bold') ? 'is-active' : '',
    icon: ImBold,
  },
  italic: {
    name: 'italic',
    onClick: () => editor.chain().focus().toggleItalic().run(),
    disabled: !editor.can().chain().focus().toggleItalic().run(),
    className: editor.isActive('italic') ? 'is-active' : '',
    icon: GoItalic,
  },
  underline: {
    name: 'underline',
    onClick: () => editor.chain().focus().toggleUnderline().run(),
    disabled: !editor.can().chain().focus().toggleUnderline().run(),
    className: editor.isActive('underline') ? 'is-active' : '',
    icon: ImUnderline,
  },
  strike: {
    name: 'strike',
    onClick: () => editor.chain().focus().toggleStrike().run(),
    disabled: !editor.can().chain().focus().toggleStrike().run(),
    className: editor.isActive('strike') ? 'is-active' : '',
    icon: ImStrikethrough,
  },
  code: {
    name: 'code',
    onClick: () => editor.chain().focus().toggleCode().run(),
    disabled: !editor.can().chain().focus().toggleCode().run(),
    className: editor.isActive('code') ? 'is-active' : '',
    icon: HiOutlineCode,
  },
  blockquote: {
    name: 'blockquote',
    onClick: () => editor.chain().focus().toggleBlockquote().run(),
    disabled: !editor.can().chain().focus().toggleBlockquote().run(),
    className: editor.isActive('blockquote') ? 'is-active' : '',
    icon: TbBlockquote,
  },
})

export const TableBlockBtns = (editor: Editor) => ({
  toggleHeaderColumn: {
    desc: 'Toggle_header_column',
    onClick: () => editor.chain().focus().toggleHeaderColumn().run(),
    disabled: !editor.can().toggleHeaderColumn(),
    icon: RiLayoutColumnFill,
  },
  toggleHeaderRow: {
    desc: 'Toggle_header_row',
    onClick: () => editor.chain().focus().toggleHeaderRow().run(),
    disabled: !editor.can().toggleHeaderRow(),
    icon: BiColumns,
  },
  toggleHeaderCell: {
    desc: 'Toggle_header_cell',
    onClick: () => editor.chain().focus().toggleHeaderCell().run(),
    disabled: !editor.can().toggleHeaderCell(),
    icon: !editor.can().toggleHeaderCell().valueOf()
      ? MdInvertColorsOff
      : MdInvertColors,
  },
  addColumnBefore: {
    desc: 'Add_column_before',
    onClick: () => editor.chain().focus().addColumnBefore().run(),
    disabled: !editor.can().addColumnBefore(),
    icon: TbColumnInsertLeft,
  },
  addColumnAfter: {
    desc: 'Add_column_after',
    onClick: () => editor.chain().focus().addColumnAfter().run(),
    disabled: !editor.can().addColumnAfter(),
    icon: TbColumnInsertRight,
  },
  addRowBefore: {
    desc: 'Add_row_before',
    onClick: () => editor.chain().focus().addRowBefore().run(),
    disabled: !editor.can().addRowBefore(),
    icon: TbRowInsertTop,
  },
  addRowAfter: {
    desc: 'Add_row_after',
    onClick: () => editor.chain().focus().addRowAfter().run(),
    disabled: !editor.can().addRowAfter(),
    icon: TbRowInsertBottom,
  },
  mergeOrSplit: {
    desc: 'MergeOrSplit',
    onClick: () => editor.chain().focus().mergeOrSplit().run(),
    disabled: !editor.can().mergeCells(),
    icon: AiOutlineMergeCells,
  },
  deleteColumn: {
    desc: 'Delete_column',
    onClick: () => editor.chain().focus().deleteColumn().run(),
    disabled: !editor.can().deleteColumn(),
    icon: AiOutlineInsertRowLeft,
  },
  deleteRow: {
    desc: 'Delete_row',
    onClick: () => editor.chain().focus().deleteRow().run(),
    disabled: !editor.can().deleteRow(),
    icon: AiOutlineInsertRowAbove,
  },
  deleteTable: {
    desc: 'Delete_table',
    onClick: () => editor.chain().focus().deleteTable().run(),
    disabled: !editor.can().deleteTable(),
    icon: AiOutlineTable,
  },
})

export const TableBlockBtnsS = (editor: Editor) => ({
  addHeader: {
    desc: 'Add_Header',
    children: [
      TableBlockBtns(editor).toggleHeaderColumn,
      TableBlockBtns(editor).toggleHeaderRow,
    ],
  },
  addColumn: {
    desc: 'Add_column',
    children: [
      TableBlockBtns(editor).addColumnAfter,
      TableBlockBtns(editor).addColumnBefore,
    ],
  },
  toggleHeaderCell: {
    ...TableBlockBtns(editor).toggleHeaderCell,
  },
  addRow: {
    desc: 'Add_row',
    children: [
      TableBlockBtns(editor).addRowAfter,
      TableBlockBtns(editor).addRowBefore,
    ],
  },
  mergeOrSplit: {
    ...TableBlockBtns(editor).mergeOrSplit,
    desc: editor.can().splitCell() ? 'Split' : 'Merge',
  },
  delete: {
    desc: 'Delete',
    icon: BiTrash,
    children: [
      TableBlockBtns(editor).deleteColumn,
      TableBlockBtns(editor).deleteRow,
      TableBlockBtns(editor).deleteTable,
    ],
  },
})
