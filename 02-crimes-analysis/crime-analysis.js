'use strict'

const fs = require('fs')

module.exports = function processFile(filePath) {
  const outputFilePath = `${filePath}.analysis.csv`
  fs.writeFileSync(outputFilePath, '')
}
