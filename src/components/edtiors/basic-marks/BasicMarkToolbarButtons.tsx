import React, { memo, ReactNode, useState } from 'react'
import {
  BiItalic,
  BiBold,
  BiCodeAlt,
  BiColorFill,
  BiCheckCircle,
} from 'react-icons/bi'
import { MdSuperscript, MdSubscript } from 'react-icons/md'
import { ImUnderline, ImStrikethrough } from 'react-icons/im'
import { AiOutlineHighlight } from 'react-icons/ai'

import {
  getPluginType,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
  MarkToolbarButton,
  MARK_FONT_FAMILY,
  ColorPickerToolbarDropdown,
  MARK_BG_COLOR,
  MARK_COLOR,
  MarkToolbarButtonProps,
  Value,
  ToolbarButtonProps,
  ColorType,
} from '@udecode/plate'
import { MyEditor, useMyPlateEditorRef } from '../plateTypes'
import { BasicToolBarWrapper } from '../styles'
import { TippyProps } from '@tippyjs/react'
import {
  BasicMarkToolbarSelectButton,
  BasicColorSelectButton,
} from './basicMarkToolbarSelectButton'
import { TippyComponentProps, ColorPickerToolbarDropdownProps } from './type'

import { Highlight } from '@styled-icons/fluentui-system-regular/Highlight'
import { ColorFill } from '@styled-icons/boxicons-regular/ColorFill'
import { Strikethrough } from '@styled-icons/boxicons-regular/Strikethrough'
import { CodeCurly } from '@styled-icons/boxicons-regular/CodeCurly'
import { Italic } from '@styled-icons/boxicons-regular/Italic'
import { FormatUnderlined } from '@styled-icons/material-rounded/FormatUnderlined'
import { Bold } from '@styled-icons/boxicons-regular/Bold'
import { TextSubscript } from '@styled-icons/fluentui-system-regular/TextSubscript'
import { TextSuperscript } from '@styled-icons/fluentui-system-regular/TextSuperscript'
import { Color } from '@styled-icons/fluentui-system-regular/Color'
import { markTooltip } from './Tooltip'

const SuperscriptBtn = (editor: MyEditor): MarkToolbarButtonProps<Value>[] => [
  {
    name: 'Superscript',
    type: getPluginType(editor, MARK_SUPERSCRIPT),
    clear: getPluginType(editor, MARK_SUBSCRIPT),
    icon: <TextSuperscript />,
    prefixClassNames: 'mark_selector-1',
    tooltip: markTooltip({ name: 'Superscript', command: '⌘ + .' }),
  },
  {
    name: 'Subscript',
    type: getPluginType(editor, MARK_SUBSCRIPT),
    clear: getPluginType(editor, MARK_SUPERSCRIPT),
    icon: <TextSubscript />,
    prefixClassNames: 'mark_selector-2',
    tooltip: markTooltip({ name: 'Subscript', command: '⌘ + ,' }),
  },
]

const ColorPickerBtn = [
  {
    name: 'Text',
    pluginKey: MARK_COLOR,
    icon: <Color />,
    selectedIcon: <BiCheckCircle />,
    tooltip: markTooltip({ name: 'Text', command: 'color' }),
  },
  {
    name: 'Highlight',
    pluginKey: MARK_BG_COLOR,
    icon: <Highlight />,
    selectedIcon: <BiCheckCircle />,
    tooltip: markTooltip({ name: 'Highlight', command: 'color' }),
  },
]

const BasicMarkToolbarButtons = () => {
  const editor = useMyPlateEditorRef()

  return (
    <BasicToolBarWrapper>
      <MarkToolbarButton
        type={getPluginType(editor, MARK_BOLD)}
        icon={<Bold />}
        tooltip={markTooltip({ name: 'Bold', command: '⌘ + B' })}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_ITALIC)}
        icon={<Italic />}
        tooltip={markTooltip({ name: 'Italic', command: '⌘ + I' })}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_UNDERLINE)}
        icon={<FormatUnderlined />}
        tooltip={markTooltip({ name: 'Underline', command: '⌘ + U' })}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_STRIKETHROUGH)}
        icon={<Strikethrough />}
        tooltip={markTooltip({
          name: 'Strikethrough',
          command: '⌘ + SHIFT + X',
        })}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_CODE)}
        icon={<CodeCurly />}
        tooltip={markTooltip({ name: 'Code', command: '⌘ + E' })}
      />
      <BasicMarkToolbarSelectButton data={SuperscriptBtn(editor)} />
      <BasicColorSelectButton data={ColorPickerBtn} />
    </BasicToolBarWrapper>
  )
}

export { BasicMarkToolbarButtons }
