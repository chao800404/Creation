import create from 'zustand'
import produce from 'immer'
import { BlockSelectorType } from '../hook/type'

type InitialBlocksStore = {
  blocksMap: BlockSelectorType[]
  filterBlocks: BlockSelectorType[]
}

type Action = {
  blocksMapSet: (blockMap: BlockSelectorType[]) => void
  filterBlocksMapSet: (blockName: string) => void
}

const initialBlocksStore = {
  blocksMap: [],
  filterBlocks: [],
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
  })
)

process.env.NODE_ENV !== 'production' && useBlocksStore.subscribe(console.log)
