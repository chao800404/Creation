import { ImageItemButtonProps, ImageItemPopupBtnProps } from './type'
import React from 'react'
import { motion } from 'framer-motion'
import Tippy from '@tippyjs/react'
import { ImageItemOptionButtonWrapper } from './imageBlock.styles'

const variants = {
  onTap: {
    y: 1,
    scale: 0.98,
  },
}

export const ImageItemPopupBtn = React.memo(
  ({
    desc,
    className,
    content,
    icon: Icon,
    visible,
    show,
    hide,
  }: ImageItemPopupBtnProps) => {
    return (
      <Tippy
        content={<>{!!content ? content() : <></>}</>}
        interactive={true}
        interactiveBorder={20}
        visible={visible}
        onClickOutside={hide}
        appendTo="parent"
      >
        <motion.span
          whileTap="onTap"
          className={`img_item-img-btn center ${className}`}
          variants={variants}
          onMouseDown={(e) => {
            e.preventDefault()
            visible ? hide() : show()
          }}
        >
          <span className="img_item-content-icon">
            <Icon />
          </span>
          {!!desc && <span className="img_item-content-desc">{desc}</span>}
        </motion.span>
      </Tippy>
    )
  }
)

ImageItemPopupBtn.displayName = 'ImageItemPopupBtn'

export const ImageItemButton = React.memo(
  ({
    icon: Icon,
    desc,
    className,
    format,
    editor,
    element,
  }: ImageItemButtonProps) => {
    return (
      <Tippy content={desc} delay={500} appendTo="parent">
        <motion.span
          whileTap="onTap"
          className={`img_item-img-btn ${className}`}
          variants={variants}
          onMouseDown={() => format({ editor, element })}
        >
          <span className="img_item-content-icon">
            <Icon />
          </span>
        </motion.span>
      </Tippy>
    )
  }
)

ImageItemButton.displayName = 'ImageItemButton'

export const ImageItemOptionButton = React.memo(
  ({
    icon: Icon,
    desc,
    className,
    format,
    editor,
    element,
  }: ImageItemButtonProps) => {
    return (
      <ImageItemOptionButtonWrapper
        onMouseDown={() => format({ editor, element })}
      >
        <span className="img_item-content-icon">
          <Icon />
        </span>
        <span>{desc}</span>
      </ImageItemOptionButtonWrapper>
    )
  }
)

ImageItemOptionButton.displayName = 'ImageItemOptionButton'
