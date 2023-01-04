export type LabelType<T> = {
  item: {
    label: T
    hasChild: boolean
    isSelected: boolean
    labels: T[]
    removeLabel: (id: string) => void
    index: number
    moveLabel: (dragIndex: number, hoverIndex: number) => void
    insertLabel: (dragIndex: T, dragIndex: number, hoverIndex: number) => void
  }
  list: {
    list: T[]
    labels: T[]
    id: string
    setLabels: (list: T[]) => void
    removeLabel: (id: string) => void
    addLabel: (label: T) => void
  }
}

type IgnoreLabelType<T> = Omit<
  LabelType<T>['item'],
  'label' | 'index' | 'moveLabel'
>

export type LabelBaseType<T> = Omit<IgnoreLabelType<T>, 'insertLabel'> & T

export type DragItem<T> = T & {
  index: number
  id: string
  type: string
  ref: React.ElementRef
}
