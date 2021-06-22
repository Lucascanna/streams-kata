/* eslint-disable no-sync */
'use strict'

const tap = require('tap')
const fs = require('fs')
const processFile = require('./crime-analysis')

const FILE_PATH = './02-crimes-analysis/data/london_crime_short.csv'

tap.test('process london crimes', mainTest => {
  mainTest.test('should write a file <input_file>.analysis.csv in the file system', async test => {
    await processFile(FILE_PATH)
    const expectedOutputFilePath = `${FILE_PATH}.analysis.csv`
    test.ok(fs.existsSync(expectedOutputFilePath))
    fs.unlinkSync(expectedOutputFilePath)
    test.end()
  })
  mainTest.test('output file should contain the header as first row', async test => {
    await processFile(FILE_PATH)
    const expectedOutputFilePath = `${FILE_PATH}.analysis.csv`
    const [firstRow] = fs.readFileSync(expectedOutputFilePath)
      .toString()
      .split('\n')
    const expectedHeader = 'lsoa_code,borough,major_category,minor_category,value,year,month'
    test.strictSame(firstRow, expectedHeader)
    fs.unlinkSync(expectedOutputFilePath)
    test.end()
  })
  mainTest.end()
})
