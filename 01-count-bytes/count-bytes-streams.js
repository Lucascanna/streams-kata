'use strict'

const fs = require('fs')

module.exports = (filePath) => {
  const fileStream = fs.createReadStream(filePath)
  let byteCount = 0
  fileStream.on('data', chunk => { byteCount += chunk.length })
  return new Promise((resolve) => {
    fileStream.on('end', () => resolve(byteCount))
  })
}
