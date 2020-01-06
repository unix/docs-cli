import fetch from './fetch'
import { Catalog, DocContent, DocModule, Subcatalog } from '../apis'


export const getCatalog = (): Promise<Catalog> => {
  return fetch('dist/_catalog.json')
}

export const getFileContent = (docModule: DocModule): Promise<DocContent> => {
  return fetch(`${docModule.type}/${docModule.name}.json`)
}
