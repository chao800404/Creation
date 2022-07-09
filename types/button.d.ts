export type buttonProps = {
  url?: string
  text?: string
  size?: string
  ml?: number
  bg?: string
  type?: 'google' | 'basic' | 'email'
  handleClick: () => void
}
