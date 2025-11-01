const fs = require('fs')
const path = require('path')

module.exports = (program) => {
  program
    .command('list-templates')
    .description('List available CLI templates')
    .action(() => {
      const templatesDir = path.resolve(__dirname, '../../templates')
      const templates = fs.readdirSync(templatesDir)
      console.log('Available templates:')
      templates.forEach((t) => console.log(' -', t))
    })
}
