import { BoxProps } from '@chakra-ui/react'
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

export interface UploadLayoutType extends BoxProps {
  setHovered?: Dispatch<SetStateAction<boolean>>
  onClick: MouseEventHandler<HTMLButtonElement>
  file: ImageType
  setFile: React.Dispatch<React.SetStateAction<ImageType>>
}

export interface ChangePopupType extends BoxProps {
  imageTab: string
  uploadImage: (src: string) => void
}
