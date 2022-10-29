import React from 'react'
import ChangeCoverPopupGrid from '../layout/changeCoverPopupGrid'

const ChangeCoverPopupLayout = ({
  coverImageMap,
}: {
  coverImageMap: Record<string, string[]>
}) => {
  return (
    <>
      {coverImageMap &&
        Object.keys(coverImageMap).map((coverGroup, index) => (
          <ChangeCoverPopupGrid
            key={index}
            GroupName={coverGroup}
            coverGroup={coverImageMap[coverGroup as string]}
          />
        ))}
    </>
  )
}

export default ChangeCoverPopupLayout
