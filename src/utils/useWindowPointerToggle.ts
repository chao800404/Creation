import React, { useState } from 'react'
import useOnClickOutside from './useOnClickOutside'

const useWindowPointerToggle = (
  dataType: string,
  handleClickOutSide: (target: Element | null) => void
) => {
  const [toggle, setToggle] = useState(false)

  const handleToggleSet = (toggle: boolean) => setToggle(toggle)

  const handleOnPointerDown = (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest(
      `[data-type="${dataType}"]`
    )
    if (!target) {
      handleToggleSet(false)
      handleClickOutSide(target)
    }
  }

  useOnClickOutside((e) => handleOnPointerDown(e))

  return {
    handleToggleSet,
    toggle,
  }
}

export default useWindowPointerToggle
