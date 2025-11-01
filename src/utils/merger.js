/**
 * @file merger.js
 * @description This module provides functions for loading, merging, and resolving
 * configuration files in various formats (YAML, JSON, JavaScript).
 * It handles merging of nested structures like commands and plugins, and detects
 * circular dependencies in extended configurations.
 * @author Ion Gireada
 */

const fs = require('fs')
const path = require('path')

/**
 * Loads a configuration file (YAML, JSON, or .declare.js) and parses its content.
 *
 * @param {string} filePath - The path to the configuration file.
 * @returns {object} The parsed configuration object.
 */
function loadConfig(filePath) {
  const ext = path.extname(filePath)
  if (ext === '.yaml' || ext === '.yml') {
    // If the file is a YAML file, parse it using js-yaml
    // If the file is a JSON file, parse it as JSON
  } else if (ext === '.json') {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
    // If the file is a JavaScript file, require it
  } else if (ext === '.js' || ext === '.declare.js') {
    return require(path.resolve(filePath))
    // If the file extension is not supported, throw an error
  }
  throw new Error(`Unsupported config format: ${ext}`)
}

/**
 * Merges two configuration objects. Properties from the override object take precedence.
 *
 * This function performs a shallow merge for most properties.
 * However, it includes special handling for 'commands' and 'plugins' arrays,
 * merging them by their 'name' property to allow for overriding or extending
 * individual commands or plugins.
 *
 * @param {object} base - The base configuration object.
 * @param {object} override - The override configuration object.
 * @returns {object} The merged configuration object.
 */
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

/**
 * Helper function to merge arrays of objects based on their 'name' property.
 * Items in overrideArr will take precedence over items in baseArr if they have the same name.
 *
 * @param {Array<object>} baseArr - The base array of objects.
 * @param {Array<object>} overrideArr - The array of objects to override the base.
 */
function mergeByName(baseArr = [], overrideArr = []) {
  const merged = {}
  baseArr.forEach((item) => (merged[item.name] = { ...item }))
  overrideArr.forEach((item) => {
    merged[item.name] = { ...(merged[item.name] || {}), ...item }
  })
  return Object.values(merged)
}

/**
 * Resolves cascading configuration files, merging them in order of extension.
 * Detects and throws an error for circular dependencies.
 *
 * @param {string} filePath - The path to the initial configuration file.
 * @param {Set<string>} [seen=new Set()] - A set to keep track of already processed file paths to detect circular dependencies.
 * @returns {object} The fully resolved and merged configuration object.
 */
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
