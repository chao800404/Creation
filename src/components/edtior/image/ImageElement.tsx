/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { Box } from '@udecode/plate-core'
import { ElementPopover } from '@udecode/plate-floating'
import { Caption, Image, Media } from '@udecode/plate-media'
import { useFocused, useReadOnly, useSelected } from 'slate-react'
import { ImageAdd } from '@styled-icons/boxicons-regular/ImageAdd'
import { saveAs } from 'file-saver'
import { motion, AnimatePresence } from 'framer-motion'
import {
  findNodePath,
  ImageElementProps,
  mediaFloatingOptions,
  setNodes,
  TImageElement,
  useEditorRef,
  useElement,
  removeNodes,
} from '@udecode/plate'
import {
  ImageComponentWrapper,
  BaseImageElementWrapper,
} from './imageElement.styles'
import useWindowPointerToggle from '../../../utils/useWindowPointerToggle'
import {
  Align,
  ImageElements,
  HandleUrlSet,
  BaseImageProps,
  ImagePopupItemProps,
} from './type'
import { ImageController } from './imageController'
import { BlockPopupElem } from '../blockPopup/blockPopup'
import InternalLink from '../blockPopup/internalLink'
import ExternalLink from '../blockPopup/externalLink'
import { ImagePopupItem } from './imagePopupItem'
import { UploadImageElement } from './uploadImageElement'
import { IMAGE_CONTROLLER_ITEMS } from './imageControllerItems'
import { OptionTool } from '@/components/optionTool/optionTool'

const labels = [
  { name: 'INTERNAL LINK' },
  { name: 'UPLOAD IMAGE' },
  { name: 'EXTERNAL LINK' },
]

const ImagePopup = ({
  toggle = true,
  handleUrlSet,
  handleHiddenPopup,
  items,
}: {
  toggle: boolean
  handleUrlSet: HandleUrlSet<ImagePopupItemProps>
  handleHiddenPopup: () => void
  items: ImagePopupItemProps[]
}) => {
  useEffect(() => {
    const handleOnKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleHiddenPopup()
    }

    document.addEventListener('keydown', handleOnKeydown)
    return () => document.removeEventListener('keydown', handleOnKeydown)
  }, [handleHiddenPopup])

  return (
    <AnimatePresence>
      {toggle && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="base_image-popup"
        >
          <BlockPopupElem
            labels={labels}
            items={items}
            renderItem={ImagePopupItem}
            handleUrlSet={handleUrlSet}
          >
            {React.createElement(InternalLink)}
            {React.createElement(UploadImageElement)}
            {React.createElement(ExternalLink)}
          </BlockPopupElem>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const BaseImageElement: React.FC<BaseImageProps<ImagePopupItemProps>> = ({
  handleUrlSet,
  children,
  items,
}) => {
  const { ref, toggle, handleToggleSet } =
    useWindowPointerToggle<HTMLDivElement>()

  const handleHiddenPopup = useCallback(() => {
    handleToggleSet(false)
  }, [handleToggleSet])

  useEffect(() => {
    if (!toggle) {
      ref.current?.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle])

  const hanldeOnKeydown = (e: React.KeyboardEvent) => {
    const { altKey, key } = e
    if (altKey && key === 'w') handleToggleSet(!toggle)
  }

  return (
    <BaseImageElementWrapper onKeyDown={hanldeOnKeydown} ref={ref} tabIndex={0}>
      <motion.div
        className="base_image"
        whileTap={{ y: 1, scale: 0.99 }}
        whileHover={{ backgroundColor: 'var(--colors-gray4)' }}
        contentEditable={false}
        onClick={(e) => {
          e.preventDefault()
          handleToggleSet(!toggle)
        }}
      >
        <span className="base_image-icon">
          <ImageAdd />
        </span>
        <span className="base_image_desc">Add am Image.</span>
        <span className="base_image-commad">( alt + w )</span>
      </motion.div>
      {children}
      <ImagePopup
        toggle={toggle}
        handleUrlSet={handleUrlSet}
        handleHiddenPopup={handleHiddenPopup}
        items={items}
      />
    </BaseImageElementWrapper>
  )
}

const ImageElement = React.memo(
  (props: ImageElementProps & { list: ImagePopupItemProps[] }) => {
    const {
      children,
      nodeProps,
      caption = {},
      resizableProps,
      ignoreReadOnly = false,
      list,
    } = props

    const { as, ...rootProps } = props
    const isFocused = useFocused()
    const isSelected = useSelected()
    const readOnly = useReadOnly()
    const element = useElement<ImageElements>()
    const editor = useEditorRef()
    const path = findNodePath(editor, element)
    const [dragging, setDragging] = useState(false)
    const { url, width, align = 'center', vertical = 'center' } = element
    const memoController = useMemo(() => IMAGE_CONTROLLER_ITEMS, [])

    const handleUrlSet: HandleUrlSet<ImagePopupItemProps> = useCallback(
      ({ src }) => {
        setNodes<TImageElement>(editor, { url: src }, { at: path })
      },
      [editor, path]
    )

    const setAlign = useCallback((align: Align) => {
      switch (align) {
        case 'center':
          return { marginLeft: 'auto', marginRight: 'auto' }
        case 'right':
          return { marginLeft: 'auto', marginRight: 'unset' }
        case 'left':
          return { marginLeft: 'unset', marginRight: 'auto' }
      }
    }, [])

    const ImageProps = {
      align,
      dragging,
      vertical,
      focused: isFocused && isSelected,
    }

    return url ? (
      <ElementPopover floatingOptions={mediaFloatingOptions}>
        <ImageComponentWrapper {...ImageProps}>
          <Media.Root {...rootProps}>
            <figure contentEditable={false}>
              <Media.Resizable
                handleComponent={{
                  left: <Box className="drag_box drag_box-1" />,
                  right: <Box className="drag_box drag_box-2" />,
                }}
                className="image_resizable"
                readOnly={!ignoreReadOnly && readOnly}
                style={setAlign(align)}
                {...resizableProps}
              >
                {!readOnly && (
                  <OptionTool className="image_controller" showHeight="215px">
                    <ImageController
                      items={memoController}
                      url={url}
                      editor={editor}
                      path={path}
                      element={element}
                    />
                  </OptionTool>
                )}
                <Image className="image_container" {...nodeProps} />
              </Media.Resizable>

              {!caption.disabled && (
                <Caption.Root
                  className="image_textarea"
                  style={{ width, ...setAlign(align) }}
                >
                  <Caption.Textarea
                    typeof="text"
                    placeholder={caption.placeholder ?? 'Write a caption...'}
                    readOnly={
                      (!ignoreReadOnly && readOnly) || !!caption.readOnly
                    }
                  />
                </Caption.Root>
              )}
            </figure>

            {children}
          </Media.Root>
        </ImageComponentWrapper>
      </ElementPopover>
    ) : (
      <BaseImageElement handleUrlSet={handleUrlSet} items={list}>
        {children}
      </BaseImageElement>
    )
  }
)

ImageElement.displayName = 'ImageElement'

export { ImageElement }
