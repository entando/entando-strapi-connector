import UrlForm from "./components/form/UrlForm"
import { useEPCRouter } from "./hooks/useEntandoRouter"

export function App() {
  const { matchPath } = useEPCRouter()

  return (
    <div data-theme="light">
      <UrlForm />
      {matchPath("settings") && <div>Hello from settings</div>}
      {matchPath("content-template") && <div>Hello from content template</div>}
    </div>
  )
}
