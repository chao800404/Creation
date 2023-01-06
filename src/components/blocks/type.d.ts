import { BlockInputType } from '../../hook/type'

type BaseBlockType = {
  blockData: BlockInputType['blockData']
  className: string

  blockContentSet: (
    blockContent: Omit<BlockInputType['blockData'], 'pageId'>
  ) => void
}

type NodeViewPropsAttrs = {
  open: boolean
  link: string
  newTab: boolean
  name: string
  id: string
}
