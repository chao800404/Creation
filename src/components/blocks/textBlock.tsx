/* eslint-disable react-hooks/exhaustive-deps */
import {
  Editor,
  EditorContent,
  useEditor,
  BubbleMenu,
  EditorEvents,
} from '@tiptap/react'
import Paragraph from '@tiptap/extension-paragraph'
import StarterKit from '@tiptap/starter-kit'
import HardBreak from '@tiptap/extension-hard-break'
import History from '@tiptap/extension-history'
import Blockquote from '@tiptap/extension-blockquote'
import Strike from '@tiptap/extension-strike'
import Italic from '@tiptap/extension-italic'
import Code from '@tiptap/extension-code'
import Bold from '@tiptap/extension-bold'
import { Color } from '@tiptap/extension-color'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Text as TextType } from '@prisma/client'
import { useRouter } from 'next/router'
import { usePageSWR } from '../../hook/usePageSWR'
import { debounce } from 'lodash'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import BlockPopup from '../popup/blockPopup'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { HexAlphaColorPicker } from 'react-colorful'
import useOnClickOutside from '../../utils/useOnClickOutside'
import { TextPopupBtns } from '../../utils/config'

const TextBlock = ({
  blockData,
  memoEmptySet,
  value,
  className,
}: {
  blockData: TextType
  value: string
  className: string
  memoEmptySet: (toggle: boolean) => void
}) => {
  const { page } = useRouter().query
  const pageId = (page && page[0]) || ''
  const {
    mutateFunction: { updateBlock, addBlock },
  } = usePageSWR(pageId)

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Blockquote,
      Strike,
      Italic,
      Code,
      Bold,
      Color,
      TextStyle,
      Underline,
      History.configure({ depth: 10 }),
    ],

    autofocus: true,
    onCreate: ({ editor }) => {
      editor.commands.focus(100)
    },
    content: value,
  })

  useEffect(() => {
    if (editor) {
      editor.on('update', ({ editor }) => {
        if (editor.isEmpty) {
          console.log('run')
          memoEmptySet(editor.isEmpty)
        }
      })
    }
  }, [editor, memoEmptySet])

  const handleAsync = (content: string) => {
    updateBlock(blockData.id, {
      name: blockData.name,
      id: blockData.id,
      index: blockData.index,
      content,
    })
  }

  useEffect(() => {
    editor &&
      editor.on(
        'update',
        debounce(({ editor }: { editor: EditorEvents['update']['editor'] }) => {
          if (editor.getHTML() !== blockData.content) {
            handleAsync(editor.getHTML())
          }
        }, 1000)
      )
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
      <EditorContent editor={editor} />
    </div>
  )
}

export default React.memo(TextBlock)
