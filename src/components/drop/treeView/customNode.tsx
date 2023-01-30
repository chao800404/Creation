/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { MdDragIndicator } from 'react-icons/md'
import { CustomNodeWrapper } from './treeView.styles'
import { BsCaretRightFill } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'
import { TypeIcon } from './typeIcon'
import { CustomNodeType, ShowMenuProps } from './type'
import { useMenuPopupStore } from '../../../store/useMenuPopupStore'
import WrapperRename from '../../wrapper/wrapperRename'
import useWindowPointerToggle from '../../../utils/useWindowPointerToggle'

import Link from 'next/link'
import { useLabelStore, addLabel } from '../../../store/useLabelStore'
import { shallow } from 'zustand/shallow'
import { useRouter } from 'next/router'

export const CustomNode: React.FC<CustomNodeType> = (props) => {
  const {
    node,
    handleRef,
    isSelected,
    depth,
    testIdPrefix = '',
    isOpen,
    onToggle,
    addNewPage,
    hasChild,
    showMenu,
    updatePageConfig,
  } = props

  const router = useRouter()
  const indent = depth * 22
  const text = node.text && node.text.length > 0 ? node.text : 'Untitled'
  const [nextText, setNextText] = useState(text)

  const { ref, toggle, handleToggleSet } = useWindowPointerToggle((target) => {
    const show = useMenuPopupStore.getState().show
    if (!target || (target.id !== node.id && show)) updateText()
  })

  const updateText = () => {
    if (nextText.length > 0 && text !== nextText) {
      updatePageConfig(node.id as string, 'title', nextText)
      setNextText('')
      handleToggleSet(false)
    }
  }

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onToggle(node.id)
    updatePageConfig(node.id as string, 'shouldShow', !isOpen)
  }

  const handleAddNewPage = (e: React.PointerEvent) => {
    e.preventDefault()
    addNewPage(`${node.id}`)
  }

  const targetProps = (e: React.PointerEvent): ShowMenuProps => {
    if (e.button === 2) {
      const x = e.pageX
      const y = e.pageY
      return {
        x,
        y,
        dataType: 'tree-node',
        node,
        handleRename: () => handleToggleSet(true),
      }
    }
  }

  useEffect(() => {
    const elem = ref.current
    const parentElem = elem?.parentElement?.parentElement

    if (elem && parentElem) {
      if (indent > 0) {
        parentElem.style.setProperty('--left', `${indent}px`)
        parentElem.style.setProperty('--visible', 'visible')
      } else {
        parentElem.style.setProperty('--visible', 'hidden')
      }
    }
  }, [])

  return (
    <>
      <CustomNodeWrapper
        id={`${node.id}`}
        style={{
          paddingInlineStart: indent,
        }}
        data-type="tree-node"
        isSelected={isSelected}
        showInput={toggle}
        data-testid={`${testIdPrefix}custom-node-${node.id}`}
        isParent={node.parent === 0}
        ref={ref}
        onPointerDown={(e) => showMenu && showMenu(targetProps(e))}
        onPointerUp={(e) => e.buttons === 0 && addLabel(node)}
        onMouseEnter={() => router.prefetch(`dashboard/${node.id}`)}
      >
        <Link href={`/dashboard/${node.id}`}>
          <div className="root">
            <div
              className={`expand ${isOpen ? 'isOpen' : ''}`}
              onClick={handleToggle}
            >
              <div className="center arrow_icon">
                <BsCaretRightFill />
              </div>
            </div>
            <div className="center type_icon">
              <TypeIcon {...props} />
            </div>
            <div className="label">
              <WrapperRename
                text={text}
                width={`calc(100% - ${indent + 30}px)`}
                onChange={(e) => setNextText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && updateText()}
                showInput={toggle}
                fontWeight={node.parent === 0 ? 800 : 0}
              />
            </div>
            {!toggle && (
              <div className="controller">
                <div
                  className="handle drag-handle center"
                  ref={handleRef}
                  data-testid={`drag-handle-${node.id}`}
                >
                  <MdDragIndicator />
                </div>
                <div className="add-page-icon" onPointerDown={handleAddNewPage}>
                  <AiOutlinePlus />
                </div>
              </div>
            )}
          </div>
        </Link>
      </CustomNodeWrapper>
      {!hasChild && isOpen && (
        <div
          style={{
            paddingInlineStart: indent,
            marginLeft: '2.2rem',
            height: '24px',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          No page inside
        </div>
      )}
    </>
  )
}
