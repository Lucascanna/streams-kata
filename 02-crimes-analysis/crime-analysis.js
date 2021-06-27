/* eslint-disable no-unused-vars */
'use strict'

const fs = require('fs')
const readline = require('readline')

const SELECTED_YEAR = '2016'
const SEPARATOR = ','

module.exports = function processFile(filePath) {
  const crimesPerYear = {}
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
      if (!crimesPerYear[year]) {
        crimesPerYear[year] = Number.parseInt(value)
      } else {
        crimesPerYear[year] += Number.parseInt(value)
      }
      if (year === SELECTED_YEAR) {
        outputFileStream.write(`${line}\n`)
      }
    })
    linesStream.on('close', () => {
      const thirdLastLine = Object.keys(crimesPerYear)
        .sort()
        .reduce((acc, year, index, array) => {
          if (index === 0) {
            return `${year}:${crimesPerYear[year]}`
          }
          const increment = crimesPerYear[year] - crimesPerYear[array[index - 1]]
          const incrementString = `${year}:${increment}`
          return `${acc},${incrementString}`
        }, '')
      outputFileStream.write(`${thirdLastLine}\n`, () => {
        outputFileStream.write('aaaaaaaaa\n', () => {
          outputFileStream.write('aaaaaaaaa', () => {
            resolve()
          })
        })
      })
    })
  })
}
