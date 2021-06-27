'use strict'

const fs = require('fs/promises')

module.exports = async(filePath) => {
  const fileContent = await fs.readFile(filePath)
  return fileContent.length
}
