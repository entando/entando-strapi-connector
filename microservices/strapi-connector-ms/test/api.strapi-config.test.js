import test from 'tap'
import buildApp from '../app.js'

test('requests the "/api/strapi-config" route', async t => {
  const app = buildApp()

  const response = await app.inject({
    method: 'GET',
    url: '/api/strapi-config'
  })

  t.equal(response.statusCode, 200, 'returns a status code of 200')
  t.same(response.json(), { url: 'https://my-strapi-instance.com/strapi' }, 'returns a body with { url: \'https://my-strapi-instance.com/strapi\' }')
})