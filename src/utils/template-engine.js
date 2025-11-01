const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const Handlebars = require('handlebars')

function renderTemplate(templateName, engine, config) {
  const templateDir = path.resolve(
    __dirname,
    `../../templates/${templateName}/${engine}`
  )
  const files = {}

  fs.readdirSync(templateDir).forEach((file) => {
    const filePath = path.join(templateDir, file)
    const content = fs.readFileSync(filePath, 'utf8')

    let rendered
    if (engine === 'ejs') {
      rendered = ejs.render(content, config)
    } else if (engine === 'hbs') {
      const compile = Handlebars.compile(content)
      rendered = compile(config)
    }

    files[file.replace(`.${engine}`, '')] = rendered
  })

  return files
}

module.exports = { renderTemplate }
