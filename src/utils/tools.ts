import { alias } from '../constants/configs'

const space = ' '.repeat(30)

export const fillString = (str: string, length = 17) => {
  if (str.length > length) return str.slice(0, length)
  str += space
  return str.slice(0, length)
}

export const toLowerCase = (text: string | undefined): string => {
  if (!text) return ''
  return text.toLowerCase()
}

export const aliasFilter = (text: string): string => {
  return alias[text] || text
}
