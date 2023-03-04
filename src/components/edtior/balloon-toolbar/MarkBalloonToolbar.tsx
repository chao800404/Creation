import React, { ReactNode } from 'react'
import { FaBold } from 'react-icons/fa'
import { BiItalic } from 'react-icons/bi'
import { AiOutlineUnderline } from 'react-icons/ai'
import { TippyProps } from '@tippyjs/react'
import {
  BalloonToolbar,
  getPluginType,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  MarkToolbarButton,
} from '@udecode/plate'
import { useMyPlateEditorRef } from '../plateTypes'

export const markTooltip: TippyProps = {
  arrow: true,
  delay: 0,
  duration: [200, 0],
  hideOnClick: false,
  offset: [0, 17],
  placement: 'top',
}

export const MarkBalloonToolbar = ({ children }: { children?: ReactNode }) => {
  const editor = useMyPlateEditorRef()

  const arrow = false
  const theme = 'dark'

  return (
    <BalloonToolbar theme={theme} arrow={arrow}>
      <MarkToolbarButton
        type={getPluginType(editor, MARK_BOLD)}
        icon={<FaBold />}
        // tooltip={boldTooltip}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_ITALIC)}
        icon={<BiItalic />}
        // tooltip={italicTooltip}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_UNDERLINE)}
        icon={<AiOutlineUnderline />}
        // tooltip={underlineTooltip}
      />
      {children}
    </BalloonToolbar>
  )
}
