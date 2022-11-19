/* eslint-disable react-hooks/exhaustive-deps */
import {
  EditorContent,
  useEditor,
  BubbleMenu,
  EditorEvents,
} from '@tiptap/react'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { usePageSWR } from '../../hook/usePageSWR'
import { debounce } from 'lodash'
import BlockPopup from '../popup/blockPopup'
import { TextPopupBtns } from '../../lib/tiptap'
import * as blockFeatures from '../../lib/tiptap'
import { BlockInputType } from '../../types/block'
import { blockContentFilter } from '../../utils/filterFile'

type TextBlockType = {
  blockData: BlockInputType['blockData']
  value: string
  className: string
  memoEmptySet: (toggle: boolean) => void
}

const TextBlock: React.FC<TextBlockType> = ({
  blockData,
  memoEmptySet,
  value,
  className,
}) => {
  const { page } = useRouter().query
  const pageId = (page && page[0]) || ''
  const {
    mutateFunction: { updateBlock },
  } = usePageSWR(pageId)

  const { feature } = blockFeatures.blockTypeSelector(blockData?.name)

  const editor = useEditor({
    extensions: feature,
    autofocus: true,
    onCreate: ({ editor }) => {
      editor.commands.focus(100)
    },
    content: value,
  })

  const handleAsync = (content: string) => {
    updateBlock(blockData?.id, {
      name:
        blockContentFilter(content).length > 0 ? blockData?.name : 'Paragraph',
      id: blockData?.id,
      type: blockData?.type,
      content: blockContentFilter(content).length > 0 ? content : '',
    })
  }

  useEffect(() => {
    if (editor) {
      editor.on('update', ({ editor }) => {
        if (editor.isEmpty) {
          memoEmptySet(editor.isEmpty)
        }
      })
    }
  }, [editor, memoEmptySet])

  useEffect(() => {
    editor &&
      editor.on(
        'update',
        debounce(({ editor }: { editor: EditorEvents['update']['editor'] }) => {
          handleAsync(editor.getHTML())
        }, 500)
      )
  }, [editor, value])

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
        data-name={blockData?.name}
        id={blockData?.id}
        data-type={blockData?.type}
      />
    </div>
  )
}
export default TextBlock
