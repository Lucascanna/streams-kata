'use strict'

const fs = require('fs')
const readline = require('readline')

const SELECTED_YEAR = '2016'
const SEPARATOR = ','

module.exports = {
  processFile,
  processStream,
}

async function processFile(filePath) {
  const filePathWithoutExtension = filePath
    .split('.')
    .slice(0, -1)
    .join('.')
  const outputFilePath = `${filePathWithoutExtension}.analysis.csv`
  const inputFileStream = fs.createReadStream(filePath)
  const outputFileStream = fs.createWriteStream(outputFilePath)
  await processStream(inputFileStream, outputFileStream)
}

function processStream(inputStream, outputStream) {
  const crimesPerYear = {}
  const crimesPerArea = {}
  const crimesPerAreaPerMajorCategory = {}
  return new Promise((resolve) => {
    const linesStream = readline.createInterface({
      input: inputStream,
    })
    let isHeaderWritten = false
    linesStream.on('line', line => {
      if (!isHeaderWritten) {
        outputStream.write(`${line}\n`)
        isHeaderWritten = true
        return
      }
      const [
        ,
        area,
        majorCategory,
        ,
        value,
        year,
      ] = line.split(SEPARATOR)
      updateCrimesStatistic(year, value, crimesPerYear)
      updateCrimesStatistic(area, value, crimesPerArea)
      updateCrimesStatisticNested(area, majorCategory, value, crimesPerAreaPerMajorCategory)
      if (year === SELECTED_YEAR) {
        outputStream.write(`${line}\n`)
      }
    })
    linesStream.on('close', () => {
      const thirdLastLine = computeCrimesIncrementLine(crimesPerYear)
      const secondLastLine = computeMost3DangerousAreaLine(crimesPerArea)
      const lastLine = computeCommonCategoriesLine(crimesPerAreaPerMajorCategory)
      outputStream.write(`${thirdLastLine}\n`)
      outputStream.write(`${secondLastLine}\n`)
      outputStream.write(lastLine, () => {
        resolve()
      })
    })
  })
}

function updateCrimesStatistic(key, value, crimesStatistic) {
  if (!crimesStatistic[key]) {
    crimesStatistic[key] = Number.parseInt(value)
  } else {
    crimesStatistic[key] += Number.parseInt(value)
  }
}

function updateCrimesStatisticNested(key1, key2, value, crimesStatistic) {
  if (!crimesStatistic[key1]) {
    crimesStatistic[key1] = {
      [key2]: Number.parseInt(value),
    }
  } else if (!crimesStatistic[key1][key2]) {
    crimesStatistic[key1][key2] = Number.parseInt(value)
  } else {
    crimesStatistic[key1][key2] += Number.parseInt(value)
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

function computeCommonCategoriesLine(crimesPerAreaPerMajorCategory) {
  return Object.keys(crimesPerAreaPerMajorCategory)
    .reduce((finalStr, area, index) => {
      const mostCommonCatogory = Object.keys(crimesPerAreaPerMajorCategory[area])
        .reduce((mostCommonCategory, currentCategory) => {
          if (!mostCommonCategory) {
            return currentCategory
          }
          const currentMax = crimesPerAreaPerMajorCategory[area][mostCommonCategory]
          if (crimesPerAreaPerMajorCategory[area][currentCategory] > currentMax) {
            return currentCategory
          }
          return mostCommonCategory
        }, '')
      if (index === 0) {
        return `${area}:${mostCommonCatogory}`
      }
      return `${finalStr},${area}:${mostCommonCatogory}`
    }, '')
}
