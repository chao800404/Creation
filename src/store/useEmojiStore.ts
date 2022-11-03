import create from 'zustand'
import produce from 'immer'
import { EmojiBaseMap } from '@prisma/client'

type InitialEmoji = {
  emojiMap: EmojiBaseMap[][]
  isEnd: boolean
}

type Action = {
  emojiMapSet: (emojiMap: EmojiBaseMap[]) => void
  isEndSet: (end: boolean) => void
}

const initialEmoji = {
  emojiMap: [],
  isEnd: false,
}

export const useEmojiStore = create<InitialEmoji & Action>((set, get) => ({
  ...initialEmoji,
  emojiMapSet: (emojiMap) => {
    const { isEnd } = get()
    if (isEnd) return
    set(
      produce<InitialEmoji>((state) => {
        state.emojiMap?.push(emojiMap)
      })
    )
  },
  isEndSet: (end) => {
    set(
      produce<InitialEmoji>((state) => {
        state.isEnd = end
      })
    )
  },
}))
