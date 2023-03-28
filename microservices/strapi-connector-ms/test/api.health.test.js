import { test, expect, afterEach } from 'vitest'
import buildApp from '../app.js'
import { appConstants } from '../config/appConstants.js'

let app

afterEach(async () => {
  await app.close()
})

test('/api/health should be successful with a working DB connection', async () => {
  app = buildApp()
  await app.ready()
  const response = await app.inject({
    method: 'GET',
    url: '/api/health'
  })

  expect(response.statusCode).toEqual(appConstants.HTTP_CODE_OK)
  expect(response.json()).toEqual({ status: { server: "UP", db: "UP" }, error: null })
})

test('/api/health should fail with a bad DB connection', async () => {
  // Overwrite .env.test SPRING_DATASOURCE_URL
  process.env.SPRING_DATASOURCE_URL = 'jdbc:postgresql://localhost:5432/this_should_not_work'

  app = buildApp()
  await app.ready()
  const response = await app.inject({
    method: 'GET',
    url: '/api/health'
  })

  expect(response.statusCode).toEqual(appConstants.HTTP_CODE_SERVICE_UNAVAILABLE)
  expect(response.json().status).toEqual({ server: "UP", db: "DOWN" })
})
