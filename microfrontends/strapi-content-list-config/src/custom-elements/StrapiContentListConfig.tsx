import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from '../App';
import styles from '../index.css?inline'

export class StrapiContentListConfig extends HTMLElement {
  #rootID = 'app-element'
  #appInstance: ReactDOM.Root | null = null

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['config'];
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(_: any, oldValue: any, newValue: any) {
    if (newValue !== oldValue) {
      this.render();
    }
  }

  cleanTree() {
    const currentElement = this.shadowRoot?.getElementById(this.#rootID);

    if (currentElement) {
      this.shadowRoot?.removeChild(currentElement);
    }

    this.#appInstance?.unmount();
  }

  render() {
    const attrConf = this.getAttribute('config');
    const config = attrConf && JSON.parse(attrConf);

    if (config) {
      const shadowRootElement = document.createElement('div');
      const styleElement = document.createElement('style');

      shadowRootElement.id = this.#rootID;

      this.cleanTree();

      styleElement.innerHTML = styles;

      this.shadowRoot?.appendChild(styleElement);

      this.#appInstance = ReactDOM.createRoot(shadowRootElement);

      this.#appInstance.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );

      this.shadowRoot?.appendChild(shadowRootElement);
    }
  }
}
