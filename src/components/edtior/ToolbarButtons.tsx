import React from 'react'
import { BasicMarkToolbarButtons } from './basic-marks/BasicMarkToolbarButtons'
import { BsEmojiSunglasses } from 'react-icons/bs'
import { TbLink } from 'react-icons/tb'
import { ToolbarButtonsWrapper, ToolBarWrapper } from './styles'
import {
  BlockToolbarButton,
  ELEMENT_BLOCKQUOTE,
  EmojiToolbarDropdown,
  KEY_EMOJI,
  LinkToolbarButton,
} from '@udecode/plate'
import { TbBlockquote } from 'react-icons/tb'
import { markTooltip } from './basic-marks/Tooltip'
import { LineHeight } from '@styled-icons/remix-editor/LineHeight'
import { LineHeightToolbar } from './linHeight/lineHeightToolbar'
import { AlignToolbar, alignData } from './align/alignToolbar'

const ToolbarButtons = React.memo(() => {
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
          type={ELEMENT_BLOCKQUOTE}
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
    </ToolbarButtonsWrapper>
  )
})

ToolbarButtons.displayName = 'ToolbarButtons'

export default ToolbarButtons
