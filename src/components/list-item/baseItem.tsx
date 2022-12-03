import React from 'react'
import IconContainer from '../iconContainer/iconContainer'
import { IconType } from 'react-icons'
import { BaseItemWrapper, BaseItem } from './item.styles'

type BaseItemProps = BaseItem & {
  text: string
  icon?: IconType
  children?: JSX.Element[]
  fontSize?: string
  width?: number
  fontWeight?: string
}

const BaseItem: React.FC<BaseItemProps> = ({
  text,
  icon,
  children,
  width,
  fontWeight,
}) => {
  return (
    <BaseItemWrapper>
      {icon ? (
        <div className="base_item-icon">
          <IconContainer color="inherit" icon={icon} />
        </div>
      ) : (
        <div className="base_item-icon"></div>
      )}
      {children}
      <p
        style={{
          width: `${width}px`,
          fontWeight: fontWeight,
        }}
        className="base_item-header"
      >
        {text}
      </p>
    </BaseItemWrapper>
  )
}

export default React.memo(BaseItem)
// <Flex cursor="pointer" align="center" p="2px 0">
//   {icon && <IconContainer color={color} icon={icon} />}
//   {children}
//   <Text ml="2" fontSize={`${fontSize ? fontSize : 'sm'}`} {...otherProps}>
//     {text}
//   </Text>
// </Flex>
