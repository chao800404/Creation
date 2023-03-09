import {
  ELEMENT_EXPANDABLE_HEADING_1,
  ELEMENT_EXPANDABLE_HEADING_2,
  ELEMENT_EXPANDABLE_HEADING_3,
} from './expandableHeading/createExpandableHeadingPlugin'
import {
  AutoformatRule,
  createPlateEditor,
  CreatePlateEditorOptions,
  createPluginFactory,
  createPlugins,
  createTEditor,
  Decorate,
  DecorateEntry,
  DOMHandler,
  EDescendant,
  EElement,
  EElementEntry,
  EElementOrText,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_HR,
  ELEMENT_IMAGE,
  ELEMENT_LI,
  ELEMENT_LINK,
  ELEMENT_MEDIA_EMBED,
  ELEMENT_MENTION,
  ELEMENT_MENTION_INPUT,
  ELEMENT_OL,
  ELEMENT_PARAGRAPH,
  ELEMENT_TABLE,
  ELEMENT_TD,
  ELEMENT_TH,
  ELEMENT_TODO_LI,
  ELEMENT_TR,
  ELEMENT_UL,
  EMarks,
  ENode,
  ENodeEntry,
  EText,
  ETextEntry,
  getTEditor,
  InjectComponent,
  InjectProps,
  KeyboardHandler,
  NoInfer,
  OnChange,
  OverrideByKey,
  PlateEditor,
  PlateId,
  PlatePlugin,
  PlatePluginComponent,
  PlatePluginInsertData,
  PlatePluginProps,
  PlateProps,
  PluginOptions,
  SerializeHtml,
  TCommentText,
  TElement,
  TImageElement,
  TLinkElement,
  TMediaEmbedElement,
  TMentionElement,
  TMentionInputElement,
  TNodeEntry,
  TReactEditor,
  TTableElement,
  TText,
  TTodoListItemElement,
  useEditorRef,
  useEditorState,
  usePlateActions,
  usePlateEditorRef,
  usePlateEditorState,
  usePlateSelectors,
  usePlateStates,
  WithOverride,
} from '@udecode/plate'
// import {
//   ELEMENT_EXCALIDRAW,
//   TExcalidrawElement,
// } from '@udecode/plate-ui-excalidraw';
import { CSSProperties } from 'styled-components'
import { ELEMENT_DESC } from './desc'
import { ELEMENT_EH1, ELEMENT_EH2, ELEMENT_EH3 } from './eHeading-element'
import {
  ELEMENT_IMAGE_ITEM_BLOCK,
  ELEMENT_IMAGE_LIST_BLOCK,
} from './imageListBlock'
import { ELEMENT_LINK_BUTTON } from './linkButton'

/**
 * Text
 */

export type EmptyText = {
  text: ''
}

export type PlainText = {
  text: string
}

export interface RichText extends TText, TCommentText {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  kbd?: boolean
  subscript?: boolean
  backgroundColor?: CSSProperties['backgroundColor']
  fontFamily?: CSSProperties['fontFamily']
  color?: CSSProperties['color']
  fontSize?: CSSProperties['fontSize'] | null
  fontWeight?: CSSProperties['fontWeight'] | null
}

/**
 * Inline Elements
 */

export interface MyLinkElement extends TLinkElement {
  type: typeof ELEMENT_LINK
  children: RichText[]
}

export interface MyMentionInputElement extends TMentionInputElement {
  type: typeof ELEMENT_MENTION_INPUT
  children: [PlainText]
}

export interface MyMentionElement extends TMentionElement {
  type: typeof ELEMENT_MENTION
  children: [EmptyText]
}

export type MyInlineElement =
  | MyLinkElement
  | MyMentionElement
  | MyMentionInputElement
export type MyInlineDescendant = MyInlineElement | RichText
export type MyInlineChildren = MyInlineDescendant[]
export type MyEh = MyEH1Element | MyEH2Element | MyEH3Element
export type MyExpandableHeadingType =
  | typeof ELEMENT_EXPANDABLE_HEADING_1
  | typeof ELEMENT_EXPANDABLE_HEADING_2
  | typeof ELEMENT_EXPANDABLE_HEADING_3
/**
 * Block props
 */

export interface MyIndentProps {
  indent?: number
}

export interface MyIndentListProps extends MyIndentProps {
  listStart?: number
  listRestart?: number
  listStyleType?: string
}

export interface MyLineHeightProps {
  lineHeight?: CSSProperties['lineHeight']
}

