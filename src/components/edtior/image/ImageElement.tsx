/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect, useState } from 'react'
import { Box } from '@udecode/plate-core'
import { ElementPopover } from '@udecode/plate-floating'
import { Caption, Image, Media } from '@udecode/plate-media'
import { useReadOnly } from 'slate-react'
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
  ImageControllerProps,
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
        whileHover={{ backgroundColor: 'rgb(57,57,57)' }}
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
    const [showPopup, setShowPopup] = useState(false)
    const readOnly = useReadOnly()
    const element = useElement<ImageElements>()
    const editor = useEditorRef()
    const path = findNodePath(editor, element)
    const [dragging, setDragging] = useState(false)
    const { url, width, align = 'center', vertical = 'center' } = element

    const {
      ref,
      toggle: focused,
      handleToggleSet,
    } = useWindowPointerToggle<HTMLDivElement>(() => {
      setDragging(false)
      setShowPopup(false)
    })

    useEffect(() => {
      handleToggleSet(true)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAlign: ImageControllerProps['handleAlign'] = useCallback(
      (align) => setNodes<TImageElement>(editor, { align }, { at: path }),
      [editor, path]
    )

    const handleUrlSet: HandleUrlSet<ImagePopupItemProps> = useCallback(
      ({ src }) => {
        setNodes<TImageElement>(editor, { url: src }, { at: path })
        setShowPopup(false)
      },
      [editor, path]
    )

    const handleVertical: ImageControllerProps['handleVertical'] = useCallback(
      (vertical) => setNodes<TImageElement>(editor, { vertical }, { at: path }),
      [editor, path]
    )

    const handleDownload = useCallback(() => saveAs(url, 'image.jpg'), [url])

    const handleDelete = useCallback(
      () => removeNodes(editor, { at: path }),
      [editor, path]
    )

    const handleShowPopup = useCallback(() => setShowPopup((prev) => !prev), [])
    const handleHiddenPopup = useCallback(() => setShowPopup(false), [])

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
      focused,
      dragging,
      vertical,
    }

    return url ? (
      // eslint-disable-next-line react/jsx-no-undef
      <ElementPopover floatingOptions={mediaFloatingOptions}>
        <ImageComponentWrapper {...ImageProps}>
          <Media.Root {...rootProps}>
            <figure
              contentEditable={false}
              ref={ref}
              onPointerDown={(e) => handleToggleSet(true)}
            >
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
                  <>
                    <div className="image_controller">
                      <ImageController
                        url={url}
                        align={align}
                        vertical={vertical}
                        showPopup={showPopup}
                        handleAlign={handleAlign}
                        handleVertical={handleVertical}
                        handleDownload={handleDownload}
                        handleDelete={handleDelete}
                        handleShowPopup={handleShowPopup}
                      />
                    </div>
                    <div className="image_popup">
                      <ImagePopup
                        toggle={showPopup}
                        handleUrlSet={handleUrlSet}
                        handleHiddenPopup={handleHiddenPopup}
                        items={list}
                      />
                    </div>
                  </>
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
