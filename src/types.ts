export type ClassTree = {
  className: string
  fnNamesWithCategory: {
    category: string
    fnNames: string[]
  }[]
}

export type CvModuleTree = {
  cvModule: string
  classTrees: ClassTree[]
  cvFnNames: string[]
}