export interface MyAlignProps {
  align?: CSSProperties['textAlign']
}

export interface MyBlockElement
  extends TElement,
    MyIndentListProps,
    MyLineHeightProps {
  id?: PlateId
}

/**
 * Blocks
 */

export interface MyDescElement extends MyBlockElement {
  type: typeof ELEMENT_DESC
  children: MyInlineChildren
}

export interface MyParagraphElement extends MyBlockElement {
  type: typeof ELEMENT_PARAGRAPH
  children: MyInlineChildren
}

export interface MyH1Element extends MyBlockElement {
  type: typeof ELEMENT_H1
  children: MyInlineChildren
}

export interface MyH2Element extends MyBlockElement {
  type: typeof ELEMENT_H2
  children: MyInlineChildren
}

export interface MyH3Element extends MyBlockElement {
  type: typeof ELEMENT_H3
  children: MyInlineChildren
}

export interface MyH4Element extends MyBlockElement {
  type: typeof ELEMENT_H4
  children: MyInlineChildren
}

export interface MyH5Element extends MyBlockElement {
  type: typeof ELEMENT_H5
  children: MyInlineChildren
}

export interface MyH6Element extends MyBlockElement {
  type: typeof ELEMENT_H6
  children: MyInlineChildren
}

export interface MyEH1Element extends MyBlockElement {
  type: typeof ELEMENT_EH1
  children: MyInlineChildren
}

export interface MyEH2Element extends MyBlockElement {
  type: typeof ELEMENT_EH2
  children: MyInlineChildren
}

export interface MyEH3Element extends MyBlockElement {
  type: typeof ELEMENT_EH3
  children: MyInlineChildren
}

export interface MyExpandableHeading extends MyBlockElement {
  type: MyExpandableHeadingType
  show: boolean
  children: [MyEh, MyRootBlock]
}

export interface MyBlockquoteElement extends MyBlockElement {
  type: typeof ELEMENT_BLOCKQUOTE
  children: MyInlineChildren
}

export interface MyCodeBlockElement extends MyBlockElement {
  type: typeof ELEMENT_CODE_BLOCK
  children: MyCodeLineElement[]
}

export interface MyCodeLineElement extends TElement {
  type: typeof ELEMENT_CODE_LINE
  children: PlainText[]
}

export interface MyTableElement extends TTableElement, MyBlockElement {
  type: typeof ELEMENT_TABLE
  children: MyTableRowElement[]
}

export interface MyTableRowElement extends TElement {
  type: typeof ELEMENT_TR
  children: MyTableCellElement[] | MyTableThElement[]
}

export interface MyTableThElement extends TElement {
  type: typeof ELEMENT_TH
  children: MyTableCellElement[]
}

export interface MyTableCellElement extends TElement {
  type: typeof ELEMENT_TD
  children: MyNestableBlock[]
}

export interface MyBulletedListElement extends TElement, MyBlockElement {
  type: typeof ELEMENT_UL
  children: MyListItemElement[]
}

export interface MyNumberedListElement extends TElement, MyBlockElement {
  type: typeof ELEMENT_OL
  children: MyListItemElement[]
}

export interface MyListItemElement extends TElement, MyBlockElement {
  type: typeof ELEMENT_LI
  children: MyInlineChildren
}

export interface MyTodoListElement
  extends TTodoListItemElement,
    MyBlockElement {
  type: typeof ELEMENT_TODO_LI
  children: MyInlineChildren
}

export interface MyImageElement extends TImageElement, MyBlockElement {
  type: typeof ELEMENT_IMAGE
  children: [EmptyText]
  vertical?: string
  align?: string
}

export interface MyMediaEmbedElement
  extends TMediaEmbedElement,
    MyBlockElement {
  type: typeof ELEMENT_MEDIA_EMBED
  children: [EmptyText]
}

export interface MyHrElement extends MyBlockElement {
  type: typeof ELEMENT_HR
  children: [EmptyText]
}

export interface MyImageItemElement extends TElement, MyBlockElement {
  type: typeof ELEMENT_IMAGE_ITEM_BLOCK
  children: [MyEH3Element, MyDescElement]
}

export interface MyImageListElement extends TElement, MyBlockElement {
  type: typeof ELEMENT_IMAGE_LIST_BLOCK
  children: MyImageItemElement[]
  id: PlateId
}

export interface MyLinkButton extends TElement, MyBlockElement {
  type: typeof ELEMENT_LINK_BUTTON
  children: [EmptyText]
  url: string
  emoji?: null | string
}

export type MyNestableBlock = MyParagraphElement

