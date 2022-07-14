export interface BaseProps {
  text?: string
  icon?: IconType
  children?: ReactNode
  color?: string
}

export interface WorkspaceItemProp extends BaseProps {
  id: string
}
