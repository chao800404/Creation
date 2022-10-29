import * as React from 'react'

import shallow from 'zustand/shallow'
import { usePopupStore } from '../../store'
import { NavbarWrapper } from './navbar.styles'

const Navbar = () => {
  const toggle = usePopupStore((state) => state.displayToggle, shallow)

  return (
    <NavbarWrapper>
      <button
        onClick={toggle}
        style={{
          backgroundColor: '#1c1c1c',
          padding: '1rem 2rem',
          color: '#ffffff',
        }}
      >
        立即開始
      </button>
    </NavbarWrapper>
  )
}

export default React.memo(Navbar)
