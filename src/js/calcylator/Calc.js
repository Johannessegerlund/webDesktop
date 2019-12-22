'use strict'
import calcHTML from './calcHtml.js'

class Calculater extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(calcHTML.content.cloneNode(true))
    this.operation = this.shadowRoot.querySelectorAll('.operation')
    this.number = this.shadowRoot.querySelector('.number')
    this.equal = this.shadowRoot.querySelector('.equal')
    this.delet = this.shadowRoot.querySelector('.del')
    this.enter = this.shadowRoot.querySelector('.enter')
    this.previous = this.shadowRoot.querySelector('.previous')
    this.curent = this.shadowRoot.querySelector('.current')
    this.calc = (this.shadowRoot.querySelector('.previous'), this.shadowRoot.querySelector('.current'))
  }

  connectedCallback () {
    this.hej1()
  }

  hej () {
    this.number.forEach(button => {
      button.addEventListener('click', e => {
        this.calc.appendChild(button)
      })
    })
  }
}

window.customElements.define('calculater-view', Calculater)
