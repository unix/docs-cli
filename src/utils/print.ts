import chalk from 'chalk'
import * as tools from './tools'
import { DocContent } from '../apis'
import { redirectHost } from '../constants/configs'

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

export const notFoundFile = (keyword: string, subword: string): void => {
  const category = chalk.hex('#bdbdbd')(keyword)
  const sub = chalk.hex('#bdbdbd')(subword)
  const command = chalk.green(`docs ${keyword} ls`)
  console.log(chalk.gray(`> "${sub}" cannot be found in category "${category}".`))
  console.log('')
  console.log(chalk.gray(`  show all docs in "${category}" category by command "${command}".`))
  process.exit(0)
}

export const showLikes = (names: string[], moduleName: string): void => {
  console.log(chalk.gray('> No result was found. Are you interested in these:'))
  const str = names.reduce((pre, current) => pre ? `${pre}, ${current}` : current, '')
  const link = chalk.yellow('https://docs.codes/new')
  console.log('  ' + chalk.cyan(str))
  console.log('')
  console.log(chalk.gray(`  You can also submit docs here: ${link}`))
  console.log('')
  process.exit(0)
}

export const showSubmodules = (names: string[], moduleName: string): void => {
  const keyword = chalk.hex('#bdbdbd')(moduleName.toUpperCase())
  console.log(chalk.gray(`> "${keyword}" contains docs:`))
  const str = names.reduce((pre, current) => pre ? `${pre}, ${current}` : current, '')
  console.log('  ' + chalk.cyan(str))
  
  const command = chalk.hex('#bdbdbd')(`docs ${moduleName} <name>`)
  console.log('')
  console.log(chalk.gray(`  run "${command}" to list details.`))
  process.exit(0)
}

const primaryKeys = {
  'main': 'primary docs',
  'repo': 'repository',
  'demos': 'demos',
}

export const showContent = (content: DocContent, keyword: string, subword: string): void => {
  const keys = Object.keys(content)
  console.log(chalk.gray('> List of docs:'))
  console.log('')
  const colon = chalk.hex('#bdbdbd')(':: ')
  keyword = tools.aliasFilter(keyword)
  subword = tools.aliasFilter(subword)
  
  keys.forEach(key => {
    const isPrimary = !!primaryKeys[key]
    const value = primaryKeys[key] || key
    const lineColor = isPrimary ? chalk.cyan : chalk.hex('#bdbdbd')
    
    const name = lineColor(tools.fillString(value))
    const safeKey = encodeURI(tools.aliasFilter(key))
    const link = chalk.yellow(`${redirectHost}${keyword}/${subword}/${safeKey}`)
    
    console.log(`    ${name}${colon}${link}`)
  })
  console.log('')
  process.exit(0)
}
