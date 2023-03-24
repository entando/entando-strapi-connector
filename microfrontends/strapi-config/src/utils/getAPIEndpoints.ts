import { MfeConfig } from "../types/globals"

export type APIEndpointFields = "strapi-config-microservice"

export function getAPIEndpoint(
  fieldName: APIEndpointFields,
  config: MfeConfig
) {
  const { url } = config?.systemParams?.api[fieldName] ?? {}

  return url.endsWith("/") ? url.substring(0, url.length - 1) : url
}
