import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor, FloatingMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import React, { useEffect, useState, useMemo } from 'react'
// import { HeaderEditorWrapper } from './editor.styles'
import EditorOptionButton from '../button/editorOptionButton'
import { FaImage } from 'react-icons/fa'
import { BsFillEmojiSunglassesFill } from 'react-icons/bs'
import { useCoverStore } from '../../store'
import { randomPath } from '../../utils/randomPath'
import Document from '@tiptap/extension-document'
import Image from 'next/image'

import {
  AiOutlinePicCenter,
  AiOutlineAlignRight,
  AiOutlineAlignLeft,
} from 'react-icons/ai'
import { MdOutlineTitle } from 'react-icons/md'
import shallow from 'zustand/shallow'
import { usePageSWR } from '../../hook/usePageSWR'
import { useRouter } from 'next/router'

type Level = 1 | 2 | 3 | 4 | 5 | 6
type Align = 'left' | 'right' | 'center'

type AttrsType = {
  textAlign: Align
  level: Level
}

const CustomDocument = Document.extend({
  content: 'heading block*',
})

const HeaderEditor = () => {
  const [transferringTag, settransferringTag] = useState(false)
  const [textAlign, setTextAlign] = useState<Align>('left')
  const [attrs, setAttrs] = useState<AttrsType>({
    textAlign: textAlign,
    level: 1,
  })

  const { page } = useRouter().query
  const id = (page && (page[0] as string)) || ''
  const coverImageMap = useCoverStore((state) => state.coverImageMap, shallow)

  const { mutateFunction } = usePageSWR(id)

  const cacheMap = useMemo(() => {
    const imageArray = []
    for (const imageGroup in coverImageMap) {
      const imagePathArray = coverImageMap[imageGroup]
      imageArray.push(...imagePathArray)
    }

    return imageArray
  }, [coverImageMap])

  const editor = useEditor({
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      TextAlign.configure({
        alignments: ['left', 'right', 'center'],
        types: ['heading'],
      }),
      Placeholder.configure({
        placeholder: ({ hasAnchor }) => {
          if (hasAnchor) setTextAlign('left')
          return 'Write something …'
        },
      }),
    ],
    content: `
      <h1>Hello world</h1>
    `,
  })

  useEffect(() => {
    if (editor && transferringTag)
      editor.chain().focus().setTextAlign(textAlign).run()
    settransferringTag(false)
  }, [transferringTag, editor, textAlign])

  useEffect(() => {
    editor &&
      editor.on('update', ({ editor }) => {
        const { content } = editor.getJSON()
        if (content) {
          const { attrs } = content[0]
          setAttrs((prev) => ({ ...prev, ...attrs }))
        }
      })
  }, [editor])

  const handleChangeHeadingTag = (level: Level) => {
    if (!editor) return
    settransferringTag(true)
    return editor.chain().focus().toggleHeading({ level: level }).run()
  }

  const handleChangeAlign = (align: Align) => {
    if (!editor) return
    setTextAlign(align)
    return editor.chain().focus().setTextAlign(align).run()
  }

  const handleAddCover = () => {
    const randomInt = randomPath(cacheMap.length)
    if (randomInt <= cacheMap.length) {
      const randomPath = cacheMap[randomInt]
      mutateFunction.uploadCoverImage(randomPath)
      editor && editor.chain().focus().blur().run()
    }
  }

  const handleAddEmoji = () => {
    if (!editor) return
  }

  return (
    // <HeaderEditorWrapper>
    //   {editor && (
    //     <FloatingMenu
    //       shouldShow={({ editor }) => editor.isFocused}
    //       editor={editor}
    //       tippyOptions={{
    //         duration: 200,
    //         placement: 'top',
    //       }}
    //     >
    //       <div className="header_editor-content">
    //         <EditorOptionButton onClick={handleAddEmoji}>
    //           <BsFillEmojiSunglassesFill fontSize="1.2rem" />
    //         </EditorOptionButton>
    //         <span className="header_editor-gap-line" />
    //         {!cover && (
    //           <>
    //             <EditorOptionButton onClick={handleAddCover}>
    //               <div className="header_editor-add-cover">
    //                 <FaImage fontSize="1.25rem" />
    //                 <span>Add cover</span>
    //               </div>
    //             </EditorOptionButton>
    //             <span className="header_editor-gap-line" />
    //           </>
    //         )}

    //         <EditorOptionButton
    //           onClick={() => handleChangeHeadingTag(1)}
    //           className={
    //             editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
    //           }
    //           active={attrs.level === 1}
    //         >
    //           <MdOutlineTitle fontSize="1.5rem" />
    //         </EditorOptionButton>
    //         <EditorOptionButton
    //           onClick={() => handleChangeHeadingTag(2)}
    //           className={
    //             editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
    //           }
    //           active={attrs.level === 2}
    //         >
    //           <MdOutlineTitle fontSize="1.25rem" />
    //         </EditorOptionButton>
    //       </div>
    //     </FloatingMenu>
    //   )}

    //   <EditorContent className="header_editor-context" editor={editor} />
    // </HeaderEditorWrapper>
    <div></div>
  )
}

export default React.memo(HeaderEditor)
