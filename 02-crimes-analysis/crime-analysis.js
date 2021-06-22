'use strict'

const fs = require('fs')

module.exports = function processFile(filePath) {
  const outputFilePath = `${filePath}.analysis.csv`
  const inputFileStream = fs.createReadStream(filePath)
  const outputFileStream = fs.createWriteStream(outputFilePath)
  inputFileStream.on('data', chunk => {
    outputFileStream.write(chunk)
  })
  return new Promise((resolve) => {
    inputFileStream.on('end', () => resolve())
  })
}
