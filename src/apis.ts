export interface DocModule {
  name: string
  type: string
}

export interface Catalog {
  modules: DocModule[]
}

export interface DocContent {
  [key: string]: string
}
