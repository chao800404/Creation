import React, { useEffect, useState } from 'react'
import { BlockReviewBtnWrapper } from './button.styles'

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
      className="round_sm"
      id={id}
      isFocus={isFocus ? true : false}
      onClick={() => {
        const blocks = [
          ...document.querySelectorAll(`[data-type="block-content"]`),
        ] as HTMLInputElement[]
        blocks.forEach((block) => {
          if (block.id === id) {
            block.focus()
            block.scrollIntoView({ behavior: 'smooth' })
          }
        })
      }}
    >
      {name}
    </BlockReviewBtnWrapper>
  )
}

export default React.memo(BlockReviewBtn)
