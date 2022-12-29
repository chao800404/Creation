import Link from 'next/link'
import React from 'react'
import { ResDataType } from '../../hook/useListSWR'
import { TypeIcon } from '../drop/treeView/typeIcon'
import { IoIosArrowForward } from 'react-icons/io'

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
  const { index, lastIndex } = props

  if (!lastIndex || !index)
    return <DashboardNavbarLink {...props} hasCrumb={true} />

  if (lastIndex - 1 > 1) {
    if (index === 0) {
      return <DashboardNavbarLink {...props} hasCrumb={true} />
    } else if (index === lastIndex - 2) {
      return <DashboardNavDot />
    } else if (index === lastIndex - 1) {
      return <DashboardNavbarLink {...props} />
    } else {
      return null
    }
  }
  return <DashboardNavbarLink {...props} hasCrumb={true} />
}

export { DashBoardNavBarLinkItem, DashboardNavbarLink, DashboardPopupItem }
