import * as docs from '../utils/docs'
import * as print from '../utils/print'
import * as tools from '../utils/tools'

const notFoundItem = (keyword: string) => {
  print.notFoundModule(keyword)
}

const search = async (keyword: string): Promise<void> => {
  keyword = tools.toLowerCase(keyword)
  const catalog = await docs.getCatalog()
  const docModule = catalog.modules.find(item => item.name === keyword)
  const docLikes = catalog.modules.filter(item => item.name.includes(keyword))
  if (!docModule) {
    if (docLikes.length) return print.showLikes(docLikes, keyword)
    return notFoundItem(keyword)
  }
  
  const content = await docs.getFileContent(docModule)
  print.showContent(content, keyword)
}

export default search
