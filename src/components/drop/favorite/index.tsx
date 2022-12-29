import { memo } from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../itemTypes'
import FavoriteTag from './favoriteTag'
import { ResDataType } from '../../../hook/useListSWR'
import { FavoriteContainerWrappr } from './favorite.styles'
import { FavoriteTagType, FavoriteContainerType, DragItem } from './favorite'
import { ItemTypes as TreeType } from '@minoru/react-dnd-treeview'
import { MenuType } from '../../layout/dashboard'
import { HandleRename } from '../treeView/type'

const FavoriteContainer: React.FC<FavoriteContainerType<ResDataType>> = memo(
  ({ children, updateFavorite }) => {
    const accept = [ItemTypes.Label, TreeType.TREE_ITEM]
    const [{ isOver, draggingItem, canDrop }, drop] = useDrop(() => ({
      accept,
      drop(_item: DragItem, monitor) {
        if (_item.id) updateFavorite(_item.id)
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        draggingItem: monitor.getItemType(),
      }),
    }))

    const isActive =
      canDrop && isOver && draggingItem && accept.includes(draggingItem)

    return (
      <FavoriteContainerWrappr
        isActive={!!isActive}
        ref={drop}
        role="FavoriteContainer"
      >
        {children}
      </FavoriteContainerWrappr>
    )
  }
)

FavoriteContainer.displayName = 'FavoriteContainer'

const StatefulFavoriteContainer: React.FC<
  FavoriteTagType<ResDataType, MenuType<ResDataType, HandleRename>>
> = ({ list, id, menuMap, updateFavorite }) => {
  return (
    <FavoriteContainer list={list} updateFavorite={updateFavorite}>
      <FavoriteTag list={list} id={id} menuMap={menuMap} />
    </FavoriteContainer>
  )
}

export default StatefulFavoriteContainer
