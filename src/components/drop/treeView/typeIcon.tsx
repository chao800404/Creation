import { HiOutlineDocumentText } from 'react-icons/hi'
import { TreeDataType, TreeProps } from './type'
import React from 'react'

import { VscFolder, VscFolderOpened } from 'react-icons/vsc'
import { ListData } from '../../../hook/useListSWR'
import Image from 'next/image'

type TypeIcon<T> = {
  isOpen: boolean
  hasChild: boolean
  node: TreeDataType<T>
  iconSize?: string
}

export const TypeIcon = ({
  isOpen,
  hasChild,
  node,
  iconSize,
}: TypeIcon<ListData>) => {
  const emoji = node.data?.emoji
  const iconSizes = iconSize ? iconSize : '1rem'

  return (
    <div
      style={{
        width: iconSizes,
        height: iconSizes,
        position: 'relative',
      }}
    >
      {emoji?.image && emoji?.image?.length > 0 ? (
        <Image
          alt="emoji"
          layout="fill"
          objectFit="cover"
          id={emoji.id}
          src={emoji?.image || ''}
        />
      ) : hasChild ? (
        isOpen ? (
          <VscFolderOpened fontSize={iconSizes} />
        ) : (
          <VscFolder fontSize={iconSizes} />
        )
      ) : (
        <HiOutlineDocumentText fontSize={iconSizes} />
      )}
    </div>
  )
}
