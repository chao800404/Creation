import React, { useCallback, useMemo } from 'react'
import { ExpandableHeadingWrapper } from './expandableHeading.styles'
import { LeftArrow } from '@styled-icons/boxicons-solid/LeftArrow'
import {
  setNodes,
  findNodePath,
  selectEditor,
  getEndPoint,
  getFirstNode,
  StyledElementProps,
  getAboveNode,
  getParentNode,
} from '@udecode/plate'
import { MyExpandableHeading } from '../plateTypes'
import { useReadOnly } from 'slate-react'
import { motion } from 'framer-motion'
import {
  ELEMENT_EXPANDABLE_HEADING_1,
  ELEMENT_EXPANDABLE_HEADING_2,
  ELEMENT_EXPANDABLE_HEADING_3,
} from '.'

type ExpandableHeadingElementProps = StyledElementProps<
  MyExpandableHeading[],
  MyExpandableHeading
>

const variants = {
  open: {
    boxShadow: '0 0 0 0.2rem rgba(0,0,0,0.3)',
  },
  closed: {
    boxShadow: '0 0 0 1rem rgba(0,0,0,0)',
  },
}

export const ExpandableHeadingElement = (
  props: ExpandableHeadingElementProps
) => {
  const { element, children, editor } = props
  const [title, ...other] = children
  const path = findNodePath(editor, element)
  const readOnly = useReadOnly()
  const node = getAboveNode(editor, {
    match: {
      type: [
        ELEMENT_EXPANDABLE_HEADING_1,
        ELEMENT_EXPANDABLE_HEADING_2,
        ELEMENT_EXPANDABLE_HEADING_3,
      ],
    },
  })

  const focus = useMemo(() => node?.[0].id === element.id, [element.id, node])

  const handleShow = useCallback(() => {
    if (readOnly) return
    setNodes(editor, { show: !element.show }, { at: path })

    if (path) {
      const titleNode = getFirstNode(editor, path)
      element.show
        ? selectEditor(editor, { at: getEndPoint(editor, titleNode[1]) })
        : selectEditor(editor, { at: getEndPoint(editor, path) })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, readOnly])

  return (
    <ExpandableHeadingWrapper open={element.show} focus={focus}>
      <span className="open_icon" onClick={handleShow} contentEditable={false}>
        <motion.span
          variants={variants}
          animate={element.show ? 'open' : 'closed'}
          className="open_icon-content"
        />
      </span>
      <div contentEditable={false} className="border">
        <span />
      </div>
      <div className="title">
        <span>{title}</span>
      </div>
      {element.show && <div className="content">{other}</div>}
    </ExpandableHeadingWrapper>
  )
}
