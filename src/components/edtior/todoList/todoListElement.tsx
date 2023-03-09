import React, { createElement } from 'react'
import { findNodePath, setNodes, Value } from '@udecode/plate-core'
import { TTodoListItemElement } from '@udecode/plate-list'
import { useReadOnly } from 'slate-react'
import { TodoListElementProps } from './type'
import { TodoListWrapper } from './todoListElement.styles'
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline'
import { reactSvgMarkToString } from '@/utils/SvgMarkToString'

export const TodoListElement = <V extends Value>(
  props: TodoListElementProps<V>
) => {
  const { attributes, children, nodeProps, element, editor } = props
  const readOnly = useReadOnly()

  const { checked, lineHeight, align, indent } = element
  const todoProps = {
    checked,
    lineHeight,
    align,
    indent,
    icon: reactSvgMarkToString(CloseOutline),
  }

  return (
    <TodoListWrapper {...attributes} {...todoProps}>
      <div className="input" contentEditable={false}>
        <input
          data-testid="TodoListElementCheckbox"
          data-role="checkbox"
          type="checkbox"
          checked={!!checked}
          onChange={(e) => {
            if (readOnly) return
            const path = findNodePath(editor, element)
            if (!path) return

            setNodes<TTodoListItemElement>(
              editor,
              { checked: e.target.checked },
              {
                at: path,
              }
            )
          }}
          {...nodeProps}
        />
      </div>
      <span
        className="desc"
        contentEditable={!readOnly}
        suppressContentEditableWarning
      >
        {children}
      </span>
    </TodoListWrapper>
  )
}
