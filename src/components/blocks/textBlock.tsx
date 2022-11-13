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
import React, { useCallback, useEffect, useState } from 'react'
import { Text as TextType } from '@prisma/client'
import { useRouter } from 'next/router'
import { usePageSWR } from '../../hook/usePageSWR'
import { debounce } from 'lodash'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import BlockPopup from '../popup/blockPopup'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null
  }

  return (
    <BubbleMenu tippyOptions={{ duration: 100 }} editor={editor}>
      <BlockPopup editor={editor} />
    </BubbleMenu>
  )
}

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

      // HardBreak.extend({
      //   addKeyboardShortcuts: () => ({
      //     Enter: () => {
      //       addBlock('text')
      //       return true
      //     },
      //   }),
      // }),
    ],

    autofocus: true,
    onCreate: ({ editor }) => {
      editor.commands.focus(100)
    },
    content: value,
  })

  useEffect(() => {
    editor &&
      editor.on('update', ({ editor }) => {
        if (editor.isEmpty) {
          memoEmptySet(editor.isEmpty)
        }
      })
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

  return (
    <div className={className}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default React.memo(TextBlock)
