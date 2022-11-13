import { Editor } from '@tiptap/react'
import React, { useEffect, useState } from 'react'
import { BlockPopupWrapper } from './popup.styles'
import { HiOutlineCode } from 'react-icons/hi'
import { ImStrikethrough, ImBold } from 'react-icons/im'
import { TbBlockquote } from 'react-icons/tb'
import { ImUnderline } from 'react-icons/im'
import { BiItalic, BiFontColor } from 'react-icons/bi'
import { MdFormatColorText } from 'react-icons/md'
import { GoItalic } from 'react-icons/go'
import { HexAlphaColorPicker } from 'react-colorful'

const BlockPopup = ({ editor }: { editor: Editor }) => {
  const [toggle, setToggle] = useState(false)
  const [color, setColor] = useState(
    editor.getAttributes('textStyle').color || ''
  )

  useEffect(() => {
    editor.chain().focus().setColor(color).run()
  }, [color, editor])

  return (
    <BlockPopupWrapper>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`blockPopup-btn ${
          editor.isActive('bold') ? 'is-active' : ''
        }`}
      >
        <ImBold className="blockPopup-btn-icon" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`blockPopup-btn ${
          editor.isActive('italic') ? 'is-active' : ''
        }`}
      >
        <GoItalic className="blockPopup-btn-icon" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`blockPopup-btn ${
          editor.isActive('underline') ? 'is-active' : ''
        }`}
      >
        <ImUnderline className="blockPopup-btn-icon" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`blockPopup-btn ${
          editor.isActive('strike') ? 'is-active' : ''
        }`}
      >
        <ImStrikethrough className="blockPopup-btn-icon" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`blockPopup-btn ${
          editor.isActive('code') ? 'is-active' : ''
        }`}
      >
        <HiOutlineCode className="blockPopup-btn-icon" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`blockPopup-btn ${
          editor.isActive('blockquote') ? 'is-active' : ''
        }`}
      >
        <TbBlockquote className="blockPopup-btn-icon" />
      </button>
      <button
        onClick={() => setToggle((prev) => !prev)}
        className={`blockPopup-btn ${toggle ? 'is-active' : ''}`}
        style={{ color: color ? color : '' }}
      >
        <MdFormatColorText className="blockPopup-btn-icon" />
      </button>

      {toggle && (
        <div className="color-picker">
          <HexAlphaColorPicker
            className="color-picker-content"
            color={color}
            onChange={setColor}
            onClickCapture={() => setToggle(false)}
          />
        </div>
      )}
    </BlockPopupWrapper>
  )
}

export default BlockPopup
