import { ImageControllerItem, PathType } from './imageControllerItems'
import React from 'react'
import { PlateEditor, Value } from '@udecode/plate'
import { ImageControllBtn } from './imageElement.styles'
import { StyledIcon } from '@styled-icons/styled-icon'
import { ImageElements } from './type'

type ImageControllerProps = {
  items: ImageControllerItem[]
  editor: PlateEditor<Value>
  element: ImageElements
} & PathType

export const ImageController = React.memo(
  ({ items, path, url, editor, element }: ImageControllerProps) => {
    const render = React.useCallback(
      (icon: StyledIcon) => React.createElement(icon),
      []
    )

    const { vertical, align } = element

    console.log(element)

    return (
      <>
        {items.map((item, i) => (
          <ImageControllBtn
            key={`${item.name}_${i}`}
            onClick={() => item.command(editor, { path, url })}
            isActive={
              item.pos === element.align || item.pos === element.vertical
            }
          >
            <span className="image_controller-icon">{render(item.icon)}</span>
            <span className="image_controller-desc">{item.name}</span>
          </ImageControllBtn>
        ))}
      </>
    )
  }
)

ImageController.displayName = 'ImageController'
