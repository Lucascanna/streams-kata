/* eslint-disable no-process-exit */
/* eslint-disable no-console */
'use strict'

const profile = setInterval(() => {
  console.error(`${(process.memoryUsage().arrayBuffers / 1024 / 1024).toFixed(4).padStart(10)} Mb`)
}, 100)

const [, , filePath, type] = process.argv
const processFile = type === 'memory' ? require('./lib/count-bytes-in-memory') : require('./lib/count-bytes-streams')
processFile(filePath)
  .then((value) => console.log(`FILE PROCESSED! Found ${value} bytes!`))
  .catch(error => {
    console.log(error)
    process.exit(1)
  })
  .finally(() => clearInterval(profile))
