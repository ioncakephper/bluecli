const fs = require('fs')
const path = require('path')

function writeFiles(projectName, files) {
  const outDir = path.resolve(process.cwd(), projectName)
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir)

  for (const [filename, content] of Object.entries(files)) {
    const filePath = path.join(outDir, filename)
    fs.writeFileSync(filePath, content, 'utf8')
  }
}

module.exports = { writeFiles }
