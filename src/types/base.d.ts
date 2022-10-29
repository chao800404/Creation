export type ImageType = {
  imageFilePath: null | string
  imageName: string
}

export interface UploadLayoutType {
  setHovered?: Dispatch<SetStateAction<boolean>>
  onClick: MouseEventHandler<HTMLButtonElement>
  file: ImageType
  setFile: React.Dispatch<React.SetStateAction<ImageType>>
}

export interface ChangePopupType {
  imageTab: string
  deleteTab: string
  uploadImage: (src: string) => void
  removeFn: () => void
}
