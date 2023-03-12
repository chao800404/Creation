import {
  setNodes,
  findNodePath,
  moveChildren,
  getAboveNode,
  insertText,
} from '@udecode/plate'
import { LinkButtonWrapper } from './linkButton.styles'
import { Gear } from '@styled-icons/evil/Gear'
import React, { useCallback } from 'react'
import { LinkButtonPopup } from './linkButtonPopup'
import { LinkButtonElem, LinkItem } from './type'
import { useRouter } from 'next/router'
import { useFocused, useReadOnly, useSelected } from 'slate-react'
import useWindowPointerToggle from '../../../utils/useWindowPointerToggle'
import { httpParser } from '../../../utils/filterFile'
import { ELEMENT_LINK_BUTTON } from './linkButtonPlugin'

export const LinkButtonElement = (props: LinkButtonElem<LinkItem>) => {
  const textAlign = props?.style?.textAlign
  const router = useRouter()
  const selected = useSelected()
  const focused = useFocused()

  const { ref, toggle, handleToggleSet } =
    useWindowPointerToggle<HTMLDivElement>()

  const { children, list, editor, element } = props
  const path = findNodePath(editor, element)
  const readOnly = useReadOnly()

  const handleSet = useCallback(
    ({ src, name, emoji }: LinkItem) => {
      if (path) {
        const parse = !httpParser(src)
        const host = (!parse && new URL(src).host) || ''
        moveChildren(editor, { at: path, to: path })
        insertText(editor, parse ? name : host, { at: path })
        setNodes(editor, { src, emoji: parse ? emoji : '🔗' }, { at: path })
        handleToggleSet(false)
      }
    },
    [editor, path, handleToggleSet]
  )

  const handleTransferPath = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      if (element.src && readOnly) {
        if (!httpParser(element.src)) router.push(element.src)
        else window.open(element.src, '_black')?.focus()
      }
    },
    [element.src, router, readOnly]
  )

  return (
    <LinkButtonWrapper
      style={{ justifyContent: textAlign || 'left' }}
      open={toggle}
      isFocus={selected && focused}
    >
      <div ref={ref}>
        <button className="link_button-container" onClick={handleTransferPath}>
          <span className="link_button-content">
            {!!element.emoji && (
              <span
                contentEditable={false}
                className="link_button-content-emoji"
              >
                {element.emoji}
              </span>
            )}
            <span className="link_button-content-name">{children}</span>
          </span>

          {!readOnly && (
            <span
              onClick={() => handleToggleSet(!toggle)}
              className="link_button-controller center"
              contentEditable={false}
            >
              <Gear />
            </span>
          )}
        </button>
        <div className="link_button-popup">
          <LinkButtonPopup
            toggle={toggle}
            items={list}
            handleSetSrc={handleSet}
          />
        </div>
      </div>
    </LinkButtonWrapper>
  )
}
