/* eslint-disable react-hooks/exhaustive-deps */
import { EditorContent, useEditor, BubbleMenu, Extensions } from '@tiptap/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import BlockPopup from '../popup/blockPopup'
import { TextPopupBtns } from '../../lib/tiptap'
import * as blockFeatures from '../../lib/tiptap'
import { BlockInputType } from '../../hook/type'
import { HexAlphaColorPicker } from 'react-colorful'
import BubblePopup from '../popup/bubblePopup'

type BaseBlockType = {
  blockData: BlockInputType['blockData']
  className: string
  isFocus: boolean
  blockContentSet: (
    blockContent: Omit<BlockInputType['blockData'], 'pageId'>
  ) => void
}

const BaseBlock: React.FC<BaseBlockType> = ({
  blockData,
  className,
  blockContentSet,
  isFocus,
}) => {
  const { feature } = blockFeatures.blockTypeSelector(
    blockData.name,
    blockData.id
  )

  const editor = useEditor({
    extensions: [...feature] as Extensions,
    autofocus: true,
    onCreate: ({ editor }) => {
      editor.commands.focus('end')
    },
    content: blockData.content,
  })

  // useEffect(() => {
  //   const focus = editor?.isFocused
  //   if (focus) return
  //   if (isFocus !== focus && editor) {
  //     editor.chain().focus().run()
  //   }
  // }, [isFocus])

  useEffect(() => {
    if (!editor) return
    editor.on('update', ({ editor: { isEmpty } }) => {
      blockContentSet({
        ...blockData,
        content: isEmpty ? '' : editor.getHTML(),
        name: isEmpty ? 'Paragraph' : blockData.name,
      })
    })
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className={className}>
      <BubbleMenu
        tippyOptions={{ duration: 100 }}
        pluginKey="bubbleMenuOne"
        editor={editor}
      >
        <BubblePopup
          editor={editor}
          blockMenuBtns={Object.values(TextPopupBtns(editor))}
        />
      </BubbleMenu>

      <EditorContent
        editor={editor}
        data-name={blockData.name}
        id={blockData?.id}
      />
      {/* <SecondBubble {...secondBubble} /> */}
    </div>
  )
}
export default BaseBlock
