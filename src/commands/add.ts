import chalk from 'chalk'
import * as tools from '../utils/tools'
import { execSync } from 'child_process'

const add = async () => {
  const issue = 'https://docs.codes/new'
  const link = tools.showLink('New document', issue)
  console.log(chalk.gray(`> Submit with link: ${link}`))
  console.log(chalk.hex('#bdbdbd')(`  Thank you for your contribution`))
  console.log('')
  try {
    execSync(`open ${issue}`)
  } catch (e) {
    process.exit(1)
  }
}

export default add
