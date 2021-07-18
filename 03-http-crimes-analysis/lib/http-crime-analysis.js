'use strict'

const fastify = require('fastify')
const { processStream } = require('../../02-crimes-analysis/lib/crime-analysis')

function build(opts = {}) {
  const app = fastify(opts)
  app.addContentTypeParser('*', function contentTypeParser(request, payload, done) {
    done()
  })
  app.post('/', handler)
  return app
}

function handler(request, reply) {
  reply.raw.writeHead(200, { 'Content-Type': 'text/csv' })
  processStream(request.raw, reply.raw)
    .then(() => reply.raw.end())
}

module.exports = build
