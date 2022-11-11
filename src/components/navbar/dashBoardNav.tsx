import React from 'react'
import NavbarOption from './navbarOption'
import { DashboardNavbar } from './navbar.styles'
import { useRouter } from 'next/router'
import { useListSWR } from '../../hook/useListSWR'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const DashBoardNav = () => {
  const { page } = useRouter().query
  const id = page && (page[0] as string)
  const {
    data: { title, emoji },
  } = useListSWR(id)

  return (
    <DashboardNavbar>
      <motion.nav
        className="navbar-breadCrumb"
        whileTap={{ scale: 0.98, y: 1 }}
      >
        <ul>
          <li>
            {emoji && (
              <Image
                src={emoji as string}
                width="20"
                height="20"
                alt={title as string}
                objectFit="cover"
              />
            )}
            <Link href={`dashboard/${id}`}>
              <a>{title}</a>
            </Link>
          </li>
        </ul>
      </motion.nav>
      <div className="navbar-userOption">
        <NavbarOption />
      </div>
    </DashboardNavbar>
  )
}

export default React.memo(DashBoardNav)
