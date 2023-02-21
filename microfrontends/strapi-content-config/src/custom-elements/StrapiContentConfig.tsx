import React from "react"
import ReactDOM from "react-dom/client"

import { App } from "../App"
import { KeycloakProvider } from "../context/Keycloak"
import styles from "../index.css?inline"

export class StrapiContentConfig extends HTMLElement {
  #rootID = "app-element"
  #appInstance: ReactDOM.Root | null = null

  constructor() {
    super()

    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return ["config"]
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(_: any, oldValue: any, newValue: any) {
    if (newValue !== oldValue) {
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

    shadowRootElement.id = this.#rootID

    this.cleanTree()

    styleElement.innerHTML = styles

    this.shadowRoot?.appendChild(styleElement)

    this.#appInstance = ReactDOM.createRoot(shadowRootElement)

    this.#appInstance.render(
      <React.StrictMode>
        <KeycloakProvider>
          <App />
        </KeycloakProvider>
      </React.StrictMode>
    )

    this.shadowRoot?.appendChild(shadowRootElement)
  }
}
