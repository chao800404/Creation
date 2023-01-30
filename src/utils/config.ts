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
import { TbGridDots } from 'react-icons/tb'
import { StatusType } from '../store'

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

export const STATUS_CONFIG = (status: StatusType) => {
  switch (status) {
    case 'success':
      return {
        color: '#00CB6A',
        desc: status,
      }
    case 'error':
      return {
        color: '#CB0000',
        desc: status,
      }
    case 'normal':
      return {
        color: '#00BFCB',
        desc: status,
      }
    case 'pending':
      return {
        color: '#CB9200',
        desc: status,
      }
    default:
      return {
        color: '#CB0000',
        desc: status,
      }
  }
}
