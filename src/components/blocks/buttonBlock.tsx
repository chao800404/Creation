import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  EditorContent,
  NodeViewProps,
  useEditor,
  NodeViewContent,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react'
import { mergeAttributes, Node } from '@tiptap/core'
import { useRouter } from 'next/router'
import { BsGearFill } from 'react-icons/bs'
import {
  AiOutlineClose,
  AiOutlineHistory,
  AiOutlineCloseCircle,
} from 'react-icons/ai'
import {
  ButtonBlockWrapper,
  ButtonBlockPopupWrapper,
  ButtonBlockPopupListItemWrapper,
} from './block.styles'
import WrapperScrollbar from '../scroll/wrapperScrollbar'
import { useListSWR, ResDataType } from '../../hook/useListSWR'
import { TypeIcon } from '../drop/treeView/typeIcon'
import { BsArrowReturnLeft, BsCheckLg } from 'react-icons/bs'
import { useLabelStore } from '../../store/useLabelStore'
import { Heightlight } from '../heightLight'
import shallow from 'zustand/shallow'
import { NodeViewPropsAttrs } from './type'
import { httpParser } from '../../utils/filterFile'

const ButtonBlockPopupListItem: React.FC<{
  node: ResDataType
  parentNode?: ResDataType
  hasChild: boolean
  searchFields: string | null
  onClick: React.MouseEventHandler<HTMLDivElement>
}> = ({ node, hasChild, parentNode, onClick, searchFields }) => (
  <ButtonBlockPopupListItemWrapper onClick={onClick}>
    <span className="popup_list-icon">
      <TypeIcon
        isOpen={true}
        hasChild={hasChild}
        node={node}
        iconSize="1.5rem"
      />
    </span>
    <div className="popup_list-text">
      <Heightlight
        text={node.text && node.text.length > 0 ? node.text : 'Untitled'}
        className="match"
        searchFields={searchFields}
      />
      <p>{`From ${parentNode?.text}`}</p>
    </div>
    <div className="popup_list-link">
      {searchFields ? <BsArrowReturnLeft /> : <AiOutlineHistory />}
    </div>
  </ButtonBlockPopupListItemWrapper>
)

