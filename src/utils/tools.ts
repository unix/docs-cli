import terminalLink from 'terminal-link'

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

export const showLink = (text: string, url: string): string => {
  return terminalLink(text, url, {
    fallback: (text: string, url: string): string => {
      return `${text} [${url}]`
    },
  })
}

export const supportLink = (): boolean => {
  return terminalLink.isSupported
}
