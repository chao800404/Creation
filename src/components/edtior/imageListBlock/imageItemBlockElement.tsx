/* eslint-disable @next/next/no-img-element */
import React, { useCallback } from 'react'
import { ImageItemWrapper } from './imageBlock.styles'
import {
  BUTTON_ITEMS,
  ImageItemBtnProps,
  BUTTON_HASURL_ITEMS,
} from './buttonItems'
import { useReadOnly } from 'slate-react'
import { findNodePath, getAboveNode, setNodes } from '@udecode/plate'
import { DragIndicator } from '@styled-icons/material/DragIndicator'
import { useDragNode, useDropNode } from '../dnd'
import { updateNodePostion } from '../transform/updateNodePostion'
import useMergedRef from '@react-hook/merged-ref'
import { BlockPopupElem } from '../blockPopup'
import { ImagePopupItem } from '../image/imagePopupItem'
import InternalLink from '../blockPopup/internalLink'
import { UploadImageElement } from '../image/uploadImageElement'
import ExternalLink from '../blockPopup/externalLink'
import { ImagePopupItemProps } from '../image/type'
import {
  ImageItemButton,
  ImageItemOptionButton,
  ImageItemPopupBtn,
} from './imageItemButton'
import { saveAs } from 'file-saver'
import { motion } from 'framer-motion'
import { ImageItemElement } from './type'
import { ELEMENT_IMAGE_ITEM_BLOCK } from './imageListBlockPlugin'
import { variants } from './utils/animate'
import { OptionTool } from '@/components/optionTool/optionTool'

const labels = [
  { name: 'INTERNAL LINK' },
  { name: 'UPLOAD IMAGE' },
  { name: 'EXTERNAL LINK' },
]

export const ImageItemBlockElement = (
  props: ImageItemElement & { list: ImagePopupItemProps[] }
) => {
  const readOnly = useReadOnly()
  const elemRef = React.useRef(null)
  const dragWrapperRef = React.useRef(null)
  const { children, editor, element, list } = props
  const [visible, setVisible] = React.useState(false)

  const path = findNodePath(editor, element)

  const focus = getAboveNode(editor, {
    match: { type: ELEMENT_IMAGE_ITEM_BLOCK, id: element.id },
  })

  const show = () => setVisible(true)
  const hide = () => setVisible(false)
  const { drag, preview } = useDragNode({
    editor,
    item: element,
    sourceType: 'imgBlock',
  })

  const { drop } = useDropNode({ sourceType: 'imgBlock' }, (item) => {
    updateNodePostion(editor, {
      dragId: element.id as string,
      hoverId: item.id as string,
    })
  })

  const multiDragRef = useMergedRef(drag, dragWrapperRef)

  const handleUrlSet = useCallback(
    (props: ImagePopupItemProps) => {
      setNodes(editor, { url: props.src }, { at: path })
      hide()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [path]
  )

  const renderPopup = useCallback(() => {
    return (
      <BlockPopupElem
        labels={labels}
        items={list}
        renderItem={ImagePopupItem}
        handleUrlSet={handleUrlSet}
      >
        {React.createElement(InternalLink)}
        {React.createElement(UploadImageElement)}
        {React.createElement(ExternalLink)}
      </BlockPopupElem>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderButton = useCallback(
    (item: ImageItemBtnProps, i: number) => {
      switch (item.className) {
        case 'add':
          return (
            <ImageItemPopupBtn
              key={`${item.desc}_${i}`}
              {...item}
              element={element}
              editor={editor}
              content={renderPopup}
              visible={visible}
              hide={hide}
              show={show}
              desc={item.desc}
            />
          )
        case 'download':
          return (
            !!element.url && (
              <ImageItemButton
                key={`${item.desc}_${i}`}
                element={element}
                editor={editor}
                {...item}
                format={() => saveAs(element.url as string, 'image.jpg')}
              />
            )
          )
        default:
          return (
            <ImageItemButton
              key={`${item.desc}_${i}`}
              element={element}
              editor={editor}
              {...item}
            />
          )
      }
    },

    [editor, element, renderPopup, visible]
  )

  const renderOption = useCallback(
    (item: ImageItemBtnProps, i: number) => {
      switch (item.className) {
        case 'download':
          return (
            !!element.url && (
              <ImageItemOptionButton
                key={`${item.desc}_${i}`}
                element={element}
                editor={editor}
                desc={item.desc}
                format={() => saveAs(element.url as string, 'image.jpg')}
                {...item}
              />
            )
          )
        default:
          return (
            <ImageItemOptionButton
              key={`${item.desc}_${i}`}
              {...item}
              element={element}
              editor={editor}
              content={renderPopup}
              visible={visible}
              hide={hide}
              show={show}
              desc={item.desc}
            />
          )
      }
    },
    [editor, element, renderPopup, visible]
  )

  drop(preview(elemRef))

  return (
    <ImageItemWrapper isActive={!!focus} hasImage={!!element.url}>
      <motion.div
        className="img_item-content"
        ref={elemRef}
        transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
        variants={variants}
        animate={focus && !readOnly ? 'active' : 'init'}
        style={{ zIndex: `${visible ? '1' : '0'}` }}
      >
        <div className="img_item-img" contentEditable={false}>
          <>
            {!readOnly && (
              <div className="drag" ref={multiDragRef}>
                <span>
                  <DragIndicator />
                </span>
              </div>
            )}
            {element.url && (
              <div
                className="img_item-img-x"
                style={{
                  backgroundImage: `url(${element.url})`,
                }}
              />
            )}
            {!readOnly &&
              (element.url ? (
                <OptionTool className="option">
                  {BUTTON_HASURL_ITEMS.map((item, i) => renderOption(item, i))}
                </OptionTool>
              ) : (
                BUTTON_ITEMS.map((item, i) => renderButton(item, i))
              ))}
          </>
        </div>
        <div className="img_item-desc">{children}</div>
      </motion.div>
    </ImageItemWrapper>
  )
}
