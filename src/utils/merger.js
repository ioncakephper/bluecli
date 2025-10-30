const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

// Load a config file (YAML, JSON, or .declare.js)
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

// Merge two configs (base ← override)
function mergeConfigs(base, override) {
  const result = { ...base, ...override }

  // Merge commands by name
  if (base.commands || override.commands) {
    const mergedCommands = {}
    ;(base.commands || []).forEach(
      (cmd) => (mergedCommands[cmd.name] = { ...cmd })
    )
    ;(override.commands || []).forEach((cmd) => {
      mergedCommands[cmd.name] = {
        ...(mergedCommands[cmd.name] || {}),
        ...cmd,
        // merge options/args arrays by name
        options: mergeByName(mergedCommands[cmd.name]?.options, cmd.options),
        args: mergeByName(mergedCommands[cmd.name]?.args, cmd.args),
      }
    })
    result.commands = Object.values(mergedCommands)
  }

  // Merge plugins by name
  if (base.plugins || override.plugins) {
    const mergedPlugins = {}
    ;(base.plugins || []).forEach((pl) => (mergedPlugins[pl.name] = { ...pl }))
    ;(override.plugins || []).forEach((pl) => {
      mergedPlugins[pl.name] = { ...(mergedPlugins[pl.name] || {}), ...pl }
    })
    result.plugins = Object.values(mergedPlugins)
  }

  return result
}

// Helper: merge arrays of objects by "name"
function mergeByName(baseArr = [], overrideArr = []) {
  const merged = {}
  baseArr.forEach((item) => (merged[item.name] = { ...item }))
  overrideArr.forEach((item) => {
    merged[item.name] = { ...(merged[item.name] || {}), ...item }
  })
  return Object.values(merged)
}

// Resolve cascading configs
function resolveConfig(filePath, seen = new Set()) {
  if (seen.has(filePath)) {
    throw new Error(`Circular extends detected: ${filePath}`)
  }
  seen.add(filePath)

  const config = loadConfig(filePath)

  if (!config.extends) return config

  const bases = Array.isArray(config.extends)
    ? config.extends
    : [config.extends]
  let merged = {}
  for (const basePath of bases) {
    const resolvedPath = path.resolve(path.dirname(filePath), basePath)
    const baseConfig = resolveConfig(resolvedPath, seen)
    merged = mergeConfigs(merged, baseConfig)
  }

  return mergeConfigs(merged, config)
}

module.exports = { loadConfig, mergeConfigs, resolveConfig }
