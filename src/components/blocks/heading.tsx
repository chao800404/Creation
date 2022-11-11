import {
  Editor,
  EditorContent,
  useEditor,
  BubbleMenu,
  EditorEvents,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect } from 'react'
import { Text } from '@prisma/client'
import { useRouter } from 'next/router'
import { usePageSWR } from '../../hook/usePageSWR'
import { debounce } from 'lodash'

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null
  }

  return (
    <BubbleMenu tippyOptions={{ duration: 100 }} editor={editor}>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        code
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </button>
    </BubbleMenu>
  )
}

const Heading = ({
  blockData,
  memoEmptySet,
  value,
}: {
  blockData: Text
  value: string
  memoEmptySet: (toggle: boolean) => void
}) => {
  const { page } = useRouter().query
  const pageId = (page && page[0]) || ''
  const {
    mutateFunction: { updateBlock },
  } = usePageSWR(pageId)

  const editor = useEditor({
    extensions: [StarterKit],
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

  useEffect(() => {
    editor &&
      editor.on(
        'update',
        debounce(({ editor }: { editor: EditorEvents['update']['editor'] }) => {
          if (editor.getHTML() === blockData.content) return
          updateBlock(blockData.id, {
            key: blockData.name,
            content: editor.getHTML(),
            block_id: blockData.id,
            index: blockData.index,
          })
        }, 2000)
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor])

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default React.memo(Heading)
