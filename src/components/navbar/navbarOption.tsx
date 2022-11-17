import React from 'react'
import { motion } from 'framer-motion'

import UserPopup from '../popup/userPopup'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { FiLock, FiUnlock } from 'react-icons/fi'
import ControllDataIcon from '../iconContainer/controllDataIcon'
import { usePageControllerStore } from '../../store'
import shallow from 'zustand/shallow'
import { NavbarOptionWrapper } from './navbar.styles'
import { useRouter } from 'next/router'
import { useListSWR } from '../../hook/useListSWR'

const NavbarOption = () => {
  const { page } = useRouter().query
  const userPopupOpen = usePageControllerStore(
    (state) => state.userPopupOpen,
    shallow
  )
  const id = (page && (page[0] as string)) || ''

  const {
    data: { favorite, editable },
    mutateFunction,
  } = useListSWR(id)

  return (
    <NavbarOptionWrapper>
      <motion.div
        className="navbar_option-container round_m"
        animate={userPopupOpen ? { x: '-0.5rem', y: '0.5rem' } : {}}
        style={{
          gap: id ? '0.8rem' : '0',
        }}
      >
        <ControllDataIcon
          onClick={() =>
            mutateFunction.updatePageItem(id, 'editable', !editable)
          }
          toggle={editable as boolean}
          openIcon={FiUnlock}
          closeIcon={FiLock}
          openIconDesc="Reading"
          closeIconDesc="Editing"
          id={id}
        />

        <ControllDataIcon
          onClick={() => {
            mutateFunction.updatePageItem(id, 'favorite', !favorite)
          }}
          toggle={favorite as boolean}
          openIcon={AiFillStar}
          closeIcon={AiOutlineStar}
          id={id}
        />

        <UserPopup />
      </motion.div>
    </NavbarOptionWrapper>
  )
}

export default React.memo(NavbarOption)
