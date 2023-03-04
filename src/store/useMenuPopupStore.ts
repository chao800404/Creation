import { IconType } from 'react-icons'
import { create } from 'zustand'

export type ButtonMapType = {
  icon?: IconType
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  desc: string
  disabled?: boolean
}

export type GroupButtonType = ButtonMapType & { children?: ButtonMapType[] }

export type InitialMenuPopup = {
  show: boolean
  x: number
  y: number
  width: number
  dataType: string
  buttonsMap: GroupButtonType[] | null
}

type Action = {
  showSet: (payload: InitialMenuPopup) => void
}

const initialMenuPopup = {
  show: false,
  x: 0,
  y: 0,
  width: 0,
  dataType: '',
  buttonsMap: null,
}

export const useMenuPopupStore = create<InitialMenuPopup & Action>(
  (set, get) => ({
    ...initialMenuPopup,
    showSet: ({ show, x, y, buttonsMap, dataType, width }) =>
      set(() => ({
        show,
        x,
        y,
        buttonsMap,
        dataType,
        width,
      })),
  })
)

// process.env.NODE_ENV !== 'production' &&
//   useMenuPopupStore.subscribe(console.log)
