'use strict'
import { win } from './desktopHTML.js'
class Deskwindow extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(win.content.cloneNode(true))
  }

  connectedCallback () {

  }
}

window.customElements.define('desk-window', Deskwindow)
