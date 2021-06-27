/* eslint-disable no-unused-vars */
'use strict'

const fs = require('fs')
const readline = require('readline')

const SELECTED_YEAR = '2016'
const SEPARATOR = ','

module.exports = function processFile(filePath) {
  return new Promise((resolve) => {
    const outputFilePath = `${filePath}.analysis.csv`
    const inputFileStream = fs.createReadStream(filePath)
    const outputFileStream = fs.createWriteStream(outputFilePath)
    const linesStream = readline.createInterface({
      input: inputFileStream,
    })
    let isHeaderWritten = false
    linesStream.on('line', line => {
      if (!isHeaderWritten) {
        outputFileStream.write(`${line}\n`)
        isHeaderWritten = true
        return
      }
      const [
        lsoaCode,
        borough,
        majorCategory,
        minorCategory,
        value,
        year,
        month,
      ] = line.split(SEPARATOR)
      if (year === SELECTED_YEAR) {
        outputFileStream.write(`${line}\n`)
      }
    })
    linesStream.on('close', () => {
      outputFileStream.write('aaaaaaaaa\n', () => {
        outputFileStream.write('aaaaaaaaa\n', () => {
          outputFileStream.write('aaaaaaaaa\n', () => {
            resolve()
          })
        })
      })
    })
  })
}
