const path = require('path')
const fs = require('fs')

const allModules = [
  'core',
  'imgproc',
  'calib3d',
  'face',
  'dnn',
  'features2d',
  'io',
  'machinelearning',
  'objdetect',
  'photo',
  'text',
  'tracking',
  'video',
  'ximgproc',
  'xfeatures2d'
]

const CLASS_FILE = '_class.json'

function stripJsonSuffix(file) {
  return file.replace('.json', '')
}

function getFunctionFiles(classDocsPath) {
  return fs.readdirSync(classDocsPath)
    .filter(file => file !== CLASS_FILE)
}

function readFunctionFile(classDocsPath, fnName) {
  return require(path.resolve(classDocsPath, fnName))
}

function readClassFile(classDocsPath) {
  const classJson = path.resolve(classDocsPath, CLASS_FILE)
  return fs.existsSync(classJson) ? require(classJson) : null
}

function categoryOrDefault(category) {
  return category || 'default'
}

function buildCategories(classDocsPath, fnNames) {
  const functions = fnNames.map(fnName => readFunctionFile(classDocsPath, fnName))
  const categories = new Set(
    [
      // make default category appear at the top
      categoryOrDefault(null)
    ].concat(
      functions.map(fn => categoryOrDefault(fn.category))
    )
  )

  return Array.from(categories.keys())
    .map(category => ({
      category,
      fnNames: functions
        .filter(f => categoryOrDefault(f.category) === category)
        .map(f => f.fnName)
    }))
    .filter(category => category)
}

function buildApiTree(docsPath) {
  const classFolders = fs.readdirSync(docsPath)

  const classes = classFolders
    .map(file => readClassFile(path.resolve(docsPath, file)))
    .filter(c => c)

  const functions = fs.readdirSync(path.resolve(docsPath, 'cv'))
    .map(fnName => readFunctionFile(path.resolve(docsPath, 'cv'), fnName))

  return allModules
    .map(cvModule => ({
      cvModule,
      classTrees: classes
        .filter(c => c.cvModule === cvModule)
        .map(c => ({
          className: c.className,
          fnNamesWithCategory: buildCategories(
            path.resolve(docsPath, c.className),
            getFunctionFiles(path.resolve(docsPath, c.className))
              .map(stripJsonSuffix)
          )
        })),
      cvFnNames: functions
        .filter(f => f.cvModule === cvModule)
        .map(f => f.fnName)
    }))
}

exports.createPages = ({ boundActionCreators, graphql }) => {

  const { createPage, createRedirect } = boundActionCreators

  createRedirect({
    fromPath: '/',
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/docs'
  })

  createRedirect({
    fromPath: '/docs',
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/docs/Mat'
  })


  const template = path.resolve(__dirname, 'src/templates/docsPage.tsx')
  const docsPath = path.resolve(__dirname, 'static/docs')

  const apiTree = buildApiTree(docsPath)

  const classFolders = fs.readdirSync(docsPath)

  return Promise.all([
    classFolders.map((className) => {
      const classDocsPath = path.resolve(docsPath, className)
      const functions = getFunctionFiles(classDocsPath)
        .map(fnName => readFunctionFile(classDocsPath, fnName))

      const clazz = readClassFile(classDocsPath)

      return createPage({
        path: `/docs/${className}`,
        component: template,
        context: {
          apiTree,
          clazz,
          functions
        }
      })
    })
  ])
}