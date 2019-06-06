import fetch from './fetch'
import { Catalog, DocContent, Subcatalog } from '../apis'


export const getCatalog = (): Promise<Catalog> => {
  return fetch('catalog.json')
}

export const getSubcatalog = (name: string): Promise<Subcatalog> => {
  return fetch(`${name}/catalog.json`)
}

export const getFileContent = (name: string, filename: string): Promise<DocContent> => {
  return fetch(`${name}/${filename}.json`)
}