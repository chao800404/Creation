import Link from 'next/link'
import React from 'react'
import { ResDataType } from '../../hook/useListSWR'
import { TypeIcon } from '../drop/treeView/typeIcon'
import { IoIosArrowForward } from 'react-icons/io'
import { MdOutlineTableChart } from 'react-icons/md'

import {
  DashboardNavbarLinkWrapper,
  DashboardNavDotWrapper,
  DashboardPopupItemWrapper,
} from './navbar.styles'

type DashboardNavbarLinkProps = ResDataType & {
  index?: number
  lastIndex?: number
  hasChild: boolean
}

const DashboardNavbarLink: React.FC<
  DashboardNavbarLinkProps & { hasCrumb?: boolean }
> = (props) => {
  return (
    <DashboardNavbarLinkWrapper>
      {props.data && (
        <Link className="link" href={`dashboard/${props.id}`}>
          <a>
            <TypeIcon isOpen={false} hasChild={props.hasChild} node={props} />
            <p>
              {props.text && props.text.length > 0 ? props.text : 'Untitled'}
            </p>
          </a>
        </Link>
      )}
      {props.lastIndex &&
        props.index !== props.lastIndex - 1 &&
        props.hasCrumb && (
          <span className="link_gap">
            <IoIosArrowForward fontSize=".8rem" />
          </span>
        )}
    </DashboardNavbarLinkWrapper>
  )
}

const DashboardPopupItem: React.FC<
  DashboardNavbarLinkProps & { hasCrumb?: boolean }
> = (props) => {
  return (
    <DashboardPopupItemWrapper>
      <Link href={`dashboard/${props.id}`}>
        <a>
          <TypeIcon isOpen={false} hasChild={props.hasChild} node={props} />
          <p>{props.text && props.text.length > 0 ? props.text : 'Untitled'}</p>
        </a>
      </Link>
    </DashboardPopupItemWrapper>
  )
}

const DashboardPopupHome = () => {
  return (
    <DashboardNavbarLinkWrapper>
      <Link href={`/`}>
        <a>
          <span className="link_gap">
            <MdOutlineTableChart fontSize=".8rem" />
          </span>
          <p>Home</p>
        </a>
      </Link>
      <span className="link_gap">
        <IoIosArrowForward fontSize=".8rem" />
      </span>
    </DashboardNavbarLinkWrapper>
  )
}

const DashboardNavDot = () => {
  return (
    <DashboardNavDotWrapper data-type="dashboard_nav-popup">
      <p>....</p>
      <span className="link_gap">
        <IoIosArrowForward fontSize=".8rem" />
      </span>
    </DashboardNavDotWrapper>
  )
}

const DashBoardNavBarLinkItem: React.FC<DashboardNavbarLinkProps> = (props) => {
  const { index, lastIndex, text } = props

  if (index === 0 && text === 'Home') {
    return <DashboardPopupHome />
  } else if (lastIndex && index === lastIndex - 1) {
    return <DashboardNavbarLink {...props} />
  } else if (index === 2) {
    return <DashboardNavDot />
  } else {
    return null
  }
}

export { DashBoardNavBarLinkItem, DashboardNavbarLink, DashboardPopupItem }
