import React, { useState } from 'react'
import NavbarOption from './navbarOption'
import { DashboardNavbar } from './navbar.styles'
import { useRouter } from 'next/router'
import { useListSWR, ResDataType } from '../../hook/useListSWR'
import { AnimatePresence, motion } from 'framer-motion'
import { getDescendants } from '@minoru/react-dnd-treeview'
import {
  DashBoardNavBarLinkItem,
  DashboardPopupItem,
} from './dashBoardNavBarLinkItem'
import { Scrollbars } from 'react-custom-scrollbars-2'
import useOnClickOutside from '../../utils/useOnClickOutside'

const DashBoardNav = () => {
  const { page } = useRouter().query
  const id = page && (page[0] as string)
  const [toggle, setToggle] = useState(false)
  const {
    data: { list },
  } = useListSWR(id)

  useOnClickOutside((e) => {
    const target = (e.target as HTMLElement).closest(
      '[data-type = "dashboard_nav-popup"]'
    )
    target ? setToggle(true) : setToggle(false)
  })

  if (!list) return null

  const linkGroup: ResDataType[] = getDescendants<ResDataType>(list, id).filter(
    (item) => item.parent === id
  )

  const checkHasChild = (id: string) =>
    linkGroup.some((item) => item.parent === id)

  const currentLinkItem = list.find((item) => item.id === id)
  if (currentLinkItem) linkGroup.unshift({ ...currentLinkItem })
  const linkGroupMiddle = linkGroup.filter((_, index) => index !== 0)

  return (
    <DashboardNavbar>
      <motion.nav
        className="navbar-breadCrumb round_sm"
        whileTap={{ scale: 0.98, y: 1 }}
      >
        <ul>
          {linkGroup.map((item, index) => (
            <DashBoardNavBarLinkItem
              key={item.id}
              hasChild={checkHasChild(item.id as string)}
              {...item}
              index={index}
              lastIndex={linkGroup.length}
            />
          ))}
        </ul>
      </motion.nav>
      <AnimatePresence>
        {toggle && linkGroupMiddle.length > 0 && (
          <motion.div
            data-type="dashboard_nav-popup"
            className="navbar-popup round_sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ ease: 'easeInOut' }}
          >
            <Scrollbars tagName="ul" style={{ width: '100%', height: '7rem' }}>
              <li className="dashboard_popup-header" />
              {linkGroupMiddle.map((item) => (
                <DashboardPopupItem
                  key={item.id}
                  {...item}
                  hasChild={checkHasChild(item.id as string)}
                />
              ))}
              <li className="dashboard_popup-footer" />
            </Scrollbars>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="navbar-userOption">
        <NavbarOption />
      </div>
    </DashboardNavbar>
  )
}

export default React.memo(DashBoardNav)
