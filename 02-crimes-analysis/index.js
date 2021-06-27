/* eslint-disable no-console */
'use strict'

const processFile = require('./lib/crime-analysis')

const [, , filePath] = process.argv
processFile(filePath)
  .then(console.log('FILE PROCESSED!'))
