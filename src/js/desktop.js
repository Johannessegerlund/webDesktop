'use strict'
import { temp } from './desktopHTML.js'
import './Memory/Memory.js'
import './windowmanager.js'
import './calcylator/Calc.js'

/**
 * @class Desk
 * @extends {window.HTML}
 */
export class Desk extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(temp.content.cloneNode(true))
    this.windowArr = []
    this.zIndex = 0
  }
  /**
 * Listens to three symbols and depending on
 * witch you press it contains diffrent content
 * It also listens to close
 * pushes the windows that's clicked to an array
 */
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
  /**
 * Listens to the windows you opens
 * @param {} deskWindow
 */
  focus (deskWindow) {
    deskWindow.shadowRoot.querySelector('.appWindow').addEventListener('click', e => {
      this.sortArr(e)
      this.focusWindow()
    })
  }
  /**
 * Takes the target thats pressed and place it first in array
 * @param {EventTarget} e
 */
  sortArr (e) {
    this.windowArr.splice(e.target, 1)
    this.windowArr.unshift(e.target)
  }
  /**
 * Makes the window that is first in array the highest z-index
 */
  focusWindow () {
    this.zIndex += 1
    this.windowArr[0].style.zIndex = this.zIndex
  }
}

window.customElements.define('desk-view', Desk)
