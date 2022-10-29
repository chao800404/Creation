import styled from 'styled-components'
import { motion } from 'framer-motion'

export const DashboardNavbar = styled('header')`
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .navbar-breadCrumb {
  }

  .navbar-userOption {
    height: inherit;
  }
`

export const NavbarWrapper = styled('header')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  width: 100%;
  z-index: 30;

  .header-logo {
    margin-left: 1rem;
  }

  .header-btn {
  }
`

export const NavbarOptionWrapper = styled(motion.div)`
  height: inherit;
  width: auto;
  position: relative;
  margin-top: 1rem;
  margin-right: 0.3rem;

  .navbar_option-container {
    gap: 0.8rem;
    height: inherit;
    display: flex;
    align-items: center;
    cursor: pointer;
    border: 2px solid #1c1c1c;
    border-radius: 0.5rem;
    padding: 0 1rem;
    background-color: #ffffff;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: -0.5rem;
    height: 100%;
    background-color: #1c1c1c;
    z-index: -1000;
    border-radius: 0.5rem;
    width: 100%;
  }
`
