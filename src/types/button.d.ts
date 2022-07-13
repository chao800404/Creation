import { BaseProps } from './base'

export type buttonProps = {
  url?: string
  text?: string
  size?: string
  ml?: number
  bg?: string
  type?: 'google' | 'basic' | 'email'
  handleClick: () => void
}

export interface FeatureBtnProps extends BaseProps {
  flex: ResponsiveValue<Property.Flex<Length>>
  display: ResponsiveValue<Property.Display>
  justifyItems: ResponsiveValue<Property.Flex<Length>>
}
