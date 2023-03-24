export interface EntandoGlobals {
  userPermissions: string[]
  lang: string
  systemReport: {
    contentSchedulerPluginInstalled: boolean
  }
  adminConsoleUrl: string
}

export interface MfeConfig {
  systemParams: {
    api: {
      "strapi-config-microservice": {
        url: string
      }
    }
  }
}

declare global {
  interface Window {
    entando: {
      router: {
        action: "POP" | "PUSH" | "REPLACE"
        location: {
          pathname: string
          search: string
          hash: string
          state: any
          key: string
        }
      }
      globals: EntandoGlobals
      keycloak: {
        token: string
      }
    }
  }
}
