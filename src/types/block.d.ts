type BlocksNameType = 'text' | 'table' | 'list'

export type BlockSelectorType = {
  name: string
  type: BlocksNameType
  desc: string
  image: string
}

export type BlockInputType = {
  readonly blockData: {
    name: string
    index: number
    id: string
    content: string
    type: BlocksNameType
    newBlock?: boolean
  }
}
