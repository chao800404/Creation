import React, { useEffect } from 'react'

const useWindowCancelState = (callback: (e: MouseEvent) => void) => {
  useEffect(() => {
    const handle = (e: MouseEvent) => callback(e)

    window.addEventListener('click', handle, false)
    return () => window.removeEventListener('click', handle, false)
  }, [callback])
}

export default useWindowCancelState
