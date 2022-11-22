/* eslint-disable react-hooks/exhaustive-deps */
import {
  EditorContent,
  useEditor,
  BubbleMenu,
  EditorEvents,
} from '@tiptap/react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { usePageSWR } from '../../hook/usePageSWR'
import { debounce } from 'lodash'
import BlockPopup from '../popup/blockPopup'
import { TextPopupBtns } from '../../lib/tiptap'
import * as blockFeatures from '../../lib/tiptap'
import { blockContentFilter } from '../../utils/filterFile'
import { BlockInputType } from '../../hook/type'
import { off } from 'process'

type TextBlockType = {
  blockData: BlockInputType['blockData']
  className: string
  isFocus: boolean
  blockContentSet: (
    blockContent: Omit<BlockInputType['blockData'], 'pageId'>
  ) => void
}

const TextBlock: React.FC<TextBlockType> = ({
  blockData,
  className,
  blockContentSet,
  isFocus,
}) => {
  const { feature } = blockFeatures.blockTypeSelector(blockData.name)

  const editor = useEditor({
    extensions: feature,
    autofocus: true,
    onCreate: ({ editor }) => {
      editor.commands.focus('end')
    },
    content: blockData.content,
  })

  useEffect(() => {
    if (isFocus && editor) {
      const focus = editor?.isFocused
      !focus && editor.chain().focus().run()
    }
  }, [isFocus])

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
      <BubbleMenu tippyOptions={{ duration: 100 }} editor={editor}>
        <BlockPopup
          editor={editor}
          blockMenuBtns={Object.values(TextPopupBtns(editor))}
        />
      </BubbleMenu>
      <EditorContent
        editor={editor}
        data-name={blockData.name}
        id={blockData?.id}
      />
    </div>
  )
}
export default TextBlock
