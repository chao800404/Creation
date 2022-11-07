import create from 'zustand'
import produce from 'immer'

type BlockType = {
  name: string
  image: string
  desc: string
}

type InitialBlocksStore = {
  blocksMap: BlockType[]
  filterBlocks: BlockType[]
  show: boolean
  focusIndex: number
}

type Action = {
  blocksMapSet: (blockMap: BlockType[]) => void
  filterBlocksMapSet: (blockName: string) => void
  showSet: (toggle: boolean) => void
  focusIndexSet: (index: number) => void
}

const initialBlocksStore = {
  blocksMap: [],
  filterBlocks: [],
  show: false,
  focusIndex: 0,
}

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
          console.log(blockName)
          state.filterBlocks = blocksMap.filter((block) =>
            block.name.toLowerCase().includes(blockName.toLowerCase())
          )
        })
      ),
    showSet: (toggle) =>
      set(
        produce<InitialBlocksStore>((state) => {
          state.show = toggle
        })
      ),
    focusIndexSet: (index) =>
      set(
        produce<InitialBlocksStore>((state) => {
          state.focusIndex = index
        })
      ),
  })
)

process.env.NODE_ENV !== 'production' && useBlocksStore.subscribe(console.log)
