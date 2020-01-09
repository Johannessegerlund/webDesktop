'use strict'
import { win } from './desktopHTML.js'
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

  dragElement (element) {
    element.addEventListener('mousedown', e => {
      if (e.target === element) {
        this.dragMouseDown(e, element)
      }
    })
  }

  dragMouseDown (e, element) {
    e.preventDefault()
    this.isSelected = true
    e = e || window.event
    this.pos3 = e.clientX
    this.pos4 = e.clientY
    document.addEventListener('mousemove', e => this.elementDrag(e, element))
    document.addEventListener('mouseup', e => this.closeDragElement(e, element))
  }

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

  closeDragElement (e) {
    console.log('Leaving')
    this.isSelected = false
    // document.removeEventListener('mouseup', (e) => console.log('Removed mouseup listener'))
    // document.removeEventListener('mousemove', (e) => console.log('Removed mousemove listener'))
  }

  // dragableWindow (elem) {
  //   this.selected = elem
  //   this.x_elem = this.x_pos - this.selected.offsetLeft
  //   this.y_elem = this.y_pos - this.selected.offsetTop
  // }

  // // Will be called when user dragging an element
  // moveElem (e) {
  //   this.x_pos = document.all ? window.event.clientX : e.pageX
  //   this.y_pos = document.all ? window.event.clientY : e.pageY
  //   if (this.selected !== null) {
  //     this.selected.style.left = (this.x_pos - this.x_elem) + 'px'
  //     this.selected.style.top = (this.y_pos - this.y_elem) + 'px'
  //   }
  // }

  // destroy () {
  //   this.selected = null
  // }
}

window.customElements.define('desk-window', Deskwindow)