const ButtonBlockPopup: React.FC<{
  list: ResDataType[]
  history: ResDataType[]
  link: string
  name: string
  linkSet: (link: string) => void
  toggleOpen: () => void
  toggleNewTab: (toggle: boolean) => void
  nameSet: (name: string) => void
  newTab: boolean
}> = ({
  list,
  linkSet,
  toggleOpen,
  history,
  toggleNewTab,
  newTab,
  link,
  nameSet,
}) => {
  const [linkType, setLinkType] = useState<'internal' | 'external'>(
    httpParser(link) ? 'external' : 'internal'
  )

  const [searchFields, setSearchFields] = useState<null | string>(null)
  const [externalLink, setExternalLink] = useState(link)
  const [error, setError] = useState(!httpParser(link))
  const checkRef = useRef<HTMLInputElement | null>(null)

  const filterFields = useMemo(() => {
    return (
      (searchFields &&
        list.filter((item) =>
          item.text?.toLowerCase().includes(searchFields?.toLowerCase())
        )) ||
      []
    )
  }, [list, searchFields])

  const internal = linkType === 'internal'
  const filterDocs = !searchFields ? history : filterFields

  return (
    <ButtonBlockPopupWrapper className="round_sm">
      <div
        className={`popup_label center ${internal && `active`}`}
        onClick={() => setLinkType('internal')}
      >
        <span>INTERNAL LINK</span>
      </div>
      <div
        className={`popup_label center ${!internal && `active`}`}
        onClick={() => setLinkType('external')}
      >
        <span>EXTERNAL LINK</span>
      </div>
      <div className="popup_container">
        {internal ? (
          <>
            <input
              type="text"
              placeholder="Search Docs"
              autoFocus={true}
              onChange={(e) => {
                e.target.value.length === 0
                  ? setSearchFields(null)
                  : setSearchFields(e.target.value)
              }}
            />

            <WrapperScrollbar>
              <div className="popup_field-name ">
                {!searchFields ? 'RECENT DOCS' : 'FILTER DOCS'}
              </div>
              {filterDocs?.map((item) => {
                const hasChild = list.some((i) => i.parent === item.id)
                const parentNode = list.find((i) => i.id === item.parent)
                return (
                  <ButtonBlockPopupListItem
                    key={item.id}
                    hasChild={hasChild}
                    node={item}
                    parentNode={parentNode}
                    onClick={() => {
                      linkSet(item.id as string)
                      nameSet(item.text)
                      toggleOpen()
                    }}
                    searchFields={searchFields}
                  />
                )
              })}
            </WrapperScrollbar>
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const checkBox = checkRef.current

              if (!error && checkBox) {
                linkSet(externalLink)
                toggleNewTab(checkBox.checked)
                nameSet(externalLink.split('.')[1])
                toggleOpen()
              }
            }}
          >
            <div className="form_input">
              <label className="checkIcon center">
                {error ? (
                  <AiOutlineCloseCircle color="red" />
                ) : (
                  <BsCheckLg color="green" />
                )}
              </label>
              <input
                type="text"
                placeholder="Set link"
                autoFocus={true}
                id="link_input"
                defaultValue={externalLink === '/' ? '' : externalLink}
                onChange={(e) => {
                  const value = e.target.value
                  setError(!(httpParser(value) || value.length === 0))
                  setExternalLink(value)
                }}
              />
            </div>

            <div className="form_body">
              <div className="form_error">
                <p>ex. https://www.google.com/</p>
              </div>
              <div className="newTab">
                <label htmlFor="newTab">Opens new tab</label>
                <input
                  id="newTab_input"
                  defaultChecked={newTab}
                  name="newTab"
                  type="checkbox"
                  ref={checkRef}
                />
              </div>
            </div>

            <button className="center">SET LINK</button>
          </form>
        )}
      </div>
    </ButtonBlockPopupWrapper>
  )
}

const ButtonBlockNode = (props: NodeViewProps) => {
  const router = useRouter()
  const { open, link, newTab, name } = props.node.attrs as NodeViewPropsAttrs
  const history = useLabelStore((state) => state.history, shallow)
  const {
    data: { list },
  } = useListSWR()

  const toggleOpen = () => {
    props.updateAttributes({
      open: !open,
    })
  }

  const linkSet = (link: string) => {
    props.updateAttributes({
      link,
    })
  }

  const toggleNewTab = (toggle: boolean) => {
    props.updateAttributes({
      newTab: toggle,
    })
  }

  const nameSet = (name: string) => {
    const html = props.editor.getHTML()
    const text = props.editor.getText()
    const newHtml = html.replace(text, name)
    props.editor.commands.setContent(newHtml)
  }

  return (
    <NodeViewWrapper className="link-button">
      <ButtonBlockWrapper>
        <button
        // onClick={(e) => {
        //   e.preventDefault()
        //   httpParser(link)
        //     ? window.open(link, newTab ? '_black' : '')
        //     : router.push(`dashboard/${link}`)
        // }}
        >
          <span>
            <NodeViewContent />
          </span>
          <span
            onClick={(e) => {
              e.preventDefault()
              toggleOpen()
            }}
          >
            {open ? <AiOutlineClose /> : <BsGearFill />}
          </span>
        </button>
        {open && list && (
          <div className="button_block-popup" contentEditable={false}>
            <ButtonBlockPopup
              list={list}
              linkSet={linkSet}
              toggleOpen={toggleOpen}
              toggleNewTab={toggleNewTab}
              history={history}
              newTab={newTab}
              link={link}
              name={name}
              nameSet={nameSet}
            />
          </div>
        )}
      </ButtonBlockWrapper>
    </NodeViewWrapper>
  )
}

const ButtonBlock = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
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
    ],
    content: `
      <buttonLink open="false" link="/" newTab="true" >
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
