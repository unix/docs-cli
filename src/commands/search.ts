import * as docs from '../utils/docs'
import * as print from '../utils/print'
import * as tools from '../utils/tools'
import * as spinner from '../utils/spinner'

const notFoundItem = (keyword: string) => {
  print.notFoundModule(keyword)
}

const search = async (keyword: string): Promise<void> => {
  keyword = tools.toLowerCase(keyword)
  await spinner.start(' searching')
  const catalog = await docs.getCatalog()
  await spinner.succeed(true)
  
  const docModule = catalog.modules.find(item => item.name === keyword)
  const isType = catalog.modules.find(item => item.type === keyword)
  const docLikes = catalog.modules.filter(item => item.name.includes(keyword))
  const typeLikes = catalog.modules.filter(item => item.type.includes(keyword))
  
  // keyword is not a document
  if (!docModule) {
    // keyword is a category name
    if (isType) return print.showLikes(typeLikes, keyword)
    
    // keyword hit document name
    if (docLikes.length) return print.showLikes(docLikes, keyword)
  
    // keyword hit category name
    if (typeLikes.length) return print.showLikes(typeLikes, keyword)
    
    // not a keyword
    return notFoundItem(keyword)
  }
  
  const content = await docs.getFileContent(docModule)
  print.showContent(content, keyword)
}

export default search
