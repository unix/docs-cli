import chalk from 'chalk'
const pkg = require('../package.json')

export const help = () => {
  console.log(`${chalk.cyan('add')} \<command\> -- add a document`)
  console.log(`${chalk.cyan('-v, --version')} \<option\> -- show version`)
  console.log('')
}

export const version = () => {
  console.log(`v${pkg.version}\n`)
}

export const start = () => {
  const gray = chalk.hex('#a5a5a5')
  const docs = chalk.bold.hex('#e0e0e0')('📦 DOCS')
  const command = chalk.cyan('docs <keyword>')
  const add = chalk.cyan('add')
  console.log(chalk.gray(`  ${docs}`))
  console.log(gray(`> Run "${command}" to start`))
  console.log(gray(`> Submit docs with ${add}`))
  console.log('')
}
