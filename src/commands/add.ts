import chalk from 'chalk'
import { execSync } from 'child_process'

const add = async () => {
  const issue = 'https://docs.codes/new'
  const link = chalk.yellow(issue)
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
