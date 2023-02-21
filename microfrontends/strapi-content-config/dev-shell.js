function createKcDispatcher(payload) {
  return () =>
    window.dispatchEvent(new CustomEvent("keycloak", { detail: payload }))
}

function initKeycloak() {
  // eslint-disable-next-line no-undef
  const keycloak = Keycloak({
    url: import.meta.env.STRAPI_CONNECTOR_KEYCLOAK_URL,
    realm: import.meta.env.STRAPI_CONNECTOR_KEYCLOAK_REALM,
    clientId: import.meta.env.STRAPI_CONNECTOR_KEYCLOAK_CLIENT_ID
  })

  keycloak.onReady = createKcDispatcher({ eventType: "onReady" })
  keycloak.onAuthSuccess = createKcDispatcher({ eventType: "onAuthSuccess" })
  keycloak.onAuthError = createKcDispatcher({ eventType: "onAuthError" })
  keycloak.onAuthRefreshSuccess = createKcDispatcher({
    eventType: "onAuthRefreshSuccess"
  })
  keycloak.onAuthRefreshError = createKcDispatcher({
    eventType: "onAuthRefreshError"
  })
  keycloak.onAuthLogout = createKcDispatcher({ eventType: "onAuthLogout" })
  keycloak.onTokenExpired = createKcDispatcher({ eventType: "onTokenExpired" })

  const onInit = createKcDispatcher({ eventType: "onInit" })

  window.entando = {
    ...(window.entando || {}),
    keycloak
  }

  window.entando.keycloak.init({ onLoad: "login-required" }).then(onInit)
}

const script = document.createElement("script")

script.src = `${import.meta.env.STRAPI_CONNECTOR_KEYCLOAK_URL}/js/keycloak.js`
script.onload = initKeycloak

document.head.appendChild(script)
