export interface BaseProps {
  text?: string
  icon?: IconType
  children?: ReactNode
  color?: string
  fontSize?: string
}

export interface WorkspaceItemProp extends BaseProps {
  id: string
}

export interface PopupType extends BaseProps {
  handleClick: () => void
}

export type ImageType = {
  imageFilePath: null | string
  imageName: string
}

export interface UploadCoverImageType {
  setHovered?: Dispatch<SetStateAction<boolean>>
}
