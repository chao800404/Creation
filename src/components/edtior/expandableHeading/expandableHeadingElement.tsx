import React, { useCallback, useMemo } from 'react'
import { ExpandableHeadingWrapper } from './expandableHeading.styles'
import {
  setNodes,
  findNodePath,
  selectEditor,
  getEndPoint,
  getFirstNode,
  StyledElementProps,
  select,
} from '@udecode/plate'
import { MyExpandableHeading } from '../plateTypes'
import { useFocused, useReadOnly, useSelected } from 'slate-react'
import { motion, AnimatePresence } from 'framer-motion'

type ExpandableHeadingElementProps = StyledElementProps<
  MyExpandableHeading[],
  MyExpandableHeading
>

const variants = {
  init: {
    boxShadow: '0 0 0 0.3rem rgba(0,0,0,0)',
  },
  open: {
    boxShadow: '0 0 0 0.2rem rgba(0,0,0,0.3)',
  },
  hover: {
    boxShadow: '0 0 0 0.2rem rgba(0,0,0,0.3)',
    transition: {
      repeat: Infinity,
      duration: 1,
    },
  },
  closed: {
    boxShadow: '0 0 0 0.5rem rgba(0,0,0,0)',
  },
}

const container = {
  open: { opacity: 1 },
  closed: {
    opacity: 0,
    height: 0,
    overflow: 'hidden',
    transition: { when: 'afterChildren' },
  },
}

const item = {
  closed: {
    opacity: 0,
    transition: { type: 'tween' },
  },
}

export const ExpandableHeadingElement = (
  props: ExpandableHeadingElementProps
) => {
  const { element, children, editor } = props
  const [title, ...other] = children
  const path = findNodePath(editor, element)
  const readOnly = useReadOnly()
  const selected = useSelected()
  const focused = useFocused()

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
    <ExpandableHeadingWrapper open={element.show} focus={selected && focused}>
      <span className="open_icon" onClick={handleShow} contentEditable={false}>
        <motion.span
          variants={variants}
          animate={element.show ? 'open' : 'closed'}
          className="open_icon-content"
          whileHover={element.show ? 'open' : 'hover'}
          initial="init"
        />
      </span>
      <div contentEditable={false} className="border">
        <span />
      </div>
      <div className="title">
        <span>{title}</span>
      </div>
      <AnimatePresence>
        {element.show && (
          <motion.div exit="closed" variants={container} className="content">
            <motion.div variants={item}>{other}</motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ExpandableHeadingWrapper>
  )
}
