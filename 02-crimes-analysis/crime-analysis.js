/* eslint-disable no-unused-vars */
'use strict'

const fs = require('fs')
const readline = require('readline')

const SELECTED_YEAR = '2016'
const SEPARATOR = ','

module.exports = function processFile(filePath) {
  const crimesPerYear = {}
  const crimesPerArea = {}
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
        area,
        majorCategory,
        minorCategory,
        value,
        year,
        month,
      ] = line.split(SEPARATOR)
      updateCrimesPerYear(year, value, crimesPerYear)
      updateCrimesPerArea(area, value, crimesPerArea)
      if (year === SELECTED_YEAR) {
        outputFileStream.write(`${line}\n`)
      }
    })
    linesStream.on('close', () => {
      const thirdLastLine = computeCrimesIncrementLine(crimesPerYear)
      const secondLastLine = computeMost3DangerousAreaLine(crimesPerArea)
      outputFileStream.write(`${thirdLastLine}\n`)
      outputFileStream.write(`${secondLastLine}\n`)
      outputFileStream.write('aaaaaaaaa', () => {
        resolve()
      })
    })
  })
}

function updateCrimesPerYear(year, value, crimesPerYear) {
  if (!crimesPerYear[year]) {
    crimesPerYear[year] = Number.parseInt(value)
  } else {
    crimesPerYear[year] += Number.parseInt(value)
  }
}

function updateCrimesPerArea(area, value, crimesPerArea) {
  if (!crimesPerArea[area]) {
    crimesPerArea[area] = Number.parseInt(value)
  } else {
    crimesPerArea[area] += Number.parseInt(value)
  }
}

function computeCrimesIncrementLine(crimesPerYear) {
  return Object.keys(crimesPerYear)
    .sort()
    .reduce((acc, year, index, array) => {
      if (index === 0) {
        return `${year}:${crimesPerYear[year]}`
      }
      const increment = crimesPerYear[year] - crimesPerYear[array[index - 1]]
      const incrementString = `${year}:${increment}`
      return `${acc},${incrementString}`
    }, '')
}

function computeMost3DangerousAreaLine(crimesPerArea) {
  return Object.keys(crimesPerArea)
    .sort((first, second) => crimesPerArea[second] - crimesPerArea[first])
    .slice(0, 3)
    .join(',')
}
