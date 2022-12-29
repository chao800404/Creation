import styled from 'styled-components'
import { motion } from 'framer-motion'

export const DashboardNavbar = styled('header')`
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;

  .navbar-breadCrumb {
    max-width: 15rem;
    padding: 0.3rem 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    position: relative;
    background-color: ${({ theme }) => theme.colors.white};
    border-bottom: 2px solid;

    ul {
      display: flex;
    }
  }

  .navbar-popup {
    position: absolute;
    bottom: -8rem;
    left: 0;
    width: 15rem;
    background-color: ${({ theme }) => theme.colors.primary};
    transform-origin: top left;
    padding: 0.5rem 0;
    box-shadow: 0rem 0.1rem 0.2rem rgba(0, 0, 0, 1);
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.primary_2};
  }

  .navbar-userOption {
    height: inherit;
  }

  .dashboard_popup-header {
    height: 0.1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary_2};
  }
  .dashboard_popup-footer {
    height: 0.1rem;
  }
`

export const DashboardNavDotWrapper = styled('li')`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  .link_gap {
    padding: 0 0.2rem;
  }

  .link_popup {
    position: absolute;
    width: 15rem;
    height: 10rem;
    bottom: -10.8rem;
    box-shadow: 0.2rem 0.2rem 1rem rgba(0, 0, 0, 0.2);
    left: 0;
    z-index: 10;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`

export const DashboardPopupItemWrapper = styled('li')`
  width: 100%;
  color: inherit;
  height: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary_2};
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  cursor: pointer;
  a {
    width: inherit;
    color: inherit;
    display: inherit;
    align-items: inherit;
    gap: 1rem;
    p {
      max-width: 10rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin-top: 1px;
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary_high};
  }
`

export const DashboardNavbarLinkWrapper = styled('li')`
  display: flex;
  align-items: center;

  .link-image {
    position: relative;
    width: 1rem;
    height: 1rem;
  }

  .link_gap {
    padding: 0 0.2rem;
  }

  a {
    gap: 0.3rem;
    display: flex;
    align-items: center;

    p {
      max-width: 4rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin-top: 1px;
    }
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
    border: 2px solid ${({ theme }) => theme.colors.primary};
    padding: 0 1rem;
    background-color: #ffffff;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: -0.5rem;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    z-index: -1000;
    border-radius: 0.5rem;
    width: 100%;
  }
`
