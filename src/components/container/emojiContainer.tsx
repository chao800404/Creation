import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import { fetcher } from '../../utils/fetch'
import {
  EmojiContainerWrapper,
  EmojiComponentWrapper,
} from './container.styles'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import PulseLoader from 'react-spinners/PulseLoader'
import { EmojiBaseMap } from '@prisma/client'
import { useEmojiStore } from '../../store/index'
import shallow from 'zustand/shallow'

type ResEmojiMapType = {
  status: 'success' | 'fail'
  data: {
    emoji: EmojiBaseMap[]
  }
  isEnd: boolean
}

const EmojiComponent = ({ emojis }: { emojis: EmojiBaseMap[] }) => (
  <EmojiComponentWrapper>
    {emojis &&
      emojis.map(({ name, id, image }) => (
        <div className="emoji-content" key={id}>
          <Image
            priority
            src={image}
            objectFit="cover"
            layout="fill"
            alt={name || 'emoji'}
          />
        </div>
      ))}
  </EmojiComponentWrapper>
)

const EmojiContainer = () => {
  const [pageIndex, setPageIndex] = useState(1)
  const { ref, inView } = useInView({
    threshold: 0,
  })
  // const [isEnd, setIsEnd] = useState(false)
  const { isEnd, isEndSet, emojiMap, emojiMapSet } = useEmojiStore(
    (state) => ({
      isEnd: state.isEnd,
      isEndSet: state.isEndSet,
      emojiMap: state.emojiMap,
      emojiMapSet: state.emojiMapSet,
    }),
    shallow
  )
  // const [emjiData, setEmojiData] = useState<EmojiBaseMap[][]>([])
  const { data } = useSWR<ResEmojiMapType>(
    pageIndex ? `api/getImageEmoji?pageIndex=${pageIndex}&limit=96` : null,
    fetcher
  )

  useEffect(() => {
    if (data && !isEnd && emojiMapSet) {
      // setEmojiData((prev) => (prev = [...prev, data.data.emoji]))
      // setIsEnd(data.isEnd)
      emojiMapSet(data.data.emoji)
      isEndSet(data.isEnd)
    }
  }, [data, isEnd, emojiMapSet, isEndSet, pageIndex])

  useEffect(() => {
    if (inView && !isEnd) {
      setPageIndex((prev) => prev + 1)
    }
  }, [inView, isEnd])

  return (
    <EmojiContainerWrapper>
      {emojiMap &&
        emojiMap.map((emojis, index) => (
          <EmojiComponent key={index} emojis={emojis} />
        ))}
      {!isEnd && (
        <div className="emoji-preload" ref={ref}>
          <PulseLoader color="#1c1c1c" size={8} />
        </div>
      )}
    </EmojiContainerWrapper>
  )
}

export default EmojiContainer
