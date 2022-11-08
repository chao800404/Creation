import create from 'zustand'
import produce from 'immer'
import { stat } from 'fs/promises'

type BlockType = {
  name: string
  image: string
  desc: string
}

type InitialBlocksStore = {
  blocksMap: BlockType[]
  filterBlocks: BlockType[]
  popupShow: boolean
  focusIndex: number
}

type Action = {
  blocksMapSet: (blockMap: BlockType[]) => void
  filterBlocksMapSet: (blockName: string) => void
  popupShowSet: (toggle: boolean) => void
  focusIndexSet: (index: number) => void
  incrOrDecrFocusIndex: (key: 'ArrowDown' | 'ArrowUp') => void
}

const initialBlocksStore = {
  blocksMap: [],
  filterBlocks: [],
  popupShow: false,
  focusIndex: 0,
}
const replaceWord = (word: string) =>
  word.toLowerCase().replace('_', ' ').replace('-', ' ')

export const useBlocksStore = create<InitialBlocksStore & Action>(
  (set, get) => ({
    ...initialBlocksStore,
    blocksMapSet: (blockMap) =>
      set(
        produce<InitialBlocksStore>((state) => {
          state.blocksMap = blockMap
        })
      ),
    filterBlocksMapSet: (blockName) =>
      set(
        produce<InitialBlocksStore>((state) => {
          const { blocksMap } = get()
          state.filterBlocks = blocksMap.filter((block) =>
            replaceWord(block.name).includes(replaceWord(blockName))
          )
        })
      ),
    popupShowSet: (toggle) =>
      set(
        produce<InitialBlocksStore>((state) => {
          state.popupShow = toggle
        })
      ),
    focusIndexSet: (index) =>
      set(
        produce<InitialBlocksStore>((state) => {
          state.focusIndex = index
        })
      ),
    incrOrDecrFocusIndex: (key) =>
      set(
        produce<InitialBlocksStore>((state) => {
          const { focusIndex, blocksMap } = get()
          if (key === 'ArrowDown') {
            state.focusIndex =
              focusIndex < blocksMap.length - 1 ? focusIndex + 1 : focusIndex
          } else if (key === 'ArrowUp') {
            state.focusIndex = focusIndex > 0 ? focusIndex - 1 : focusIndex
          }
        })
      ),
  })
)

process.env.NODE_ENV !== 'production' && useBlocksStore.subscribe(console.log)
