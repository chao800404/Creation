import { Emoji, List } from '@prisma/client'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { usePageSWR } from '../../hook/usePageSWR'

const PreLoad = ({ list }: { list: (List & { emoji: Emoji })[] }) => {
  const [int, setInt] = useState(0)
  const {
    query: { page },
  } = useRouter()

  usePageSWR(list[int].id as string)

  useEffect(() => {
    if (list && int < list.length - 1) {
      const interval = setInterval(() => setInt((prev) => prev + 1), 200)
      return () => clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [int])

  return <div></div>
}

export default PreLoad
