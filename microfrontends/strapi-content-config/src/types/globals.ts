export interface EntandoGlobals {
  userPermissions: string[];
  lang: string;
  systemReport: {
    contentSchedulerPluginInstalled: boolean;
  };
  adminConsoleUrl: string;
}

export interface MfeConfig {
  systemParams: {
    api: {
      navigation: {
        url: string;
      };
    };
  };
}

declare global {
  interface Window {
    entando: {
      globals: EntandoGlobals;
      keycloak: {
        token: string;
      };
    };
  }
}
