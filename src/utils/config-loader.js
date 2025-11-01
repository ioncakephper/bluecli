const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

/** Loads a configuration file (YAML, JSON, or .declare.js) and parses its content.
 *
 * @param {string} filePath The path to the configuration file.
 * @returns {object} The parsed configuration object.
 * @throws {Error} If the file format is unsupported.
 */
function loadConfig(filePath) {
  const ext = path.extname(filePath)
  if (ext === '.yaml' || ext === '.yml') {
    // If the file is a YAML file, parse it using js-yaml
    return yaml.load(fs.readFileSync(filePath, 'utf8'))
  } else if (ext === '.json') {
    // If the file is a JSON file, parse it as JSON
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } else if (ext === '.js' || ext === '.declare.js') {
    // If the file is a JavaScript file, require it
    return require(path.resolve(filePath))
  }
  throw new Error(`Unsupported config format: ${ext}`)
}

module.exports = { loadConfig }
