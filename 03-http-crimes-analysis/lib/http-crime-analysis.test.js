/* eslint-disable no-sync */
'use strict'

const tap = require('tap')
const fs = require('fs')

const build = require('./http-crime-analysis')
const app = build()

const inputData = fs.readFileSync('./03-http-crimes-analysis/data/london_crime_short.csv')
const outputData = fs.readFileSync('./03-http-crimes-analysis/data/london_crime_short.analysis.csv').toString()


tap.test('process london crimes via http', mainTest => {
  mainTest.test('server sholud respond with analysis csv', async test => {
    const response = await app.inject({
      method: 'POST',
      url: '/',
      payload: inputData,
    })
    tap.strictSame(response.statusCode, 200)
    tap.strictSame(response.body, outputData)
    test.end()
  })
  mainTest.end()
})
