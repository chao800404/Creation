import React from 'react'
import { BasicMarkToolbarButtons } from './basic-marks/BasicMarkToolbarButtons'
import { BsEmojiSunglasses } from 'react-icons/bs'
import { TbLink } from 'react-icons/tb'
import { ToolbarButtonsWrapper, ToolBarWrapper } from './styles'
import {
  BlockToolbarButton,
  ColorPickerToolbarDropdown,
  ELEMENT_BLOCKQUOTE,
  EmojiToolbarDropdown,
  getPluginType,
  ImageToolbarButton,
  KEY_EMOJI,
  LineHeightToolbarDropdown,
  LinkToolbarButton,
  MARK_BG_COLOR,
  MARK_COLOR,
  MediaEmbedToolbarButton,
} from '@udecode/plate'
import { TbBlockquote } from 'react-icons/tb'
import { useMyPlateEditorRef } from './plateTypes'
import { markTooltip } from './basic-marks/Tooltip'
import { LineHeight } from '@styled-icons/remix-editor/LineHeight'
import { LineHeightToolbar } from './linHeight/lineHeightToolbar'
import { AlignToolbar, alignData } from './align/alignToolbar'

const ToolbarButtons = () => {
  const editor = useMyPlateEditorRef()

  return (
    <ToolbarButtonsWrapper>
      <span className="gap" />
      <BasicMarkToolbarButtons />
      <span className="gap" />
      <ToolBarWrapper>
        <EmojiToolbarDropdown
          pluginKey={KEY_EMOJI}
          icon={<BsEmojiSunglasses />}
          tooltip={markTooltip({ name: 'Open', command: 'Emoji' })}
        />
        <LinkToolbarButton
          icon={<TbLink />}
          tooltip={markTooltip({ name: 'Link', command: '⌘ + K' })}
        />
        <BlockToolbarButton
          type={getPluginType(editor, ELEMENT_BLOCKQUOTE)}
          icon={<TbBlockquote />}
          tooltip={markTooltip({ name: 'Quote', command: '⌘ + Shift + .' })}
        />
      </ToolBarWrapper>
      <span className="gap" />
      <ToolBarWrapper>
        <LineHeightToolbar
          icon={<LineHeight />}
          tooltip={markTooltip({ name: 'Open', command: 'LineHeight' })}
        />
        <AlignToolbar data={alignData} />
      </ToolBarWrapper>

      {/* <AlignToolbarButtons />
      <LinkToolbarButton icon={<Link />} />
      <ImageToolbarButton icon={<Image />} />
      <MediaEmbedToolbarButton icon={<OndemandVideo />} />
      <TableToolbarButtons />
      <ExcalidrawElementToolbarButton />  */}
    </ToolbarButtonsWrapper>
  )
}

export default ToolbarButtons
