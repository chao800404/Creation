type MapType = { id: string | number }[]

export const findIndex = <T extends MapType>(
  map: T,
  id: string,
  callback: (index: number) => void
) => {
  const index = map.findIndex((item) => item.id === id)
  if (index !== -1 && index !== undefined) {
    return callback(index)
  }
}
