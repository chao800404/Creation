import React from 'react'
import IconContainer from '../iconContainer/iconContainer'
import { SIDE_OPTION } from '../../utils/config'
import { WorkspaceControllerWrapper } from './control.styles'
import { useListSWR } from '../../hook/useListSWR'

type WorkspaceControlType = {
  text: string
}

const WorkspaceControl: React.FC<WorkspaceControlType> = ({ text }) => {
  const { mutateFunction } = useListSWR()

  return (
    <WorkspaceControllerWrapper>
      <p className="caption">{text}</p>
      <div
        className="WorkspaceController_content"
        onClick={() => {
          mutateFunction.addNewPage()
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
