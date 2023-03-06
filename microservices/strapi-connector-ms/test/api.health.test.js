import test from 'tap'
import buildApp from '../app.js'

test('requests the "/api/health" route', async t => {
  const app = buildApp()

  const response = await app.inject({
    method: 'GET',
    url: '/api/health'
  })

  t.equal(response.statusCode, 200, 'returns a status code of 200')
  t.same(response.json(), { status: 'UP' }, 'returns a body with { status: \'UP\'}')
})