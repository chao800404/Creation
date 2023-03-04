import { ELEMENT_DESC } from './../../desc/descPlugin'
import { ELEMENT_IMAGE_ITEM_BLOCK } from './../imageListBlockPlugin'
import {
  AncestorOf,
  ELEMENT_PARAGRAPH,
  ExitBreakPlugin,
  getEndPoint,
  TEditor,
  TNodeEntry,
  Hotkeys,
  setNodes,
  getParentNode,
} from '@udecode/plate'
import {
  KeyboardHandlerReturnType,
  PlateEditor,
  Value,
  WithPlatePlugin,
  getAboveNode,
  selectEditor,
  insertEmptyElement,
  isBlockAboveEmpty,
  removeNodes,
  getNextNode,
} from '@udecode/plate-core'
import isHotkey from 'is-hotkey'
import { ELEMENT_EH1, ELEMENT_EH2, ELEMENT_EH3 } from '../../eHeading-element'

import { Location } from 'slate'
import { MyExpandableHeading } from '../../plateTypes'
import {
  ELEMENT_EXPANDABLE_HEADING_1,
  ELEMENT_EXPANDABLE_HEADING_2,
  ELEMENT_EXPANDABLE_HEADING_3,
} from '../../expandableHeading'

export const handleOnKeydown =
  <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(
    editor: E,
    { options: { rules = [] } }: WithPlatePlugin<ExitBreakPlugin, V, E>
  ): KeyboardHandlerReturnType =>
  (event) => {
    const node = getAboveNode(editor, {
      match: { type: ELEMENT_IMAGE_ITEM_BLOCK },
    })
    const isEnter = event.key === 'Enter'

    if (node && isEnter) {
      const focusNode = getAboveNode(editor)
      if (focusNode?.[0].type === ELEMENT_EH3) {
        event.preventDefault()
        event.stopPropagation()
        const path = [...focusNode[1]]
        const lastPos = path.pop()
        if (lastPos !== undefined) {
          path.push(lastPos + 1)
          selectEditor(editor, { at: path })
        }
        return
      }
      if (focusNode?.[0].type === ELEMENT_DESC) {
        const isEmpty = isBlockAboveEmpty(editor)
        if (isEmpty) {
          event.preventDefault()
          event.stopPropagation()
          const parent = getParentNode(editor, node[1])
          if (parent) {
            const path = [...parent[1]]
            const lastPos = path.pop()
            if (lastPos !== undefined) {
              path.push(lastPos + 1)
              insertEmptyElement(editor, ELEMENT_PARAGRAPH, { at: path })
              removeNodes(editor, { at: focusNode[1] })
              selectEditor(editor, { at: path })
            }
          }
        }
        return
      }
    }

    // const node = getAboveNode(editor, {
    //   match: {
    //     type: [
    //       ELEMENT_EXPANDABLE_HEADING_1,
    //       ELEMENT_EXPANDABLE_HEADING_2,
    //       ELEMENT_EXPANDABLE_HEADING_3,
    //     ],
    //   },
    // })

    // const hotKey = Hotkeys.isTab(editor, event)

    // const insertElement = (path: Location) => {
    //   insertEmptyElement(editor, ELEMENT_PARAGRAPH, {
    //     at: path,
    //     select: true,
    //   })
    // }

    // const checkType = (type: string) =>
    //   type === ELEMENT_EH3 || type === ELEMENT_EH2 || type === ELEMENT_EH1

    // const insertParentNext = (node: TNodeEntry<AncestorOf<TEditor<V>>>) => {
    //   const newPath = node[1]
    //   const sliceLast = newPath.pop()
    //   if (sliceLast !== undefined) {
    //     newPath.push(sliceLast + 1)
    //     insertElement(newPath)
    //   }
    //   event.preventDefault()
    //   event.stopPropagation()
    // }

    // if (hotKey && node) {
    //   const focusNode = getAboveNode(editor)
    //   if (focusNode && checkType(focusNode[0].type as string)) {
    //     console.log(node[0])
    //     setNodes<MyExpandableHeading>(
    //       editor,
    //       { show: !node[0].show },
    //       { at: node[1] }
    //     )
    //   }
    // }

    // if (node && event.key === 'Enter') {
    //   if (!node[0].show) {
    //     insertParentNext(node)
    //   } else {
    //     const isEmpty = isBlockAboveEmpty(editor)
    //     const focusNode = getAboveNode(editor)
    //     if (focusNode && checkType(focusNode[0].type as string)) {
    //       event.preventDefault()
    //       event.stopPropagation()
    //       selectEditor(editor, { at: getEndPoint(editor, node[1]) })
    //     }
    //     if (isEmpty && focusNode) {
    //       removeNodes(editor, { at: focusNode[1] })
    //       insertParentNext(node)
    //     }
    //   }
    // }
  }
