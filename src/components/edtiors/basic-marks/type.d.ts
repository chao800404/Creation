export type TippyComponentProps = Record<'name' | 'command', string>

export type ColorPickerToolbarDropdownProps = {
  pluginKey: string
  icon: ReactNode
  selectedIcon: ReactNode
  colors?: ColorType[]
  customColors?: ColorType[]
  closeOnSelect?: boolean
}
