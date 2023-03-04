import React, { useCallback } from 'react'
import {
  focusEditor,
  getPluginInjectProps,
  isCollapsed,
  someNode,
  useEventPlateId,
  usePlateEditorState,
  getAboveNode,
} from '@udecode/plate-core'
import { KEY_LINE_HEIGHT, setLineHeight } from '@udecode/plate-line-height'
import {
  ToolbarButton,
  ToolbarButtonProps,
  ToolbarDropdown,
} from '@udecode/plate-ui-toolbar'
import { LineHeightDropdownWrapper } from './lineHeight.styles'
import { BsCheckLg } from 'react-icons/bs'
import Tippy from '@tippyjs/react'

export const LineHeightToolbar = ({ id, ...props }: ToolbarButtonProps) => {
  const editor = usePlateEditorState(useEventPlateId(id))
  const { validNodeValues, defaultNodeValue } = getPluginInjectProps(
    editor,
    KEY_LINE_HEIGHT
  )
  const [visible, setVisible] = React.useState(false)
  const hide = () => setVisible(false)
  const toggle = () => setVisible((prev) => !prev)
  const [open, setOpen] = React.useState(false)
  const [curLineHeight, setCurLineHeight] = React.useState(defaultNodeValue)

  const onToggle = useCallback(() => {
    setOpen(!open)
    const node = getAboveNode(editor)
    const lineHeight = node && node[0]?.lineHeight
    !!lineHeight
      ? setCurLineHeight(lineHeight)
      : setCurLineHeight(defaultNodeValue)
  }, [open, setOpen, editor, defaultNodeValue])

  const selectHandler = useCallback(
    (lineHeight: number) => {
      if (editor) {
        focusEditor(editor)
        setLineHeight(editor, {
          value: lineHeight,
        })
        setCurLineHeight(lineHeight)
      }
    },
    [editor]
  )

  return (
    <ToolbarDropdown
      control={
        <ToolbarButton
          active={
            isCollapsed(editor?.selection) &&
            someNode(editor, {
              match: (n) => n[KEY_LINE_HEIGHT] !== undefined,
            })
          }
          {...props}
        />
      }
      open={open}
      onOpen={onToggle}
      onClose={onToggle}
    >
      {validNodeValues && (
        <LineHeightDropdownWrapper>
          {validNodeValues.map((lineHeight) => (
            <div
              style={{ cursor: 'pointer' }}
              key={lineHeight}
              onClick={() => selectHandler(lineHeight)}
              className="toolbarDropdown-item"
            >
              <span>{lineHeight === curLineHeight && <BsCheckLg />}</span>
              <span>{lineHeight}</span>
            </div>
          ))}
        </LineHeightDropdownWrapper>
      )}
    </ToolbarDropdown>
  )
}
