import React, { useEffect } from 'react'

const useOnClickOutside = (callback: (e: MouseEvent) => void) => {
  useEffect(() => {
    const handle = (e: MouseEvent) => callback(e)

    document.addEventListener('pointerdown', handle, false)
    return () => document.removeEventListener('pointerdown', handle, false)
  }, [callback])
}

export default useOnClickOutside
