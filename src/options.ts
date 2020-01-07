import chalk from 'chalk'
const pkg = require('../package.json')

export const help = () => {
  console.log(chalk.gray(`> Commands:`))
  console.log(`  ${chalk.cyan('add')} \<command\> -- add a document`)
  console.log(`  ${chalk.cyan('ls')}  \<command\> -- show all tags`)
  console.log(`  ${chalk.cyan('-v, --version')} \<option\> -- show version`)
  console.log('')
}

export const version = () => {
  console.log(`v${pkg.version}\n`)
}

export const start = () => {
  const gray = chalk.hex('#a5a5a5')
  const docs = chalk.bold.hex('#e0e0e0')('📦 DOCS')
  console.log('')
  console.log(chalk.gray(`    ${docs}`))
  console.log(chalk.hex('#f0f0f0')('    One command gets all the documents.'))
  console.log('')
  console.log(gray(`    - Run "${chalk.cyan('docs <keyword>')}" to start`))
  console.log(gray(`    - Submit docs with "${chalk.cyan('add')}"`))
  console.log('')
}
