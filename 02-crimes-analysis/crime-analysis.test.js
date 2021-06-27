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
  mainTest.test("output file should only contain 2016's rows", async test => {
    await processFile(FILE_PATH)
    const expectedOutputFilePath = `${FILE_PATH}.analysis.csv`
    const filteredRows = fs.readFileSync(expectedOutputFilePath)
      .toString()
      .split('\n')
      .slice(1, -3)
    const expectedRows = [
      'E01001116,Croydon,Burglary,Burglary in Other Buildings,0,2016,11',
      'E01001646,Greenwich,Violence Against the Person,Other violence,0,2016,11',
      'E01003496,Newham,Criminal Damage,Criminal Damage To Other Building,0,2016,9',
    ]
    test.strictSame(filteredRows, expectedRows)
    fs.unlinkSync(expectedOutputFilePath)
    test.end()
  })
  mainTest.test('third last line should contain increment or decrement of crimes wrt previous year', async test => {
    await processFile(FILE_PATH)
    const expectedOutputFilePath = `${FILE_PATH}.analysis.csv`
    const [thirdLastLine] = fs.readFileSync(expectedOutputFilePath)
      .toString()
      .split('\n')
      .slice(-3, -2)
    const expectedRow = '2012:1,2013:3,2014:-1,2015:-2,2016:-1'
    test.strictSame(thirdLastLine, expectedRow)
    fs.unlinkSync(expectedOutputFilePath)
    test.end()
  })
  mainTest.end()
})
