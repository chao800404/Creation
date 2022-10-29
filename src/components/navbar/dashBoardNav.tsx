import React from 'react'
import NavbarOption from './navbarOption'
import { DashboardNavbar } from './navbar.styles'

const DashBoardNav = () => {
  // const { favorite, editable, id } = usePageStore(
  //   (state) => ({
  //     favorite: state.curItem?.favorite,
  //     editable: state.curItem?.editable,
  //     id: state.id,
  //   }),
  //   shallow
  // )

  // const { id, title, emoji, favorite, editable, stateAndItemUpdateAsync } =
  //   useListStore(
  //     (state) => ({
  //       id: state.id,
  //       title: state.title,
  //       emoji: state.emoji,
  //       favorite: state.favorite,
  //       editable: state.editable,
  //       stateAndItemUpdateAsync: state.stateAndItemUpdateAsync,
  //     }),
  //     shallow
  //   )

  // const { toggleEditable, toggleFavorite } = useStore(
  //   (state) => ({
  //     toggleFavorite: state.toggleFavorite,
  //     toggleEditable: state.toggleEditable,
  //   }),
  //   shallow
  // )

  // useEffectFetch(start, setStart, 'updateFavorite', id, favorite)

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
