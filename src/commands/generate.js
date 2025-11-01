// const path = require('path')
const { loadConfig } = require('../utils/config-loader')
const { mergeConfigs } = require('../utils/merger')
const { renderTemplate } = require('../utils/template-engine')
const { writeFiles } = require('../utils/file-writer')

module.exports = (program) => {
  program
    .command('generate')
    .description('generate a new CLI project from config')
    .argument('[config]', 'path to config file (YAML, JSON, or .declare.js)')
    .option(
      '-t, --template <name>',
      'template to use (minimal, standard, monorepo)'
    )
    .option('-e, --engine <engine>', 'template engine (ejs, hbs)')
    .action((configPath, options) => {
      const config = loadConfig(configPath || 'cli.yaml')
      const merged = mergeConfigs({}, config)

      const template = options.template || merged.template || 'minimal'
      const engine = options.engine || merged.engine || 'ejs'

      console.log(
        `Generating CLI '${merged.name}' using ${template} (${engine})...`
      )

      const files = renderTemplate(template, engine, merged)
      writeFiles(merged.name, files)

      console.log('✅ CLI generated successfully!')
    })
}
