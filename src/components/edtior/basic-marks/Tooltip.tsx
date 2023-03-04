import { TippyProps } from '@tippyjs/react'
import { TippyComponentProps } from './type'

const TippyComponent = ({ name, command }: TippyComponentProps) => (
  <span>
    {name} &nbsp;{' '}
    <span style={{ color: 'white', fontWeight: 300 }}>
      (&nbsp;{command}&nbsp;)
    </span>
  </span>
)

export const markTooltip = (props: TippyComponentProps): TippyProps => ({
  theme: 'dark',
  content: <TippyComponent {...props} />,
})
