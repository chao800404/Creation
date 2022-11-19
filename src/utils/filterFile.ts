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
  content?.replace(/<\/?p>/g, '')

export const phoneticNotationFilter = (word: string) => {
  const filter = /[\u3105-\u312F]+/g
  return filter.test(word)
}

export const rgbToHex = (r: number, g: number, b: number) =>
  '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')
