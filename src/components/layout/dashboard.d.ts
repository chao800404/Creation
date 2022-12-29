export type MenuType<T, K> = (
  node: T,
  renameFn: K
) => {
  icon: IconType
  desc: string
  onClick: () => void
}[]
