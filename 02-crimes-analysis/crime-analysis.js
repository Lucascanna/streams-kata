/* eslint-disable no-unused-vars */
'use strict'

const fs = require('fs')
const readline = require('readline')

module.exports = function processFile(filePath) {
  const outputFilePath = `${filePath}.analysis.csv`
  const inputFileStream = fs.createReadStream(filePath)
  const outputFileStream = fs.createWriteStream(outputFilePath)
  const linesStream = readline.createInterface({
    input: inputFileStream,
    output: outputFileStream,
  })
  linesStream.on('line', line => {
    const [
      lsoaCode,
      borough,
      majorCategory,
      minorCategory,
      value,
      year,
      month,
    ] = line.split(',')
    if (year === '2016' || year === 'year') {
      outputFileStream.write(`${line}\n`)
    }
  })
  return new Promise((resolve) => {
    inputFileStream.on('end', () => resolve())
  })
}
