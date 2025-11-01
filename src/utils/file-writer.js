/**
 * @file file-writer.js
 * @description This module provides utility functions for writing files to the filesystem.
 * @author Ion Gireada
 */

const fs = require('fs')
const path = require('path')

/**
 * Writes a collection of files to a specified project directory.
 * @param {string} projectName - The name of the project directory where files will be written.
 * @param {object<string, string>} files - An object where keys are filenames and values are their content.
 */
function writeFiles(projectName, files) {
  const outDir = path.resolve(process.cwd(), projectName)
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir)

  for (const [filename, content] of Object.entries(files)) {
    const filePath = path.join(outDir, filename)
    fs.writeFileSync(filePath, content, 'utf8')
  }
}

module.exports = { writeFiles }
