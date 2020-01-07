import * as print from '../utils/print'
import * as spinner from '../utils/spinner'
import * as docs from '../utils/docs'


const list = async () => {
  await spinner.start(' searching')
  const catalog = await docs.getCatalog()
  await spinner.succeed(true)
  
  const tags = new Set<string>()
  catalog.modules.forEach(docModule => tags.add(docModule.type))
  print.showList([...tags])
  process.exit(0)
}

export default list
