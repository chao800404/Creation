import { Editor } from '@tiptap/react'
import React, { useEffect, useState, useRef } from 'react'
import { BlockPopupWrapper } from './popup.styles'
import { MdFormatColorText, MdLink } from 'react-icons/md'
import { IconType } from 'react-icons'
import Tippy from '@tippyjs/react'
import { HexAlphaColorPicker } from 'react-colorful'
import { SecondBubbleWrapper } from './popup.styles'
import useOnClickOutside from '../../utils/useOnClickOutside'

type BlockMunuBtn = {
  name: string
  onClick: () => boolean | '' | null | undefined
  disabled: boolean
  className: string
  icon: IconType
}

type SecondBubbleType = {
  show: boolean
  type: 'colorBubble' | 'linkBubble' | null
}

type BubblePopupType = {
  editor: Editor
  blockMenuBtns: BlockMunuBtn[]
}

const SecondBubble: React.FC<
  SecondBubbleType & {
    editor: Editor
    hide: () => void
    color: string
    setColor: React.Dispatch<React.SetStateAction<string>>
  }
> = ({ type, editor, setColor, color, hide }) => {
  const [link, setLink] = useState(editor.getAttributes('link').href || '')

  switch (type) {
    case 'colorBubble':
      return (
        <SecondBubbleWrapper>
          <HexAlphaColorPicker
            className="color-picker"
            color={color || '#000000'}
            onChange={(color) => {
              setColor(color)
            }}
          />
        </SecondBubbleWrapper>
      )
    case 'linkBubble':
      return (
        <SecondBubbleWrapper>
          <input
            value={link}
            type="text"
            onChange={(e) => setLink(e.target.value)}
          />
          <button
            onClick={() => {
              if (link.length === 0 || undefined) {
                editor.chain().focus().extendMarkRange('link').unsetLink().run()
              } else {
                editor
                  .chain()
                  .focus()
                  .extendMarkRange('link')
                  .setLink({ href: link, target: null as unknown as undefined })
                  .run()
              }
              hide()
              editor.commands.blur()
            }}
          >
            set link
          </button>
        </SecondBubbleWrapper>
      )
    default:
      return <div />
  }
}

const BubblePopup: React.FC<BubblePopupType> = ({ editor, blockMenuBtns }) => {
  const [bubble, setBubble] = useState<SecondBubbleType>({
    show: false,
    type: null,
  })
  const [color, setColor] = useState('')

  const show = (type: SecondBubbleType['type'], show = true) =>
    setBubble((prev) => ({ ...prev, show, type }))

  const hide = () => setBubble((prev) => ({ ...prev, show: false, type: null }))

  useEffect(() => {
    editor && editor.chain().focus().setColor(color).run()
  }, [color, editor])

  useEffect(() => {
    editor &&
      editor.on('selectionUpdate', ({ editor }) => {
        setColor(editor.getAttributes('textStyle').color)
      })
  }, [editor])

  useOnClickOutside((e) => {
    if (
      !(e.target as HTMLDivElement).closest('#bubble-container') &&
      bubble.show
    ) {
      hide()
      editor.commands.blur()
    }
  })

  if (!editor) {
    return null
  }

  return (
    <BlockPopupWrapper id="bubble-container">
      <div>
        <button
          onClick={() => show('linkBubble', !bubble.show)}
          id="link-btn"
          className="blockPopup-btn"
        >
          <MdLink className="blockPopup-btn-icon" />
        </button>
        {blockMenuBtns.map(
          ({ name, className, disabled, icon, onClick }, index) => (
            <button
              key={index}
              onClick={onClick}
              className={`${className} blockPopup-btn`}
              disabled={disabled}
              data-name={name}
            >
              {React.createElement(icon, {
                className: 'blockPopup-btn-icon',
              })}
            </button>
          )
        )}

        <button
          onClick={() => show('colorBubble', !bubble.show)}
          id="color-picker"
          className="blockPopup-btn"
        >
          <MdFormatColorText className="blockPopup-btn-icon" color={color} />
        </button>
      </div>

      {bubble.show && (
        <div
          className="bubble"
          style={
            bubble.type === 'colorBubble'
              ? { bottom: '-12.5rem' }
              : { bottom: '-6rem' }
          }
        >
          <SecondBubble
            editor={editor}
            color={color}
            setColor={setColor}
            hide={hide}
            {...bubble}
          />
        </div>
      )}
    </BlockPopupWrapper>
  )
}

export default BubblePopup
