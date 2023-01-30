import React, { useState, useEffect } from 'react'

import {
  EmojiContainerWrapper,
  EmojiComponentWrapper,
} from './container.styles'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import PulseLoader from 'react-spinners/PulseLoader'
import { EmojiBaseMap } from '@prisma/client'
import { useEmojiStore } from '../../store/index'
import { shallow } from 'zustand/shallow'
import { fetcher } from '../../utils/fetch'

const EmojiComponent = ({ emojis }: { emojis: EmojiBaseMap[] }) => (
  <EmojiComponentWrapper>
    {emojis &&
      emojis.map(({ name, id, image }) => (
        <div
          id={id}
          data-type="emoji-content"
          className="emoji-content"
          data-src={image}
          key={id}
        >
          <Image
            src={image}
            objectFit="cover"
            width={30}
            height={30}
            quality={20}
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

  const { isEnd, isEndSet, emojiMap, emojiMapSet } = useEmojiStore(
    (state) => ({
      isEnd: state.isEnd,
      isEndSet: state.isEndSet,
      emojiMap: state.emojiMap,
      emojiMapSet: state.emojiMapSet,
    }),
    shallow
  )

  useEffect(() => {
    if (pageIndex && !isEnd) {
      const profetch = async () => {
        const data = await fetcher(
          `/api/getImageEmoji?pageIndex=${pageIndex}&limit=96`
        )
        emojiMapSet(data.data.emoji)
        isEndSet(data.isEnd)
      }

      profetch()
    }
  }, [pageIndex, isEnd, emojiMapSet, isEndSet])

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
