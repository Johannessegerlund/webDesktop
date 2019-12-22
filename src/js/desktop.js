'use strict'
import { temp } from './desktopHTML.js'
import './Memory/Memory.js'
import './windowmanager.js'
export class Desk extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(temp.content.cloneNode(true))
  }

  connectedCallback () {
    this.shadowRoot.querySelector('#memo').addEventListener('click', event => {
      // const memory = document.createElement('memory-view')
      const container = this.shadowRoot.querySelector('.container')
      // const window = document.createElement('desk-window')
      // window.appendChild(memory)
      // container.appendChild(memory)
      const vad = document.createElement('desk-window')
      container.appendChild(vad)

      this.div2 = vad.shadowRoot.querySelector('#div2')
      const memory = document.createElement('memory-view')
      this.div2.appendChild(memory)

      this.mouse()
      vad.shadowRoot.querySelector('#close').addEventListener('click', e => {
        this.div2.style.display = 'none'
      })
    })
  }
  mouse () {
    window.addEventListener('mousedown', event => {
      event.preventDefault()
      let prevX = event.clientX
      let prevY = event.clientY
      window.addEventListener('mousemove', event => {
        event.preventDefault()
        const newX = prevX - event.clientX
        const newY = prevY - event.clientY
        prevX = event.clientX
        prevY = event.clientY
        const rect = this.div2.getBoundingClientRect()
        this.div2.style.left = rect.left - newX + 'px'
        this.div2.style.top = rect.top - newY + 'px'
      })
      window.addEventListener('mouseup', event => {
        document.onmousedown = null
        document.onmousemove = null
      })
    })
  }
}

window.customElements.define('desk-view', Desk)
