# Strapi Connector Microservice

## Configuration

A sample configuration is provided in the `.env.sample` file. When running with `NODE_ENV=development` the service will look up for a `.env.local` file. Environment variables will always have priority over .env files.

The configuration variables are managed by the package `@fastify/env` which is a wrapper around [env-schema](https://www.npmjs.com/package/env-schema).

### Variables

* The `KEYCLOAK_`, `SPRING_DATASOURCE` and `SERVER_SERVLET_CONTEXT_PATH` are managed by the Entando operator.
* `API_CONFIG_TABLE` is the table name used by the service. The service will try to create the table at startup.

#### Authentication

If the value of `AUTH_ENABLED` is set to `false` no authentication will be done

Otherwise the Keycloak configuration is used to authenticate all the calls to the `api/strapi/config` endpoint according to the value of the variable`JWT_PUB_KEY`:
* If set, the service will use the provided key to validate the JWT tokens. The variable should be a single line **without** header and footer, the value could be retrived from `protocol/openid-connect/certs`.
* If **not** set, the `protocol/openid-connect/userinfo` endpoint of the keycloak service will be used to validate the token.

## Routes

### `GET api/health`

Provide an health check on the service and DB

statusCode **200** response payload:
```
{ status: {
    server: "UP",
    db: "UP"
  },
  error: null
}
```

statusCode **503** response payload:
```
{ status: {
    server: "UP",
    db: "DOWN"
  },
  error: object
}
```

### `GET api/strapi/config`

Retrive the current Strapi API configuration

statusCode **200** response payload:
```
{
  configUrl: string
  token: true if one is already set, false if it is not
}
```

statusCode **404** response payload:
```
{
  configUrl: null
  token: false
}
```

### `POST api/strapi/config`

Set a new Strapi API configuration

Request payload:
```
{
  configUrl: string // mandatory, must be a valid URL (https://url.spec.whatwg.org/#example-url-parsing)
  token: string // mandatory, a single string with no space or other blank characters
}
```

statusCode **201** response payload:
```
{
  status: 201
  errors: null
  configUrl: string
  token: string
}
```

statusCode **400** response payload:
```
{
  status: 400
  errors: errors: [
    {
      field: string // possible values: configUrl or token
      errorCode: string // check below
    },
    ...
  ]
  configUrl: string // null if not provided/empty/undefined
  token: string // null if not provided/empty/undefined
}
```
**errorCodes**:
* code: mandatory
  * reasoning: the field was not filled or is missing
* code: invalidConfigUrl
  * reasoning: the rest API call performed against the given configURL does not yield the expected result
* code: invalidToken
  * reasoning: the rest API call performed against the verification endpoints returns an authentication error
* code: invalidTokenPermissions
  * reasoning: the given token, although being valid, does not have the permission to retrieve contents and collection types

### `DELETE api/strapi/config`

Reset the current Strapi API configuration, if any:
* statusCode **204**, empty payload
* statusCode **404**, empty payload

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