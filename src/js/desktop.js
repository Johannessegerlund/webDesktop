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
    this.windowArr = []
  }

  connectedCallback () {
    this.shadowRoot.querySelectorAll('.imghover').forEach(element => {
      element.addEventListener('click', event => {
        const container = this.shadowRoot.querySelector('.container')
        const deskWindow = document.createElement('desk-window')
        container.appendChild(deskWindow)

        let appWindow = deskWindow.shadowRoot.querySelector('.appWindow')
        this.windowArr.push(appWindow)

        if (event.target.matches('#memo')) {
          const memory = document.createElement('memory-view')
          appWindow.appendChild(memory)
        } else if (event.target.matches('#calc')) {
          const calc = document.createElement('calculater-view')
          appWindow.appendChild(calc)
        } else if (event.target.matches('#chatt')) {
          const chatt = document.createElement('chatt-view')
          appWindow.appendChild(chatt)
        }

        deskWindow.shadowRoot.querySelector('#close').addEventListener('click', e => {
          appWindow.style.display = 'none'
        })
        this.focus(deskWindow)
      })
    })
  }

  focus (deskWindow) {
    deskWindow.shadowRoot.querySelector('.appWindow').addEventListener('click', e => {
      this.sortArr(e)
      this.focus1()
    })
  }

  sortArr (e) {
    this.windowArr.splice(e.target, 1)
    this.windowArr.push(e.target)
  }

  focus1 () {
    for (let i = this.windowArr.length - 1; i >= 0; i--) {
      this.windowArr[i].style.zIndex = i
      console.log(this.windowArr[i])
    }
  }
}

window.customElements.define('desk-view', Desk)
