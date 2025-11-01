const { loadConfig } = require('../utils/config-loader')
const Ajv = require('ajv')
const schema = require('../schema/cli-schema.json')

module.exports = (program) => {
  program
    .command('validate <config>')
    /**
     * Validates a CLI config file against a schema.
     *
     * @param {string} configPath - The path to the configuration file.
     */
    .description('Validate a CLI config file against schema')
    .action((configPath) => {
      const config = loadConfig(configPath)
      const ajv = new Ajv({ allErrors: true })
      const validate = ajv.compile(schema)

      if (validate(config)) {
        console.log('✅ Config is valid!')
      } else {
        console.error('❌ Config validation failed:')
        console.error(validate.errors)
        process.exit(1)
      }
    })
}
