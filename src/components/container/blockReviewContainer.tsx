import React, { useEffect, useState } from 'react'
import { BlockReviewWrapper } from './container.styles'
import WrapperScrollbar from '../scroll/wrapperScrollbar'
import { useRouter } from 'next/router'
import { usePageSWR } from '../../hook/usePageSWR'
import BlockReviewBtn from '../button/blockReviewBtn'

// import { usePageStore } from '../../store'
import { shallow } from 'zustand/shallow'
import { BlockInputType } from '../../hook/type'

const BlockReviewContainer = () => {
  const router = useRouter()
  const [reordered, setReordered] = useState(false)
  // const focusBlockId = usePageStore((state) => state.focusBlockId, shallow)
  const { page } = router.query
  const id = (page && (page[0] as string)) || ''
  // const {
  //   data: { blocks, blockToOrder },
  //   mutateFunction: { updateOrder },
  // } = usePageSWR(id)

  const [items, setItems] = useState<null | BlockInputType['blockData'][]>(null)

  // useEffect(() => {
  //   const blocksContent = sortPageBlock({ blocks, blockToOrder })
  //   setItems(blocksContent)
  // }, [blocks, blockToOrder])

  // useEffect(() => {
  //   if (!reordered) return
  //   const reorderIdMaps = items?.map((item) => item.id)
  //   !!reorderIdMaps && updateOrder(reorderIdMaps)

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [reordered])

  return (
    <BlockReviewWrapper>
      <div className="blockReview-header center">
        <p>Blocks Review Container</p>
      </div>

      <WrapperScrollbar>
        {/* {items && (
          <ReactSortable
            list={items.map((item) => ({ ...item, chosen: true }))}
            setList={setItems}
            className="blockReview-content"
            animation={150}
            handle=".drag-icon"
            onEnd={(event) => setReordered(true)}
            onStart={(event) => setReordered(false)}
          >
            {items?.map((block) => (
              <BlockReviewBtn
                // isFocus={focusBlockId === block?.id}
                id={block?.id}
                name={block?.name}
                key={block?.id}
              />
            ))}
          </ReactSortable>
        )} */}
      </WrapperScrollbar>
    </BlockReviewWrapper>
  )
}

export default React.memo(BlockReviewContainer)
