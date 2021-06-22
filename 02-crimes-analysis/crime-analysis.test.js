/* eslint-disable no-sync */
'use strict'

const tap = require('tap')
const fs = require('fs')
const processFile = require('./crime-analysis')

const FILE_PATH = './02-crimes-analysis/data/london-crime.csv'

tap.test('process london crimes', mainTest => {
  mainTest.test('should write a file <input_file>.analysis.csv in the file system', async test => {
    await processFile(FILE_PATH)
    const expectedOutputFilePath = `${FILE_PATH}.analysis.csv`
    test.ok(fs.existsSync(expectedOutputFilePath))
    fs.unlinkSync(expectedOutputFilePath)
    test.end()
  })
  mainTest.end()
})