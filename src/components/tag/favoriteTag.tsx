import React from 'react'
import Accordion from '../accordion/accordion'
import { usePageControllerStore } from '../../store'
import SideContainer from '../container/sideContainer'
import shallow from 'zustand/shallow'
import { SIDE_OPTION } from '../../utils/config'
import { ListDataType } from '../../hook/useListSWR'
const { favorite } = SIDE_OPTION

const FavoriteTag = ({ list }: { list: ListDataType[] }) => {
  const { favoriteTagOpen, favoriteTagToggle } = usePageControllerStore(
    (state) => ({
      favoriteTagOpen: state.favoriteTagOpen,
      favoriteTagToggle: state.favoriteTagToggle,
    }),
    shallow
  )

  return (
    <>
      <div
        className="caption"
        style={{ borderBottom: favoriteTagOpen ? '1px solid' : 'unset' }}
      >
        <Accordion
          text={favorite.text}
          open={favoriteTagOpen}
          onClick={() => favoriteTagToggle(!favoriteTagOpen)}
        />
      </div>
      {favoriteTagOpen && (
        <SideContainer
          height="5rem"
          maxH="10rem"
          list={list.filter((item) => item.favorite)}
        />
      )}
    </>
  )
}

export default FavoriteTag
