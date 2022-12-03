import { TextPopupBtns, TableBlockBtnsS } from '../../lib/tiptap'
import { TableBlockWrapper } from './block.styles'
import { showMenuPopup, hiddenMenuPopup } from '../popup/menuPopup'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import React, { useEffect, useRef } from 'react'
import { tableBlockFeature } from '../../lib/tiptap'
import BlockPopup from '../popup/blockPopup'
import { ButtonMapType } from '../../store/useMenuPopupStore'
import { BlockInputType } from '../../hook/type'

type BaseBlockType = {
  blockData: BlockInputType['blockData']
  className: string
  isFocus: boolean
  blockContentSet: (
    blockContent: Omit<BlockInputType['blockData'], 'pageId'>
  ) => void
}

const TableBlock: React.FC<BaseBlockType> = ({
  blockData,
  className,
  blockContentSet,
  isFocus,
}) => {
  const elemRef = useRef<null | HTMLDivElement>(null)

  const editor = useEditor({
    autofocus: true,
    extensions: tableBlockFeature,
    content: blockData.content,
  })

  const handleOnPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    const targetElem = (e.target as HTMLElement).closest(
      '[data-type="table-content"]'
    )
    if (e.button == 2 && targetElem && editor) {
      const btnArray = Object.values(TableBlockBtnsS(editor))

      return showMenuPopup({
        x: e.pageX,
        y: e.pageY,
        buttonsMap: btnArray,
        dataType: 'table-content',
        width: 10,
      })
    }

    return hiddenMenuPopup()
  }

  const handleOnChange = (isEmpty: boolean, content: string) =>
    blockContentSet({
      ...blockData,
      content: isEmpty ? '' : content,
      name: isEmpty ? 'Paragraph' : blockData.name,
    })

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
    <TableBlockWrapper
      className={className}
      data-type="table-content"
      ref={elemRef}
      onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
      onPointerDown={handleOnPointerDown}
    >
      <BubbleMenu tippyOptions={{ duration: 100 }} editor={editor}>
        <BlockPopup
          editor={editor}
          blockMenuBtns={Object.values(TextPopupBtns(editor))}
        />
      </BubbleMenu>

      <EditorContent editor={editor} />
    </TableBlockWrapper>
  )
}

export default TableBlock
