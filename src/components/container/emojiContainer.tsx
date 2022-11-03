import React, { useState, useEffect, useRef } from 'react'
import useSWR from 'swr'
import { fetcher } from '../../utils/fetch'
import {
  EmojiContainerWrapper,
  EmojiComponentWrapper,
} from './container.styles'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import PulseLoader from 'react-spinners/PulseLoader'

const EmojiComponent = ({ paths }: { paths: string[] }) => (
  <EmojiComponentWrapper>
    {paths &&
      paths.map((path, index) => (
        <div className="emoji-content" key={path + index}>
          <Image
            loading="lazy"
            src={path}
            objectFit="cover"
            layout="fill"
            alt="emoji"
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
  const [isEnd, setIsEnd] = useState(false)
  const [emjiData, setEmojiData] = useState<string[][]>([])
  const { data } = useSWR(
    pageIndex ? `api/getImageEmoji?pageIndex=${pageIndex}&limit=96` : null,
    fetcher
  )

  useEffect(() => {
    if (data && !isEnd) {
      setEmojiData((prev) => (prev = [...prev, data.data.emojiMap]))
      setIsEnd(data.isEnd)
    }
  }, [data, isEnd])

  useEffect(() => {
    if (inView && !isEnd) {
      setPageIndex((prev) => prev + 1)
    }
  }, [inView, isEnd])

  return (
    <EmojiContainerWrapper>
      {emjiData &&
        emjiData.map((emojiMap, index) => (
          <EmojiComponent key={index} paths={emojiMap} />
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
