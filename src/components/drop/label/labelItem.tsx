import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineCloseSquare } from 'react-icons/ai'
import { ResDataType } from '../../../hook/useListSWR'
import { TypeIcon } from '../treeView/typeIcon'
import { LabelItemWrapper } from './label.styles'
import { LabelBaseType } from './type'

const LabelItem = (props: LabelBaseType<ResDataType>) => {
  const router = useRouter()

  const handleOnClick = (e: React.MouseEvent) => {
    e.preventDefault()
    props.removeLabel(props.id as string)
    if (props.isSelected) {
      const index = props.labels.findIndex((label) => label.id === props.id)
      const preLabel = props.labels[index - 1]
      router.push(`dashboard/${preLabel.id}`)
    }
  }

  return (
    <LabelItemWrapper
      id={`${props.id}`}
      className="center"
      isSelected={props.isSelected}
    >
      <Link href={`dashboard/${props.id}`}>
        <a className="root">
          <div className="root">
            <div className="workspace-item-icon">
              <TypeIcon isOpen={false} hasChild={props.hasChild} node={props} />
            </div>
            <p>
              {props.text && props.text.length > 0 ? props.text : 'Untitled'}
            </p>
          </div>

          <div className="label-close" onClick={handleOnClick}>
            <AiOutlineCloseSquare />
          </div>
        </a>
      </Link>
    </LabelItemWrapper>
  )
}

export default React.memo(LabelItem)
