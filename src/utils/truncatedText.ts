export const truncatedText = (text: string, bound: number | string) => {
  return (
    text
      .split('')
      .filter((_, index) => index <= bound)
      .join('') + '...'
  )
}
