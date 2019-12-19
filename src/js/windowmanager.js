'use strict'
import temp1 from './window.js'

class Deskwindow extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(temp1.content.cloneNode(true))
  }

  connectedCallback () {

  }
}

window.customElements.define('desk-window', Deskwindow)
