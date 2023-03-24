import ConfigForm from "./components/form/ConfigForm"
import { useEPCRouter } from "./hooks/useEntandoRouter"
import { IntlProvider } from "react-intl"
import messagesEn from "./i18n/en.json"
import messagesIt from "./i18n/it.json"
import { useEffect, useState } from "react"
import { MfeConfig } from "./types/globals"
import { getAPIEndpoint } from "./utils/getAPIEndpoints"

interface Message {
  [key: string]: {
    [key: string]: string
  }
}

const messages: Message = {
  en: messagesEn,
  it: messagesIt
}

export function App({ config }: { config: MfeConfig }) {
  const { matchPath } = useEPCRouter()

  const apiUrl = getAPIEndpoint("strapi-config-microservice", config)
  console.log("config", config)
  console.log("APIUrl", apiUrl)

  const [locale, setLocale] = useState<string>("en")

  useEffect(() => {
    if (window?.entando?.globals?.lang) {
      setLocale(window.entando.globals.lang)
    }
  }, [])

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div data-theme="light">
        <ConfigForm apiUrl={apiUrl} />
        {matchPath("settings") && <div></div>}
        {matchPath("content-template") && (
          <div>Hello from content template</div>
        )}
      </div>
    </IntlProvider>
  )
}
