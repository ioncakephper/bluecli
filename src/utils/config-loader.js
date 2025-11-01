const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

function loadConfig(filePath) {
  const ext = path.extname(filePath)
  if (ext === '.yaml' || ext === '.yml') {
    return yaml.load(fs.readFileSync(filePath, 'utf8'))
  } else if (ext === '.json') {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } else if (ext === '.js' || ext === '.declare.js') {
    return require(path.resolve(filePath))
  }
  throw new Error(`Unsupported config format: ${ext}`)
}

module.exports = { loadConfig }
