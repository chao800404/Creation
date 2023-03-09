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

export declare type UpdateNode<T> = ({
  pageId,
  value,
}: {
  pageId: string
  value: V
}) => void

type PageSWRResult<V> = {
  data: V
  isLoading: boolean
  mutateFunction: {
    uploadCoverImage: (src: string) => void
    uploadCoverImageFile: (file: File) => void
    updateNodes: UpdateNode<V>
    updateOrder: (reorder: string[]) => void
    deleteBlock: (page_id: string, id: string) => void
  }
}