export type MyBlock = Exclude<MyElement, MyInlineElement>
export type MyBlockEntry = TNodeEntry<MyBlock>

export type MyRootBlock =
  | MyParagraphElement
  | MyH1Element
  | MyH2Element
  | MyH3Element
  | MyH4Element
  | MyH5Element
  | MyH6Element
  | MyBlockquoteElement
  | MyCodeBlockElement
  | MyTableElement
  | MyBulletedListElement
  | MyNumberedListElement
  | MyTodoListElement
  | MyImageElement
  | MyMediaEmbedElement
  | MyHrElement
  | MyTableElement
  | MyTableCellElement
  | MyTableRowElement
  | MyTableThElement
  | MyLinkButton
// | MyNameElement
// | MyDescElement
// | MyExcalidrawElement;

export type MyValue = MyRootBlock[]

/**
 * Editor types
 */

export type MyEditor = PlateEditor<MyValue> & { isDragging?: boolean }
export type MyReactEditor = TReactEditor<MyValue>
export type MyNode = ENode<MyValue>
export type MyNodeEntry = ENodeEntry<MyValue>
export type MyElement = EElement<MyValue>
export type MyElementEntry = EElementEntry<MyValue>
export type MyText = EText<MyValue>
export type MyTextEntry = ETextEntry<MyValue>
export type MyElementOrText = EElementOrText<MyValue>
export type MyDescendant = EDescendant<MyValue>
export type MyMarks = EMarks<MyValue>
export type MyMark = keyof MyMarks

/**
 * Plate types
 */

export type MyDecorate<P = PluginOptions> = Decorate<P, MyValue, MyEditor>
export type MyDecorateEntry = DecorateEntry<MyValue>
export type MyDOMHandler<P = PluginOptions> = DOMHandler<P, MyValue, MyEditor>
export type MyInjectComponent = InjectComponent<MyValue>
export type MyInjectProps = InjectProps<MyValue>
export type MyKeyboardHandler<P = PluginOptions> = KeyboardHandler<
  P,
  MyValue,
  MyEditor
>
export type MyOnChange<P = PluginOptions> = OnChange<P, MyValue, MyEditor>
export type MyOverrideByKey = OverrideByKey<MyValue, MyEditor>
export type MyPlatePlugin<P = PluginOptions> = PlatePlugin<P, MyValue, MyEditor>
export type MyPlatePluginInsertData = PlatePluginInsertData<MyValue>
export type MyPlatePluginProps = PlatePluginProps<MyValue>
export type MyPlateProps = PlateProps<MyValue, MyEditor>
export type MySerializeHtml = SerializeHtml<MyValue>
export type MyWithOverride<P = PluginOptions> = WithOverride<
  P,
  MyValue,
  MyEditor
>

/**
 * Plate store, Slate context
 */

export const getMyEditor = (editor: MyEditor) =>
  getTEditor<MyValue, MyEditor>(editor)
export const useMyEditorRef = () => useEditorRef<MyValue, MyEditor>()
export const useMyEditorState = () => useEditorState<MyValue, MyEditor>()
export const useMyPlateEditorRef = (id?: PlateId) =>
  usePlateEditorRef<MyValue, MyEditor>(id)
export const useMyPlateEditorState = (id?: PlateId) =>
  usePlateEditorState<MyValue, MyEditor>(id)
export const useMyPlateSelectors = (id?: PlateId) =>
  usePlateSelectors<MyValue, MyEditor>(id)
export const useMyPlateActions = (id?: PlateId) =>
  usePlateActions<MyValue, MyEditor>(id)
export const useMyPlateStates = (id?: PlateId) =>
  usePlateStates<MyValue, MyEditor>(id)

/**
 * Utils
 */
export const createMyEditor = () => createTEditor() as MyEditor
export const createMyPlateEditor = (
  options: CreatePlateEditorOptions<MyValue, MyEditor> = {}
) => createPlateEditor<MyValue, MyEditor>(options)
export const createMyPluginFactory = <P = PluginOptions>(
  defaultPlugin: PlatePlugin<NoInfer<P>, MyValue, MyEditor>
) => createPluginFactory(defaultPlugin)
export const createMyPlugins = (
  plugins: MyPlatePlugin[],
  options?: {
    components?: Record<string, PlatePluginComponent>
    overrideByKey?: MyOverrideByKey
  }
) => createPlugins<MyValue, MyEditor>(plugins, options)

export type MyAutoformatRule = AutoformatRule<MyValue, MyEditor>
