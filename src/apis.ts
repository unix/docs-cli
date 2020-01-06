export interface Apis {

}

export interface DocModule {
  name: string
  type: string
}

export interface Catalog {
  modules: DocModule[]
}

export interface Subcatalog {
  files: string[]
}

export interface DocContent {
  [key: string]: string
}
