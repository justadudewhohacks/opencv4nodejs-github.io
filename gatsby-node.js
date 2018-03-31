const path = require('path')
const fs = require('fs')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  const template = path.resolve(__dirname, 'src/templates/docsPage.tsx')
  const docsPath = path.resolve(__dirname, 'static/docs')
  const classFolders = fs.readdirSync(docsPath)

  return Promise.all([
    classFolders.map((className) => {
      const classDocsPath = path.resolve(docsPath, className)
      const functions = fs.readdirSync(classDocsPath)
        .map(functionJson => require(path.resolve(classDocsPath, functionJson)))

      return createPage({
        path: `/docs/${className}`,
        component: template,
        context: {
          className,
          functions
        }
      })
    })
  ])
}