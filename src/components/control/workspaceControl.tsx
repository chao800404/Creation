import React from 'react'
import IconContainer from '../iconContainer/iconContainer'
import { SIDE_OPTION } from '../../utils/config'
import { usePageStore } from '../../store'
import shallow from 'zustand/shallow'
import { WorkspaceControllerWrapper } from './control.styles'
import { useAddNewPage } from '../../hook/useAddNewPage'
import useSWR, { useSWRConfig } from 'swr'
import { createData, fetcher } from '../../utils/fetch'
import { v4 as uuidv4 } from 'uuid'

type WorkspaceControlType = {
  text: string
}

const WorkspaceControl: React.FC<WorkspaceControlType> = ({ text }) => {
  const newPageAdd = useAddNewPage()

  return (
    <WorkspaceControllerWrapper>
      <p>{text}</p>
      <div
        className="WorkspaceController_content"
        onClick={async () => {
          newPageAdd()
        }}
      >
        <div className="WorkspaceController_content-icon">
          <IconContainer icon={SIDE_OPTION.workspaces.icon[0]} />
        </div>
        <div className="WorkspaceController_content-icon">
          <IconContainer icon={SIDE_OPTION.workspaces.icon[1]} />
        </div>
        <div className="WorkspaceController_content-icon">
          <IconContainer icon={SIDE_OPTION.workspaces.icon[2]} />
        </div>
      </div>
    </WorkspaceControllerWrapper>
  )
}

export default React.memo(WorkspaceControl)
