'use strict'

const fastify = require('fastify')
const { processStream } = require('../../02-crimes-analysis/lib/crime-analysis')

function build(opts = {}) {
  const app = fastify(opts)
  app.get('/', handler)
  return app
}

async function handler(request, reply) {
  reply.raw.writeHead(200, { 'Content-Type': 'text/csv' })
  await processStream(request.raw, reply.raw)
  reply.raw.end()
}

module.exports = build
