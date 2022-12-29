export type LabelType<T> = {
  item: {
    label: T
    hasChild: boolean
    isSelected: boolean
    labels: T[]
    removeLabel: (id: string) => void
    index: number
    moveLabel: (dragIndex: number, hoverIndex: number) => void
  }
  list: {
    list: T[]
    labels: T[]
    id: string
    setLabels: (list: T[]) => void
    removeLabel: (id: string) => void
  }
}

type IgnoreLabelType<T> = Omit<
  LabelType<T>['item'],
  'label' | 'index' | 'moveLabel'
>

export type LabelBaseType<T> = IgnoreLabelType<T> & T

export type DragItem = {
  index: number
  id: string
  type: string
}
