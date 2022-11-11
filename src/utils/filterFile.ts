export const isPublicFilesFilter = (path: string) => {
  const PUBLIC_FILE = /\.(.*)$/
  return PUBLIC_FILE.test(path)
}

export const isAuthFilesFilter = (path: string) => {
  const AUTH_FILE = /\/api\/auth*/
  return AUTH_FILE.test(path)
}

export const imageFormatFilter = (path: string) => {
  const THIRD_PARTY = /^https:/i
  return THIRD_PARTY.test(path)
}

export const blockContentFilter = (content: string) =>
  content.replace(/<[^>]*>/g, '')

export const phoneticNotationFilter = (word: string) => {
  const filter = /[\u3105-\u312F]+/g
  return filter.test(word)
}
