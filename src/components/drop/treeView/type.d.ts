import { ResDataType } from '../../../hook/useListSWR'
import { NodeModel, RenderParams } from '@minoru/react-dnd-treeview'
import { TreeProps } from './type'
import { DragLayerMonitorProps } from '@minoru/react-dnd-treeview'
import { ListData } from '../../../hook/useListSWR'

export type TreeDataType<T> = NodeModel<T>
type ShowMenuProps =
  | {
      x: number
      y: number
      dataType: string
      node: ResDataType
      handleRename: () => void
      clickOutsideFn?: () => void
    }
  | undefined

export type TreeProps<T> = RenderParams & {
  node: TreeDataType<T>
  onToggle: (id: NodeModel['id']) => void
  isSelected: boolean
  testIdPrefix: string
  handleRef: React.LegacyRef<HTMLDivElement>
}

export type CustomNodeType = TreeProps<ListData> & {
  addNewPage: (parentId: string) => void
  updatePageConfig: (
    id: string,
    key: 'title' | 'favorite' | 'editable' | 'shouldShow',
    value: string | boolean
  ) => void
  showMenu: (props: ShowMenuProps) => void
}

export type DragPreviewProp = {
  monitorProps: DragLayerMonitorProps<ListData>
  tree: TreeDataType<ListData>[]
}

export type HandleToggle = (id: string, toggle: boolean) => void
export type HandleChangeText = (id: string, text: string) => voidf

export type HandleDelete = (
  id: string,
  callback?: <T>(TreeDataType: TreeDataType<T>[]) => void
) => TreeDataType<ListData>[]

export type HandleRename = () => void

export type MenuMapType = (
  node: ResDataType,
  handleRename: HandleRename
) => {
  icon: IconType
  desc: string
  onClick: () => void
}[]

export type TreeViewType = {
  list: TreeDataType<ListData>[]
  id: string
  menuMap: MenuMapType
}
