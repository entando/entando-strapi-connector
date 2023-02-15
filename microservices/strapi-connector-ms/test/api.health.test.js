'use strict'

const { test } = require('tap')
const build = require('../app')

test('requests the "/api/health" route', async t => {
  const app = build()

  const response = await app.inject({
    method: 'GET',
    url: '/api/health'
  })

  t.equal(response.statusCode, 200, 'returns a status code of 200')
  t.same(response.json(), { status: 'UP' }, 'returns a body with { status: \'UP\'}')
})