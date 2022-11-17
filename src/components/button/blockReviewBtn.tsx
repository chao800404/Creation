import React from 'react'
import { BlockReviewBtnWrapper } from './button.styles'

type BlockReviewBtnTyep = {
  name: string
  id: string
}

const BlockReviewBtn: React.FC<BlockReviewBtnTyep> = ({ name, id }) => {
  return (
    <BlockReviewBtnWrapper
      className="round_sm"
      id={id}
      whileTap={{ y: 1, scale: 0.98 }}
    >
      {name}
    </BlockReviewBtnWrapper>
  )
}

export default BlockReviewBtn
