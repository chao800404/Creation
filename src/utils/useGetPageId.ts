import router from 'next/router'

export const useGetPageId = () => {
  const { page } = router.query
  return (page && (page[0] as string)) || ''
}
