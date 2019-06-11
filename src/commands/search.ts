import * as docs from '../utils/docs'
import * as print from '../utils/print'
import * as tools from '../utils/tools'
import { Catalog, DocContent } from '../apis'

const getFiles = async (name: string) => {
  const subcatalog = await docs.getSubcatalog(name)
  return subcatalog.files
}

const showSubmodule = async (name: string) => {
  const files = await getFiles(name)
  const safeFiles = files.filter(item => item !== 'index')
  print.showSubmodules(safeFiles, name)
}

const notFoundSubmodule = (catalog: Catalog, keyword: string) => {
  const likes = catalog.modules.filter(item => item.includes(keyword))
  if (!likes || !likes.length) return print.notFoundModule(keyword)
  print.showLikes(likes, keyword)
}

const notFoundFile = (keyword: string, subword: string) => {
  print.notFoundFile(keyword, subword)
}

const search = async (keyword: string, subword: string): Promise<void> => {
  keyword = tools.getStandardKeyword(keyword)
  const catalog = await docs.getCatalog()
  const hasSubmodule = catalog.modules.find(item => item === keyword)
  if (!hasSubmodule) return notFoundSubmodule(catalog, keyword)
  if (subword === 'ls') return showSubmodule(keyword)
  if (!subword) {
    subword = 'index'
  }
  
  const files = await getFiles(keyword)
  const hasFile = files.find(item => item === subword)
  if (!hasFile) return notFoundFile(keyword, subword)
  
  const content = await docs.getFileContent(keyword, subword)
  print.showContent(content, keyword, subword)
}

export default search
