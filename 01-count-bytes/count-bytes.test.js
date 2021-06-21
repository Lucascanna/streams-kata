'use strict'

const tap = require('tap')
const countBytesStreams = require('./count-bytes-streams')
const countBytesInMemory = require('./count-bytes-in-memory')

tap.test('count bytes using streams', mainTest => {
  mainTest.test('count bytes of a one line file', async test => {
    const bytes = await countBytesStreams('./01-count-bytes/data/one-line.txt')
    test.strictSame(bytes, 26)
    test.end()
  })
  mainTest.test('count bytes of a five line file', async test => {
    const bytes = await countBytesStreams('./01-count-bytes/data/five-line.txt')
    test.strictSame(bytes, 134)
    test.end()
  })
  mainTest.end()
})

tap.test('count bytes in memory', mainTest => {
  mainTest.test('count bytes of a one line file', async test => {
    const bytes = await countBytesInMemory('./01-count-bytes/data/one-line.txt')
    test.strictSame(bytes, 26)
    test.end()
  })
  mainTest.test('count bytes of a five line file', async test => {
    const bytes = await countBytesInMemory('./01-count-bytes/data/five-line.txt')
    test.strictSame(bytes, 134)
    test.end()
  })
  mainTest.end()
})
