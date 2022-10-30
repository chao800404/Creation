import React from 'react'
import NavbarOption from './navbarOption'
import { DashboardNavbar } from './navbar.styles'

const DashBoardNav = () => {
  return (
    <DashboardNavbar>
      <div className="navbar-breadCrumb"></div>
      <div className="navbar-userOption">
        <NavbarOption />
      </div>
    </DashboardNavbar>
  )
}

export default React.memo(DashBoardNav)
