/* eslint-disable no-sync */
'use strict'

const tap = require('tap')
const fs = require('fs')
const processFile = require('./crime-analysis')

const FILE_PATH = './02-crimes-analysis/data/london_crime_short.csv'
const OUTPUT_FILE_PATH = './02-crimes-analysis/data/london_crime_short.analysis.csv'

tap.test('process london crimes', mainTest => {
  mainTest.test('should write a file <input_file>.analysis.csv in the file system', async test => {
    await processFile(FILE_PATH)
    test.ok(fs.existsSync(OUTPUT_FILE_PATH))
    fs.unlinkSync(OUTPUT_FILE_PATH)
    test.end()
  })
  mainTest.test('output file should contain the header as first row', async test => {
    await processFile(FILE_PATH)
    const [firstRow] = fs.readFileSync(OUTPUT_FILE_PATH)
      .toString()
      .split('\n')
    const expectedHeader = 'lsoa_code,borough,major_category,minor_category,value,year,month'
    test.strictSame(firstRow, expectedHeader)
    fs.unlinkSync(OUTPUT_FILE_PATH)
    test.end()
  })
  mainTest.test("output file should only contain 2016's rows", async test => {
    await processFile(FILE_PATH)
    const filteredRows = fs.readFileSync(OUTPUT_FILE_PATH)
      .toString()
      .split('\n')
      .slice(1, -3)
    const expectedRows = [
      'E01001116,Croydon,Burglary,Burglary in Other Buildings,0,2016,11',
      'E01001646,Greenwich,Violence Against the Person,Other violence,0,2016,11',
      'E01003496,Newham,Criminal Damage,Criminal Damage To Other Building,0,2016,9',
    ]
    test.strictSame(filteredRows, expectedRows)
    fs.unlinkSync(OUTPUT_FILE_PATH)
    test.end()
  })
  mainTest.test('third last line should contain increment or decrement of crimes wrt previous year', async test => {
    await processFile(FILE_PATH)
    const [thirdLastLine] = fs.readFileSync(OUTPUT_FILE_PATH)
      .toString()
      .split('\n')
      .slice(-3, -2)
    const expectedRow = '2012:1,2013:3,2014:-1,2015:-2,2016:-1'
    test.strictSame(thirdLastLine, expectedRow)
    fs.unlinkSync(OUTPUT_FILE_PATH)
    test.end()
  })
  mainTest.test('second last line should contain the most 3 dangerous areas', async test => {
    await processFile(FILE_PATH)
    const [secondLastLine] = fs.readFileSync(OUTPUT_FILE_PATH)
      .toString()
      .split('\n')
      .slice(-2, -1)
    const expectedRow = 'Hounslow,Wandsworth,Bromley'
    test.strictSame(secondLastLine, expectedRow)
    fs.unlinkSync(OUTPUT_FILE_PATH)
    test.end()
  })
  mainTest.test('last line should contain the most common category for each area', async test => {
    await processFile(FILE_PATH)
    const [lastLine] = fs.readFileSync(OUTPUT_FILE_PATH)
      .toString()
      .split('\n')
      .slice(-1)
    const expectedRow = 'Croydon:Burglary,Greenwich:Violence Against the Person,Bromley:Violence Against the Person,Redbridge:Burglary,Wandsworth:Robbery,Ealing:Theft and Handling,Hounslow:Robbery,Newham:Criminal Damage'
    test.strictSame(lastLine, expectedRow)
    fs.unlinkSync(OUTPUT_FILE_PATH)
    test.end()
  })
  mainTest.end()
})
