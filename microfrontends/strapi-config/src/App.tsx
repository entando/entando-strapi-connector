import ConfigForm from "./components/form/ConfigForm"
import { useEPCRouter } from "./hooks/useEntandoRouter"

export function App() {
  const { matchPath } = useEPCRouter()

  return (
    <div data-theme="light">
      <ConfigForm />
      {matchPath("settings") && <div>Hello from settings</div>}
      {matchPath("content-template") && <div>Hello from content template</div>}
    </div>
  )
}
