import React, { useCallback } from 'react'
import { ExpandableHeadingWrapper } from './expandableHeading.styles'
import { LeftArrow } from '@styled-icons/boxicons-solid/LeftArrow'
import {
  setNodes,
  findNodePath,
  selectEditor,
  getEndPoint,
  getFirstNode,
  StyledElementProps,
} from '@udecode/plate'
import { MyExpandableHeading } from '../plateTypes'

type ExpandableHeadingElementProps = StyledElementProps<
  MyExpandableHeading[],
  MyExpandableHeading
>

export const ExpandableHeadingElement = (
  props: ExpandableHeadingElementProps
) => {
  const { element, children, editor } = props
  const [title, ...other] = children
  const path = findNodePath(editor, element)

  const handleShow = useCallback(() => {
    setNodes(editor, { show: !element.show }, { at: path })

    if (path) {
      const titleNode = getFirstNode(editor, path)
      element.show
        ? selectEditor(editor, { at: getEndPoint(editor, titleNode[1]) })
        : selectEditor(editor, { at: getEndPoint(editor, path) })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  return (
    <ExpandableHeadingWrapper open={element.show}>
      <span className="arrow" onClick={handleShow}>
        <span>
          <LeftArrow />
        </span>
      </span>

      <div className="title">
        <span>{title}</span>
      </div>
      {element.show && <div className="content">{other}</div>}
    </ExpandableHeadingWrapper>
  )
}
