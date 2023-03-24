# Strapi Connector Microservice

## Configuration

A sample configuration is provided in the `.env.sample` file. When running with `NODE_ENV=development` the service will look up for a `.env.local` file. Environment variables will always have priority over .env files.

The configuration variables are managed by the package `@fastify/env` which is a wrapper around [env-schema](https://www.npmjs.com/package/env-schema).

### Variables

* The `KEYCLOAK_`, `SPRING_DATASOURCE` and `SERVER_SERVLET_CONTEXT_PATH` are managed by the Entando operator.
* `API_CONFIG_TABLE` is the table name used by the service. The service will try to create the table if at startup.
* Additionally `JWT_PUB_KEY` could be set. If set the service will use the provided key to validate the JWT tokens instead of the `protocol/openid-connect/userinfo` endpoint of the keycloak service.\
  The variable should be set as a single line **without** the header and footer, the value could be retrived from  `protocol/openid-connect/certs`.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

A running PostgreSQL instance is needed to run the tests, set the connections parameters in the `test/.env.test` file. The instance started by `ent bundle svc start postgresql` will work for testing purpose.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).