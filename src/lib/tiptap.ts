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

import hljs from 'highlight.js'
import { lowlight } from 'lowlight'
import { BLOCK_SELECTOR } from '../utils/config'
import { Editor, ReactNodeViewRenderer } from '@tiptap/react'
import { ImBold, ImStrikethrough, ImUnderline } from 'react-icons/im'
import { GoItalic } from 'react-icons/go'
import { HiOutlineCode } from 'react-icons/hi'
import { TbBlockquote } from 'react-icons/tb'

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
        initContent: '<h4></h4>',
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
