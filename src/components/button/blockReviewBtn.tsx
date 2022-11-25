import React from 'react'
import { BlockReviewBtnWrapper } from './button.styles'
import { MdOutlineDragHandle } from 'react-icons/md'

type BlockReviewBtnTyep = {
  name: string
  id: string
  isFocus: boolean
}

const BlockReviewBtn: React.FC<BlockReviewBtnTyep> = ({
  name,
  id,
  isFocus,
}) => {
  return (
    <BlockReviewBtnWrapper
      className="round_sm "
      id={id}
      isFocus={isFocus ? true : false}
      onClick={() => {
        const blocks = [
          ...document.querySelectorAll(`[data-type="block-content"]`),
        ] as HTMLInputElement[]
        blocks.forEach((block) => {
          if (block.id === id) {
            block.focus()
            block.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        })
      }}
    >
      <span></span>
      <span>{name}</span>
      <span className="drag-icon">
        <MdOutlineDragHandle color="inherit" />
      </span>
    </BlockReviewBtnWrapper>
  )
}

export default React.memo(BlockReviewBtn)
