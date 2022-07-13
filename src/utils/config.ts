import { FaRegTrashAlt } from 'react-icons/fa'
import { BiSearch, BiImport } from 'react-icons/bi'
import { AiFillDatabase, AiOutlinePlusSquare } from 'react-icons/ai'
import { HiOutlineViewList } from 'react-icons/hi'
import { BsFillGridFill, BsCaretRightFill } from 'react-icons/bs'

const SIDE_MAX_WIDTH = 450
const SIDE_MIN_WIDTH = 250
const SIDE_BASIC_WIDTH = 350
export { SIDE_MAX_WIDTH, SIDE_MIN_WIDTH, SIDE_BASIC_WIDTH }

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
    icon: [BsFillGridFill, HiOutlineViewList],
  },
  base: {
    icon: BsCaretRightFill,
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
}
