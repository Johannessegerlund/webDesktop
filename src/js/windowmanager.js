'use strict'
import { win } from './desktopHTML.js'

/**
 * @class Deskwindow
 * @extends {window.HTML}
 */
class Deskwindow extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(win.content.cloneNode(true))
    this.pos1 = 0
    this.pos2 = 0
    this.pos3 = 0
    this.pos4 = 0
    this.isSelected = false
  }

  connectedCallback () {
    let windows = this.shadowRoot.querySelectorAll('.appWindow')
    for (let i = 0; i < windows.length; i++) {
      let window = windows[i]
      this.dragElement(window)
    }
  }
  /**
 *Listens if mouse is down
 * @param {} element
 */
  dragElement (element) {
    element.addEventListener('mousedown', e => {
      if (e.target === element) {
        this.dragMouseDown(e, element)
      }
    })
  }
  /**
 * Determines where the window is when you use mousedown
 * and if you use mouse up or move
 * @param {EventTarget} e
 * @param {*} element
 */
  dragMouseDown (e, element) {
    e.preventDefault()
    this.isSelected = true
    e = e || window.event
    this.pos3 = e.clientX
    this.pos4 = e.clientY
    document.addEventListener('mousemove', e => this.elementDrag(e, element))
    document.addEventListener('mouseup', e => this.closeDragElement(e, element))
  }
  /**
 *  If mouse is down you are able to drag it in diffrent positions on screen
 * @param {*} e
 * @param {*} element
 */
  elementDrag (e, element) {
    if (this.isSelected === true) {
      e.preventDefault()

      e = e || window.event
      this.pos1 = this.pos3 - e.clientX
      this.pos2 = this.pos4 - e.clientY
      this.pos3 = e.clientX
      this.pos4 = e.clientY

      element.style.top = (element.offsetTop - this.pos2) + 'px'
      element.style.left = (element.offsetLeft - this.pos1) + 'px'
    }
  }
  /**
 * If mouse up you let go of window on its place
 * @param {*} e
 */
  closeDragElement (e) {
    this.isSelected = false
  }
}

window.customElements.define('desk-window', Deskwindow)
