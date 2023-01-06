import { useRouter } from 'next/router'
import { useListSWR } from '../../../hook/useListSWR'
import { useLabelStore } from '../../../store/useLabelStore'
import { NodeViewPropsAttrs } from '../type'
import { NodeViewProps, NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import { useKeydownStore } from '../../../store/useKeydownStore'
import shallow from 'zustand/shallow'
import { ButtonBlockPopup } from './buttonBlockPopup'
import { TypeIcon } from '../../drop/treeView/typeIcon'
import { AiOutlineClose } from 'react-icons/ai'
import { BsGearFill } from 'react-icons/bs'
import { ButtonBlockWrapper } from './buttonBlock.styles'
import { motion, AnimatePresence } from 'framer-motion'
import useCalcWindowHeight from '../../../utils/useCalcWindowHeight'
import { useRef, useState } from 'react'
import useWindowPointerToggle from '../../../utils/useWindowPointerToggle'

const animate = (scale: number) => ({
  scale: scale,
  originX: 0,
  originY: 0,
})

export const ButtonBlockNode = (props: NodeViewProps) => {
  const router = useRouter()

  const { open, link, newTab, name, id } = props.node
    .attrs as NodeViewPropsAttrs
  const history = useLabelStore((state) => state.history, shallow)
  const [isEnter, setIsEnter] = useState(false)

  const {
    data: { list },
  } = useListSWR()

  const toggleOpen = (toggle?: boolean) => {
    const { reset } = useKeydownStore.getState()
    props.updateAttributes({
      open: typeof toggle === 'boolean' ? toggle : !open,
    })
    reset()
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

  const linkIdSet = (id: string) => {
    props.updateAttributes({
      id,
    })
  }

  const nameSet = (name: string) => {
    const html = props.editor.getHTML()
    const text = props.editor.getText()
    const newHtml = html.replace(text, name)
    props.editor.commands.setContent(newHtml)
  }

  const { ref } = useWindowPointerToggle(() => toggleOpen(false))
  const isTop = useCalcWindowHeight({ elem: ref.current, depend: isEnter })

  console.log(ref)

  return (
    <NodeViewWrapper
      className="link-button"
      ref={ref}
      onMouseEnter={() => setIsEnter((prev) => !prev)}
      onMouseLeave={() => setIsEnter((prev) => !prev)}
    >
      <ButtonBlockWrapper>
        <button
        // onClick={(e) => {
        //   e.preventDefault()
        //   httpParser(link)
        //     ? window.open(link, newTab ? '_black' : '')
        //     : router.push(`dashboard/${link}`)
        // }}
        >
          <span className="center">
            {id && (
              <div>
                <TypeIcon
                  isOpen={true}
                  hasChild={!!list?.find((item) => item.parent === id)}
                  node={list?.find((item) => item.id === id)}
                  iconSize="1.5rem"
                />
              </div>
            )}
          </span>

          <span className="link-text">
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

        {open && list && isTop && (
          <div
            style={{ bottom: isTop === 'TOP' ? '3.5rem' : '-15.5rem' }}
            className="button_block-popup"
            contentEditable={false}
          >
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
              linkIdSet={linkIdSet}
            />
          </div>
        )}
      </ButtonBlockWrapper>
    </NodeViewWrapper>
  )
}
