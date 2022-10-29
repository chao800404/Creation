import React from 'react'
import { motion } from 'framer-motion'

import UserPopup from '../popup/userPopup'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { FiLock, FiUnlock } from 'react-icons/fi'
import ControllDataIcon from '../iconContainer/controllDataIcon'
import { useLayoutControllerStore, usePageStore } from '../../store'
import shallow from 'zustand/shallow'
import { NavbarOptionWrapper } from './navbar.styles'

const NavbarOption = () => {
  const userPopupOpen = useLayoutControllerStore(
    (state) => state.userPopupOpen,
    shallow
  )

  const stateAndItemUpdateAsync = usePageStore(
    (state) => state.stateAndItemUpdateAsync,
    shallow
  )

  const { favorite, editable, id } = usePageStore(
    (state) => ({
      favorite: state.curItem?.favorite,
      editable: state.curItem?.editable,
      id: state.id,
    }),
    shallow
  )

  return (
    <NavbarOptionWrapper>
      <motion.div
        className="navbar_option-container"
        animate={userPopupOpen ? { x: '-0.5rem', y: '0.5rem' } : {}}
        style={{
          gap: id ? '0.8rem' : '0',
        }}
      >
        <ControllDataIcon
          onClick={() => stateAndItemUpdateAsync(id, 'editable', !editable)}
          toggle={editable as boolean}
          openIcon={FiUnlock}
          closeIcon={FiLock}
          openIconDesc="Reading"
          closeIconDesc="Editing"
          id={id}
        />

        <ControllDataIcon
          onClick={() => {
            stateAndItemUpdateAsync(id, 'favorite', !favorite)
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
