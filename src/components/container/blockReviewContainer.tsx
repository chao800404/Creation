import React from 'react'
import { BlockReviewWrapper } from './container.styles'
import WrapperScrollbar from '../scroll/wrapperScrollbar'
import { useRouter } from 'next/router'
import { usePageSWR } from '../../hook/usePageSWR'
import BlockReviewBtn from '../button/blockReviewBtn'
import { sortPageBlock } from '../../utils/sortPageBlock'

const BlockReviewContainer = () => {
  const router = useRouter()
  const { page } = router.query
  const id = (page && (page[0] as string)) || ''
  const {
    data: { blocks, blockToOrder },
  } = usePageSWR(id)

  const blocksContent = sortPageBlock({ blocks, blockToOrder })

  return (
    <BlockReviewWrapper>
      <div className="blockReview-header center">
        <p>Blocks Review Container</p>
      </div>
      <WrapperScrollbar>
        <div className="blockReview-content">
          {blocksContent?.map((block, index) => (
            <BlockReviewBtn id={block?.id} key={index} name={block?.name} />
          ))}
        </div>
      </WrapperScrollbar>
    </BlockReviewWrapper>
  )
}

export default BlockReviewContainer
