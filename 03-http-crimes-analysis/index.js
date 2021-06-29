'use strict'

const server = require('./lib/http-crime-analysis')({
  logger: {
    level: 'info',
    prettyPrint: true,
  },
})

server.listen(3000, (error) => {
  if (error) {
    server.log(error)
    throw error
  }
})
