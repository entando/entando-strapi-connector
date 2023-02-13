import { useState } from "react"
import { useEffect } from "react"
import { createContext, useContext } from "react"

type IKeycloak = {
  initialized: boolean
  token: string
}

const KeycloakContext = createContext<IKeycloak | null>(null)

function getKeycloakInstance(): IKeycloak {
  return (
    (window &&
      window.entando &&
      window.entando.keycloak && {
        ...window.entando.keycloak,
        initialized: true
      }) || { initialized: false }
  )
}

type KeycloakProviderProps = {
  children: React.ReactNode
}

export function KeycloakProvider({
  children
}: KeycloakProviderProps): JSX.Element {
  const [instance, saveInstance] = useState(getKeycloakInstance())

  useEffect(() => {
    const refresh = () =>
      saveInstance({ ...getKeycloakInstance(), initialized: true })

    window.addEventListener("keycloak", refresh)

    return () => window.removeEventListener("keycloak", refresh)
  }, [])

  return (
    <KeycloakContext.Provider value={instance}>
      {children}
    </KeycloakContext.Provider>
  )
}

export function useKeycloak() {
  return useContext(KeycloakContext)
}
