import create from 'zustand'
import produce from 'immer'

export type InitialKeydownState = {
  index: number
}

type handleOnKeydownProps = {
  keyCode: string
  length: number
  onEnter?: () => void
  onRight?: () => void
  onLeft?: () => void
  onEsc?: () => void
  onSlash?: () => void
  onBackspace?: () => void
  onArrowDown?: () => void
  onArrowUp?: () => void
}

type Action = {
  handleOnKeydown: (props: handleOnKeydownProps) => void
  reset: () => void
}

const initialKeydownState = {
  index: 0,
}

export const useKeydownStore = create<InitialKeydownState & Action>(
  (set, get) => ({
    ...initialKeydownState,
    handleOnKeydown: ({
      keyCode,
      length,
      onEnter,
      onEsc,
      onLeft,
      onRight,
      onSlash,
      onBackspace,
      onArrowDown,
      onArrowUp,
    }) => {
      set(
        produce<InitialKeydownState>((state) => {
          const { index } = state
          switch (keyCode) {
            case 'ArrowDown':
              if (index < length - 1) {
                state.index += 1
              }
              !!onArrowDown && onArrowDown()
              break
            case 'ArrowUp':
              if (index > 0) {
                state.index -= 1
              }
              !!onArrowUp && onArrowUp()
              break
            case 'Enter':
              if (onEnter) {
                onEnter()
              }
              break
            case 'ArrowRight':
              if (onRight) {
                onRight()
              }

              break
            case 'ArrowLeft':
              if (onLeft) {
                onLeft()
              }
              break
            case 'Escape':
              if (onEsc) {
                onEsc()
              }
              break
            case '/':
              if (onSlash) {
                onSlash()
              }
              break
            case 'Backspace':
              if (onBackspace) {
                onBackspace()
              }
          }
        })
      )
    },
    reset: () =>
      set(
        produce<InitialKeydownState>((state) => {
          state.index = 0
        })
      ),
  })
)

process.env.NODE_ENV !== 'production' && useKeydownStore.subscribe(console.log)
