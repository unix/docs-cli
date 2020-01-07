import chalk from 'chalk'
import * as tools from './tools'
import * as shorthash from 'shorthash'
import { DocContent, DocModule } from '../apis'
import { redirectHost } from '../constants/configs'

const keyShading = (name: string, keyword: string) => {
  const point = chalk.cyanBright(keyword)
  return name.replace(new RegExp(keyword, 'g'), point)
}

export const catchError = (error: Error) => {
  const msg = error.message || `${error}`
  console.log(chalk.red('> Abort.'))
  console.log(chalk.red(`  ${msg}.`))
  process.exit(1)
}

export const notFoundModule = (name: string): void => {
  const keyword = chalk.hex('#bdbdbd')(name.toUpperCase())
  const link = chalk.yellow('https://docs.codes/new')
  console.log(chalk.gray(`> Not found any docs about "${keyword}".`))
  console.log(chalk.gray(`  You can also submit docs here: ${link}`))
  console.log('')
  process.exit(0)
}

export const showLikes = (docModules: DocModule[], keyword: string): void => {
  const names = docModules.map(doc => doc.name)
  const str = names.reduce((pre, current) => {
    const coloredText = keyShading(current, keyword)
    return pre ? `${pre}, ${coloredText}` : coloredText
  }, '')
  
  const command = chalk.yellowBright('npx docs add')
  console.log(chalk.gray('> No result. Are you interested in these:'))
  console.log('  ' + chalk.hex('#f0f0f0')(str))
  console.log('')
  console.log(chalk.gray(`  You can also submit docs by: ${command}`))
  console.log('')
  process.exit(0)
}

const primaryKeys = {
  'main': 'primary docs',
  'repo': 'repository',
  'demos': 'demos',
}

export const showContent = (content: DocContent, keyword: string): void => {
  const keys = Object.keys(content)
  let text = ''
  const spacing = tools.supportLink() ? ',  ' : '\n  '
  
  keys.forEach((key, index) => {
    const isPrimary = !!primaryKeys[key]
    const value = primaryKeys[key] || key
    const lineColor = isPrimary ? chalk.cyan : chalk.hex('#bdbdbd')
    
    const name = lineColor(tools.supportLink() ? value : tools.fillString(value))
    const hash = shorthash.unique(content[key])
    text += `${tools.showLink(name, redirectHost + hash)}${spacing}`
    if (index !== 0 && index % 6 === 0 && tools.supportLink()) {
      text += '\n  '
    }
  })
  console.log(chalk.bgCyanBright.black(`  ${keyword.toUpperCase()}`))
  console.log(chalk.gray('> List of docs:'))
  console.log('')
  console.log(' ', text)
  console.log('')
  process.exit(0)
}

export const showList = (tags: string[]): void => {
  let text = ''
  tags.forEach((tag, index) => {
    const prefix = index === 0 ? '  ' : ',  '
    text += `${prefix}${chalk.cyan(tag)}`
  })
  console.log(chalk.gray('> All tags:'))
  console.log(text)
  console.log('')
}
