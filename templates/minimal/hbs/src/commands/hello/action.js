/**
 * @file action.js
 * @description Handles the 'hello' command action.
 * @author Ion Gireada
 */

/**
 * Handles the 'hello' command action.
 *
 * @param {string} providedName - The name provided as a direct argument to the command.
 * @param {object} options - The options passed to the command.
 * @param {string} [options.name] - The name to greet. Defaults to 'World'.
 * @param {boolean} [options.greet] - Whether to use a greeting message.
 * @param {boolean} [options.excited] - Whether to add excitement to the message.
 */
module.exports = (providedName, options = {}) => {
  console.log(options)
  const name = options.name || 'World'
  let message = `Hello, ${providedName || name}`

  console.log(message)
}
