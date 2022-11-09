import React, { useEffect } from 'react'
import { IoLogOutOutline } from 'react-icons/io5'
import { AiFillSetting } from 'react-icons/ai'
import { RiArrowDropDownLine } from 'react-icons/ri'

import Image from 'next/image'
import { truncatedText } from '../../utils/truncatedText'
import { signOut, useSession } from 'next-auth/react'
import UserPopupItem from '../list-item/UserPopupItem'
import { useUserStore } from '../../store'
import shallow from 'zustand/shallow'
import { usePageControllerStore } from '../../store'
import { UserPopupWrapper } from './popup.styles'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

const variants = {
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
    },
  },
  hidden: {
    opacity: 0,
  },
}

const UserPopup: React.FC = () => {
  const { data, status } = useSession()
  const { name, email, image } = useUserStore((state) => state.user, shallow)
  const { userPopupOpen, userPopupToggle } = usePageControllerStore(
    (state) => ({
      userPopupToggle: state.userPopupToggle,
      userPopupOpen: state.userPopupOpen,
    }),
    shallow
  )

  const router = useRouter()

  const userSet = useUserStore((state) => state.userSet, shallow)

  useEffect(() => {
    if (status === 'authenticated') {
      const { user } = data
      if (user) {
        for (const [key, value] of Object.entries(user)) {
          userSet(key, value as string)
        }
      }
    }
  }, [data, status, userSet])

  if (status === 'loading') {
    return (
      <div style={{ height: '100vh' }}>
        <div>Loading...</div>
      </div>
    )
  }
  const handleOnClick = (e: React.MouseEvent) => {
    const target = (e.target as HTMLDivElement).id
    if (target === 'logout-icon') {
      router.push('/')
      router.events.on('routeChangeComplete', signOut)
    }
    userPopupToggle(!userPopupOpen)
  }

  return (
    <>
      <UserPopupWrapper onClick={handleOnClick}>
        <div className="userpopup_container">
          <div className="userpopup_container-image">
            {image && <Image src={image} width="40" height="40" alt={email} />}
          </div>
          <div className="userpopup_container-name">
            {name ? name : truncatedText(email, 10)}
          </div>
          <div className="userpopup_container-icon">
            <RiArrowDropDownLine fontSize="1.5rem" />
          </div>
        </div>

        <motion.div
          className="userpopup_main"
          initial="hidden"
          animate={userPopupOpen ? 'show' : 'hidden'}
          variants={variants}
          style={{
            visibility: userPopupOpen ? 'visible' : 'hidden',
          }}
        >
          <div className="userpopup_main-header">
            {image && (
              <Image
                className="userpopup_main-header-image"
                src={image}
                width="30"
                height="30"
                alt={email}
              />
            )}
            <p>{email}</p>
          </div>
          <div className="userpopup_main-item">
            <UserPopupItem text="Profile setting" icon={AiFillSetting} />
          </div>
          <div id="logout-icon" className="userpopup_main-item">
            <UserPopupItem text="Log out" icon={IoLogOutOutline} />
          </div>
        </motion.div>
      </UserPopupWrapper>
    </>
  )
}

export default React.memo(UserPopup)
