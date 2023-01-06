import { ResDataType } from '../../../hook/useListSWR'
import { ButtonBlockPopupListItemWrapper } from './buttonBlock.styles'
import { ButtonBlockPopupListItemProps } from './type'
import { TypeIcon } from '../../drop/treeView/typeIcon'
import { Heightlight } from '../../heightLight'
import { BsArrowReturnLeft, BsStarFill } from 'react-icons/bs'
import { AiOutlineHistory } from 'react-icons/ai'

export const ButtonBlockPopupListItem: React.FC<
  ButtonBlockPopupListItemProps<ResDataType>
> = ({
  node,
  hasChild,
  parentNode,
  onClick,
  searchFields,
  isActive,
  isFavorite,
}) => (
  <ButtonBlockPopupListItemWrapper onClick={onClick} isActive={isActive}>
    <span className="popup_list-icon">
      <TypeIcon
        isOpen={true}
        hasChild={hasChild}
        node={node}
        iconSize="1.5rem"
      />
    </span>
    <div className="popup_list-text">
      <Heightlight
        text={node.text && node.text.length > 0 ? node.text : 'Untitled'}
        className="match"
        searchFields={searchFields}
      />
      <p>{`From ${parentNode?.text}`}</p>
    </div>
    <div className="popup_list-link">
      {searchFields ? (
        isFavorite ? (
          <BsStarFill />
        ) : (
          <BsArrowReturnLeft />
        )
      ) : (
        <AiOutlineHistory />
      )}
    </div>
  </ButtonBlockPopupListItemWrapper>
)
