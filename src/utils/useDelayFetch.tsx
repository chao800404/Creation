import React, { useEffect, useState } from 'react'
import useStore from '../store/store'

import { updateData } from '../utils/fetch'

type delayFetchType = {
  id: string
  title: string
}

const useDelayFetch = ({ id, title }: delayFetchType) => {
  const [delayTitle, setContent] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setContent(title)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [title, delayTitle, setContent])

  useEffect(() => {
    const controller = new AbortController()
    const { loaded } = useStore.getState()

    if (loaded) {
      console.log(true)
      const signal = controller.signal
      if (title !== delayTitle) {
        return controller.abort()
      }
      const proFetch = async () => {
        await updateData('updateData', { title: delayTitle, id }, signal)
      }

      proFetch()
    }
  }, [delayTitle, id, title])
}

export default useDelayFetch
