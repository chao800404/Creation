import { BlockInputType } from '../hook/type'
import { useMemo } from 'react'

export const sortPageBlock = ({
  blocks,
  blockToOrder,
}: {
  blocks?: BlockInputType['blockData'][]
  blockToOrder?: string[]
}) => {
  const blockToMap = blocks?.reduce((acc, block) => {
    acc[block.id] = block
    return acc
  }, {} as { [key: string]: BlockInputType['blockData'] })

  return blockToOrder?.map(
    (id) => blockToMap && blockToMap[id]
  ) as BlockInputType['blockData'][]
}
