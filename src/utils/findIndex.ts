type MapType = { id: string }[]

export const findIndex = (
  map: MapType,
  id: string,
  callback: (index: number) => void
) => {
  const index = map.findIndex((item) => item.id === id)
  if (index !== -1 && index !== undefined) {
    callback(index)
  }
}
