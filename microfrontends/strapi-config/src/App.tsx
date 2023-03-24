import ConfigForm from "./components/form/ConfigForm"
import { useEPCRouter } from "./hooks/useEntandoRouter"
import { IntlProvider } from "react-intl"
import messagesEn from "./i18n/en.json"
import messagesIt from "./i18n/it.json"
import { useEffect, useState } from "react"

interface Message {
  [key: string]: {
    [key: string]: string
  }
}

const messages: Message = {
  en: messagesEn,
  it: messagesIt
}

export function App({ config }) {
  const { matchPath } = useEPCRouter()

  const [locale, setLocale] = useState<string>("en")

  const { params } = config || {}
  const { name } = params || {}

  useEffect(() => {
    if (window?.entando?.globals?.lang) {
      setLocale(window.entando.globals.lang)
    }
  }, [])

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div data-theme="light">
        test {name} test
        <ConfigForm />
        {matchPath("settings") && <div></div>}
        {matchPath("content-template") && (
          <div>Hello from content template</div>
        )}
      </div>
    </IntlProvider>
  )
}
