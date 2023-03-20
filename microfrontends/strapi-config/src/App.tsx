import ConfigForm from "./components/form/ConfigForm"
import { useEPCRouter } from "./hooks/useEntandoRouter"
import { IntlProvider } from "react-intl"
import messagesEn from "./i18n/en.json"
import messagesIt from "./i18n/it.json"
import { useState } from "react"

interface Message {
  [key: string]: {
    [key: string]: string
  }
}

const messages: Message = {
  en: messagesEn,
  it: messagesIt
}

export function App() {
  const { matchPath } = useEPCRouter()

  const [locale, setLocale] = useState<string>("")

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div data-theme="light">
        <ConfigForm />
        {matchPath("settings") && <div>Hello from settings</div>}
        {matchPath("content-template") && (
          <div>Hello from content template</div>
        )}
      </div>
    </IntlProvider>
  )
}
