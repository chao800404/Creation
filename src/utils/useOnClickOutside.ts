import React, { useEffect } from 'react'

const useOnClickOutside = (callback: (e: MouseEvent) => void) => {
  useEffect(() => {
    const handle = (e: MouseEvent) => callback(e)

    document.addEventListener('pointerdown', handle, true)
    return () => document.removeEventListener('pointerdown', handle, true)
  }, [callback])
}

export default useOnClickOutside
