import React, { useCallback, useState } from 'react'
import update from 'immutability-helper'
import { ResDataType } from '../../../hook/useListSWR'
import { LabelItemWrapper } from './lableItemWrapper'
import { LaybelContainerWrapper } from './label.styles'
import { LabelType } from './type'

const LabelContainer = ({
  list,
  id,
  removeLabel,
  setLabels,
  labels,
}: LabelType<ResDataType>['list']) => {
  const moveLabel = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setLabels(
        update(labels, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, labels[dragIndex]],
          ],
        })
      )
    },
    [labels, setLabels]
  )

  const renderLabel = useCallback(
    (item: ResDataType, index: number) => {
      return (
        <LabelItemWrapper
          key={item.id}
          index={index}
          moveLabel={moveLabel}
          label={item}
          isSelected={item.id === id}
          hasChild={list.some((label) => label.parent === item.id)}
          removeLabel={removeLabel}
          labels={labels}
        />
      )
    },
    [id, labels, list, moveLabel, removeLabel]
  )

  return (
    <>
      <LaybelContainerWrapper>
        {labels.map((label, i) => renderLabel(label, i))}
      </LaybelContainerWrapper>
    </>
  )
}

export default LabelContainer
