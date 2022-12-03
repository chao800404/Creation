import React, { useEffect, useRef, useState } from 'react'
import { WorkspaceItemPopupWrapper } from './popup.styles'
import { useMenuPopupStore } from '../../store/useMenuPopupStore'
import shallow from 'zustand/shallow'
import { InitialMenuPopup } from '../../store/useMenuPopupStore'
import PopupItem from '../list-item/popup-item'
import useOnClickOutside from '../../utils/useOnClickOutside'
import GroupItem from '../list-item/groupItem'
const showSet = useMenuPopupStore.getState().showSet

const showMenuPopup = ({
  x,
  y,
  dataType,
  buttonsMap,
  width,
}: Omit<InitialMenuPopup, 'show'>) => {
  showSet({ show: true, x, y, buttonsMap, dataType, width })
}

const hiddenMenuPopup = () => {
  showSet({ show: false, x: 0, y: 0, buttonsMap: null, dataType: '', width: 0 })
}

const MenuPopup = () => {
  const { show, x, y, buttonsMap, dataType, width } = useMenuPopupStore(
    (state) => ({
      show: state.show,
      x: state.x,
      y: state.y,
      buttonsMap: state.buttonsMap,
      dataType: state.dataType,
      width: state.width,
    }),
    shallow
  )

  useOnClickOutside((e) => {
    const target = (e.target as HTMLElement).closest(
      `[data-type="${dataType}"]`
    )
    if (!target) hiddenMenuPopup()
  })

  return (
    <>
      {show && (
        <WorkspaceItemPopupWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            transform: `translate(${x}px,${y}px)`,
          }}
        >
          {buttonsMap?.map((button, index) => {
            if (!!button.children) {
              return (
                <GroupItem
                  key={index}
                  {...button}
                  dataType={dataType}
                  width={width}
                  hiddenMenuPopup={hiddenMenuPopup}
                />
              )
            } else {
              return (
                <PopupItem
                  width={width}
                  key={index}
                  desc={button.desc.replaceAll('_', ' ')}
                  icon={button.icon}
                  onClick={() => {
                    if (button.onClick) button.onClick()
                    hiddenMenuPopup()
                  }}
                  dataType={dataType}
                />
              )
            }
          })}
        </WorkspaceItemPopupWrapper>
      )}
    </>
  )
}

export { MenuPopup, showMenuPopup, hiddenMenuPopup }
