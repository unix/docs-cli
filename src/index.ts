import arg from 'arg'
import * as options from './options'
import * as commands from './commands'
import { catchError } from './utils/print'
import * as tools from './utils/tools'

const args = arg({
  '--help': Boolean,
  '--version': Boolean,
  '-h': '--help',
  '-v': '--version',
})
const [keyword] = args._

;(async() => {
  // options
  if (args['--help']) return options.help()
  if (args['--version']) return options.version()
  
  // commands
  if (!keyword) return options.start()
  if (keyword === 'add') return await commands.add()
  await commands.search(tools.toLowerCase(keyword))
})()
  .catch(catchError)
