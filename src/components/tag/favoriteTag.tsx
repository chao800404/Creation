import React from 'react'
import Accordion from '../accordion/accordion'
import { useLayoutControllerStore } from '../../store'
import SideContainer from '../container/sideContainer'
import shallow from 'zustand/shallow'
import { SIDE_OPTION } from '../../utils/config'
import { Emoji, List } from '@prisma/client'

const { favorite } = SIDE_OPTION

const FavoriteTag = ({ list }: { list: (List & { emoji: Emoji })[] }) => {
  const { favoriteTagOpen, favoriteTagToggle } = useLayoutControllerStore(
    (state) => ({
      favoriteTagOpen: state.favoriteTagOpen,
      favoriteTagToggle: state.favoriteTagToggle,
    }),
    shallow
  )

  return (
    <>
      <div style={{ borderBottom: favoriteTagOpen ? '1px solid' : 'unset' }}>
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
