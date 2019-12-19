'use strict'
import temp from './desktopHTML.js'
import './Memory/Memory.js'
class Desk extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(temp.content.cloneNode(true))
  }

  connectedCallback () {
    this.shadowRoot.querySelector('#memo').addEventListener('click', e => {
      const container = this.shadowRoot.querySelector('.container')
      const memory = document.createElement('memory-view')
      const window = document.createElement('desk-window')
      window.appendChild(memory)
      container.appendChild(window)
    })
  }
}

window.customElements.define('desk-view', Desk)
