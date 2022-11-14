import { FaRegTrashAlt } from 'react-icons/fa'
import { BiSearch, BiImport } from 'react-icons/bi'
import {
  AiFillDatabase,
  AiOutlinePlusSquare,
  AiOutlinePlus,
} from 'react-icons/ai'
import {
  HiOutlineViewList,
  HiDocumentText,
  HiOutlineCode,
} from 'react-icons/hi'
import { BsFillGridFill, BsCaretRightFill } from 'react-icons/bs'
import { TbBlockquote, TbGridDots } from 'react-icons/tb'
import { Editor } from '@tiptap/react'
import { ImBold, ImStrikethrough, ImUnderline } from 'react-icons/im'
import { GoItalic } from 'react-icons/go'

const SIDE_MAX_WIDTH = 450
const SIDE_MIN_WIDTH = 250
const SIDE_BASIC_WIDTH = 350
export { SIDE_MAX_WIDTH, SIDE_MIN_WIDTH, SIDE_BASIC_WIDTH }

export const BASE_ICON_SIZE = '1rem'

export const URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXTAUTH_URL

export const SIDE_OPTION = {
  searchBarBtn: {
    text: 'Qucik Find In a Base',
    icon: BiSearch,
  },
  favorite: {
    text: 'Favorite',
  },
  interfaces: {
    text: 'InterFaces',
    icon: AiFillDatabase,
  },
  workspaces: {
    text: 'WORKSPACES',
    icon: [AiOutlinePlusSquare, BsFillGridFill, HiOutlineViewList],
  },
  base: {
    icon: BsCaretRightFill,
    color: {
      base: 'brand.primary-black-300',
      active: 'brand.priamry-black',
    },
  },
  importFile: {
    text: 'Import Flie',
    icon: BiImport,
  },
  trash: {
    text: 'Trash',
    icon: FaRegTrashAlt,
  },
  newPage: {
    text: 'New Page',
    icon: AiOutlinePlusSquare,
  },
  workspaceItem: {
    icon: [HiDocumentText, AiOutlinePlus, TbGridDots],
  },
}

export const EMOJI_BASE = [
  '/static/emoji/2nd-place-medal_1f948.png',
  '/static/emoji/b-button-blood-type_1f171-fe0f.png',
  '/static/emoji/badminton_1f3f8.png',
  '/static/emoji/boxing-glove_1f94a.png',
  '/static/emoji/carp-streamer_1f38f.png',
  '/static/emoji/cinema_1f3a6.png',
  '/static/emoji/construction-worker_medium-dark-skin-tone_1f477-1f3fe_1f3fe.png',
  '/static/emoji/cool-button_1f192.png',
  '/static/emoji/deaf-person_medium-light-skin-tone_1f9cf-1f3fc_1f3fc.png',
  '/static/emoji/dizzy_1f4ab.png',
]

export const BLOCK_SELECTOR = [
  {
    name: 'Heading_1',
    desc: 'Big section heading.',
    image: '/static/blocks/header.png',
  },
  {
    name: 'Heading_2',
    desc: 'Medium section heading.',
    image: '/static/blocks/subheader.png',
  },
  {
    name: 'Heading_3',
    desc: 'Small section heading.',
    image: '/static/blocks/subsubheader.png',
  },
  {
    name: 'Paragraph',
    desc: 'Just start writing with plain text.',
    image: '/static/blocks/en-US.png',
  },
  {
    name: 'Table',
    desc: 'Add simple a tabular content.',
    image: '/static/blocks/simple-table.png',
  },
  {
    name: 'To-do_list',
    desc: 'Embed a sub-page inside the page.',
    image: '/static/blocks/to-do-list.png',
  },
  {
    name: 'Bullested_list',
    desc: 'Create a simple bulleted list.',
    image: '/static/blocks/bulleted-list.png',
  },
  {
    name: 'Numbered_list',
    desc: 'Create a list with numbering.',
    image: '/static/blocks/numbered-list.png',
  },
]

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
