export const Heightlight = ({
  text,
  searchFields,
  className,
}: {
  text: string
  searchFields: string | null
  className: string
}) => {
  const coloringWord = searchFields
    ? text?.replace(
        searchFields?.toLocaleLowerCase(),
        `<span class=${className}>${searchFields?.toLocaleLowerCase()}</span>`
      )
    : text

  return (
    <p
      dangerouslySetInnerHTML={{
        __html: text && text.length > 0 ? coloringWord : 'Untitle',
      }}
    />
  )
}
