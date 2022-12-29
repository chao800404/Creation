import React, { useEffect, useRef, useState } from 'react'
import { BlockInputType } from '../../hook/type'
import { CodeBlockWrapper } from './block.styles'
import { replaceClassName } from '../../utils/filterFile'
import {
  Editor,
  EditorContent,
  Extensions,
  ReactNodeViewRenderer,
  useEditor,
} from '@tiptap/react'
import { FiCopy } from 'react-icons/fi'
import * as blockFeatures from '../../lib/tiptap'
import { NodeViewWrapper, NodeViewContent, NodeViewProps } from '@tiptap/react'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight'

type BaseBlockType = {
  blockData: BlockInputType['blockData']
  className: string
  isFocus: boolean
  blockContentSet: (
    blockContent: Omit<BlockInputType['blockData'], 'pageId'>
  ) => void
  isFocusSet: (focus: boolean) => void
}

export const BlockCodeComponent = ({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
  editor,
}: NodeViewProps) => {
  return (
    <NodeViewWrapper as={CodeBlockWrapper}>
      <div
        className="code-block-option center round_sm"
        contentEditable={false}
      >
        <FiCopy
          onClick={() => navigator.clipboard.writeText(editor.getText())}
          className="code-copy-btn"
        />
        <select
          id="code-language"
          className="round_sm"
          defaultValue={defaultLanguage}
          onChange={(e) => {
            updateAttributes({
              language: e.target.value,
            })
          }}
        >
          <option value="null">auto</option>
          <option disabled>—</option>
          {extension.options.lowlight
            .listLanguages()
            .map((lang: string, index: number) => (
              <option key={index} value={lang}>
                {lang}
              </option>
            ))}
        </select>
      </div>
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  )
}

const CodeBlockContent: React.FC<BaseBlockType> = ({
  blockData,
  blockContentSet,
}) => {
  const { feature } = blockFeatures.blockTypeSelector(
    blockData.name,
    blockData.id
  )

  const editor = useEditor({
    extensions: [
      ...feature,
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(BlockCodeComponent)
        },
      }).configure({
        lowlight,
      }),
    ] as Extensions,
    // autofocus: true,
    // onCreate: ({ editor }) => {
    //   editor.commands.focus('end')
    // },
    content: blockData.content,
  })

  const handleOnChange = (isEmpty: boolean, content: string) =>
    blockContentSet({
      ...blockData,
      content: isEmpty ? '' : content,
      name: isEmpty ? 'Paragraph' : blockData.name,
    })

  // useEffect(() => {
  //   const focus = editor?.isFocused
  //   if (isFocus && editor && !focus) {
  //     editor.chain().focus().run()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isFocus, editor])

  useEffect(() => {
    if (!editor) return
    editor.on('update', ({ editor: { isEmpty } }) => {
      handleOnChange(isEmpty, editor.getHTML())
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <EditorContent
      editor={editor}
      data-name={blockData.name}
      id={blockData?.id}
    />
  )
}

export default CodeBlockContent
