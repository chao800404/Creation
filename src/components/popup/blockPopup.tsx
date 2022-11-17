import { Editor } from '@tiptap/react'
import React, { useEffect, useState, useRef } from 'react'
import { BlockPopupWrapper } from './popup.styles'
import { MdFormatColorText } from 'react-icons/md'
import { IconType } from 'react-icons'
import useOnClickOutside from '../../utils/useOnClickOutside'
import { HexAlphaColorPicker } from 'react-colorful'
import { ColorPickerWrapper } from './popup.styles'

type BlockMunuBtn = {
  name: string
  onClick: () => boolean
  disabled: boolean
  className: string
  icon: IconType
}

type BlockPopupType = {
  editor: Editor
  toggle: boolean
  displayColor: string
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
  blockMenuBtns: BlockMunuBtn[]
}

const Menubar: React.FC<BlockPopupType> = ({
  editor,
  toggle,
  displayColor,
  setToggle,
  blockMenuBtns,
}) => {
  if (!editor) {
    return null
  }

  return (
    <BlockPopupWrapper>
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
        id="color-picker"
        onClick={() => setToggle((prev) => !prev)}
        className={`blockPopup-btn ${toggle ? 'is-active' : ''}`}
        style={{ color: displayColor ? displayColor : '' }}
      >
        <MdFormatColorText className="blockPopup-btn-icon" />
      </button>
    </BlockPopupWrapper>
  )
}

const BlockPopup = ({
  editor,
  blockMenuBtns,
}: {
  editor: Editor | null
  blockMenuBtns: BlockMunuBtn[]
}) => {
  const [toggle, setToggle] = useState(false)
  const elemRef = useRef<null | HTMLDivElement>(null)
  const [color, setColor] = useState(
    (editor && editor.getAttributes('textStyle').color) || ''
  )
  const [displayColor, setDisplayColor] = useState(
    (editor && editor.getAttributes('textStyle').color) || ''
  )
  const [isOverThenMiddleWindow, setIsOverThenMiddleWindow] = useState(false)

  useEffect(() => {
    editor && editor.chain().focus().setColor(color).run()
  }, [color, editor])

  useEffect(() => {
    editor &&
      editor.on('selectionUpdate', ({ editor }) => {
        setDisplayColor(editor.getAttributes('textStyle').color)
      })
  }, [editor])

  useOnClickOutside((e) => {
    if (!(e.target as HTMLDivElement).closest('#color-picker')) {
      setToggle(false)
    }
  })

  if (!editor) {
    return null
  }

  return (
    <div
      onClick={() => {
        const { y } = elemRef.current?.getBoundingClientRect() as DOMRect
        setIsOverThenMiddleWindow(y > window.innerHeight / 3)
        editor.chain().focus().run()
      }}
      ref={elemRef}
    >
      <Menubar
        editor={editor}
        toggle={toggle}
        displayColor={displayColor}
        setToggle={setToggle}
        blockMenuBtns={blockMenuBtns}
      />

      {toggle && (
        <ColorPickerWrapper
          id="color-picker"
          isOverThenMiddleWindow={isOverThenMiddleWindow}
        >
          <HexAlphaColorPicker
            className="color-picker-content"
            color={displayColor}
            onChange={(color) => {
              setDisplayColor(color)
              setColor(color)
            }}
          />
        </ColorPickerWrapper>
      )}
    </div>
  )
}

export default BlockPopup
