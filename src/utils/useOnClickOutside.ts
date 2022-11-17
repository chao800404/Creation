import React, { useEffect, useState } from 'react'

const useOnClickOutside = (callback: (e: MouseEvent) => void) => {
  const [isLeave, setIsLeave] = useState(false)

  useEffect(() => {
    const handler = (e: MouseEvent) => !isLeave && callback(e)

    const handleToggleLeave = (event: MouseEvent) => {
      const from = event.relatedTarget
      setIsLeave(!from)
    }

    document.addEventListener('pointerdown', handler, false)
    document.addEventListener('mouseout', handleToggleLeave, false)
    document.addEventListener('mouseenter', handleToggleLeave, false)
    return () => {
      document.removeEventListener('pointerdown', handler, false)
      document.removeEventListener('mouseout', handleToggleLeave, false)
      document.removeEventListener('mouseenter', handleToggleLeave, false)
    }
  }, [callback, isLeave])

  return {
    isLeave,
  }
}

export default useOnClickOutside
