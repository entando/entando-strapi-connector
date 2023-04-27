import React from "react"
import ReactDOM, { createRoot } from "react-dom/client"
import { App } from "../App"
import { KeycloakProvider } from "../context/Keycloak"
import styles from "../index.css?inline"

const ATTRIBUTES = {
  config: "config"
}

export class StrapiConfig extends HTMLElement {
  #rootID = "app-element"
  #appInstance: ReactDOM.Root | null = null
  mountPoint: HTMLDivElement | null = null
  root: ReactDOM.Root | null = null

  constructor() {
    super()

    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return Object.values(ATTRIBUTES)
  }

  connectedCallback() {
    this.mountPoint = document.createElement("div")
    this.appendChild(this.mountPoint)

    this.root = createRoot(this.mountPoint)
    this.render()
  }

  attributeChangedCallback(
    attribute: any,
    _: any,
    oldValue: any,
    newValue: any
  ) {
    if (!StrapiConfig.observedAttributes.includes(attribute)) {
      throw new Error(`Untracked changed attributes: ${attribute}`)
    }
    if (this.mountPoint && newValue !== oldValue) {
      this.render()
    }
  }

  cleanTree() {
    const currentElement = this.shadowRoot?.getElementById(this.#rootID)

    if (currentElement) {
      this.shadowRoot?.removeChild(currentElement)
    }

    this.#appInstance?.unmount()
  }

  render() {
    const shadowRootElement = document.createElement("div")
    const styleElement = document.createElement("style")

    const attributeConfig = this.getAttribute(ATTRIBUTES.config)
    const config = attributeConfig && JSON.parse(attributeConfig)

    shadowRootElement.id = this.#rootID

    this.cleanTree()

    styleElement.innerHTML = styles

    this.shadowRoot?.appendChild(styleElement)

    this.#appInstance = ReactDOM.createRoot(shadowRootElement)

    this.#appInstance.render(
      <React.StrictMode>
        <KeycloakProvider>
          <App config={config} />
        </KeycloakProvider>
      </React.StrictMode>
    )

    this.shadowRoot?.appendChild(shadowRootElement)
  }
}
