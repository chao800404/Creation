import { BlockInputType } from '../../hook/type'

export type BaseBlockType = {
  blockData: BlockInputType['blockData']
  className: string
  isFocus: boolean
  blockContentSet: (
    blockContent: Omit<BlockInputType['blockData'], 'pageId'>
  ) => void
  isFocusSet: (foucs: boolean) => void
}

export type NodeViewPropsAttrs = {
  open: boolean
  link: string
  newTab: boolean
  name: string
}
