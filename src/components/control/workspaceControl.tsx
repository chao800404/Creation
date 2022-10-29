import React from 'react'
import IconContainer from '../iconContainer/iconContainer'
import { SIDE_OPTION } from '../../utils/config'
import { usePageStore } from '../../store'
import shallow from 'zustand/shallow'
import { WorkspaceControllerWrapper } from './control.styles'

type WorkspaceControlType = {
  text: string
}

const WorkspaceControl: React.FC<WorkspaceControlType> = ({ text }) => {
  const newPageAdd = usePageStore((state) => state.newPageAdd, shallow)

  return (
    <WorkspaceControllerWrapper>
      <p>{text}</p>
      <div className="WorkspaceController_content">
        <div className="WorkspaceController_content-icon" onClick={newPageAdd}>
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
