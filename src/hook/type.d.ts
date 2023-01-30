export type ignoreType = 'createdAt' | 'updatedAt'

type BlocksNameType = 'text' | 'table' | 'list' | 'code' | 'button'

export type BlockInputType = {
  readonly blockData: {
    name: string
    id: string
    content: string
    type: BlocksNameType
    pageId?: string
    newBlock?: boolean
    focus?: boolean
  }
}
