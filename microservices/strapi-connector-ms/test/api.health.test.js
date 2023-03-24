import { test, expect, afterEach } from 'vitest'
import buildApp from '../app.js'

let app

afterEach(async () => {
  await app.close()
})

test('/api/health should be successful with a working DB connection', async () => {
  process.env.SPRING_DATASOURCE_PASSWORD = 'entando_strapi_connector_password'
  process.env.SPRING_DATASOURCE_USERNAME = 'entando_strapi_connector_user'
  process.env.SPRING_DATASOURCE_URL = 'jdbc:postgresql://localhost:5432/entando_strapi_connector'
  app = buildApp()
  await app.ready()
  const response = await app.inject({
    method: 'GET',
    url: '/api/health'
  })
  console.log(response.json())

  expect(response.statusCode).toEqual(200)
  expect(response.json()).toEqual({ status: { server: "UP", db: "UP" }, error: null })
})

test('/api/health should fail with a bad DB connection', async () => {
  process.env.SPRING_DATASOURCE_URL = 'jdbc:postgresql://localhost:5432/this_should_not_work'

  app = buildApp()
  await app.ready()
  const response = await app.inject({
    method: 'GET',
    url: '/api/health'
  })

  expect(response.statusCode).toEqual(503)
  expect(response.json().status).toEqual({ server: "UP", db: "DOWN" })
})
