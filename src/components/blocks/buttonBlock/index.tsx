import { EditorContent, useEditor } from '@tiptap/react'
import { useEffect } from 'react'
import { basicBlockFeature } from '../../../lib/tiptap'
import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ButtonBlockNode } from './buttonBlockNode'
import Paragraph from '@tiptap/extension-paragraph'
import { BaseBlockType } from '../type'

const ButtonBlock: React.FC<BaseBlockType> = () => {
  const editor = useEditor({
    extensions: [
      ...basicBlockFeature,
      Node.create({
        name: 'linkButtonNode',
        group: 'block',
        content: 'inline*',

        addAttributes() {
          return {
            open: {
              default: false,
            },
            link: {
              default: '/',
            },
            newTab: {
              default: true,
            },
            id: {
              default: '',
            },
          }
        },
        parseHTML() {
          return [
            {
              tag: 'buttonLink',
            },
          ]
        },

        renderHTML({ HTMLAttributes }) {
          return ['buttonLink', mergeAttributes(HTMLAttributes), 0]
        },
        addNodeView() {
          return ReactNodeViewRenderer(ButtonBlockNode)
        },
      }),
      Paragraph.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => true,
          }
        },
      }),
    ],
    content: `
      <buttonLink id="" open="false" link="/" newTab="true" >
        <p>New Link</p>
      </buttonLink>
    `,
  })

  useEffect(() => {
    editor &&
      editor.on('update', () => {
        const html = editor.getHTML()
        console.log(html)
      })
  }, [editor])

  return <EditorContent editor={editor} />
}

export default ButtonBlock
