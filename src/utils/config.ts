import { FaRegTrashAlt } from 'react-icons/fa'
import { BiSearch, BiImport } from 'react-icons/bi'
import {
  AiFillDatabase,
  AiOutlinePlusSquare,
  AiOutlinePlus,
} from 'react-icons/ai'
import { HiOutlineViewList, HiDocumentText } from 'react-icons/hi'
import { BsFillGridFill, BsCaretRightFill } from 'react-icons/bs'
import { TbGridDots } from 'react-icons/tb'

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
