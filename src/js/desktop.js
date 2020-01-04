'use strict'
import { temp } from './desktopHTML.js'
import './Memory/Memory.js'
import './windowmanager.js'
import './calcylator/Calc.js'
export class Desk extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(temp.content.cloneNode(true))
  }

  connectedCallback () {
    this.shadowRoot.querySelectorAll('.imghover').forEach(element => {
      element.addEventListener('click', event => {
        const container = this.shadowRoot.querySelector('.container')
        const vad = document.createElement('desk-window')
        container.appendChild(vad)

        if (event.target.matches('#memo')) {
          this.div2 = vad.shadowRoot.querySelector('#div2')
          const memory = document.createElement('memory-view')
          this.div2.appendChild(memory)
        } else if (event.target.matches('#calc')) {
          this.div2 = vad.shadowRoot.querySelector('#div2')
          const memory = document.createElement('calculater-view')
          this.div2.appendChild(memory)
        }

        vad.shadowRoot.querySelector('#close').addEventListener('click', e => {
          this.div2.style.display = 'none'
        })
      })
    })
  }
}

window.customElements.define('desk-view', Desk)
