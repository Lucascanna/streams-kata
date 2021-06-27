/* eslint-disable no-console */
'use strict'

const processFile = require('./lib/count-bytes-streams')

const [, , filePath] = process.argv
processFile(filePath)
  .then((value) => console.log(`FILE PROCESSED! Found ${value} bytes!`))
