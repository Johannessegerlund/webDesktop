
import chattHTML from './Chatthtml.js'

class Chatt extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(chattHTML.content.cloneNode(true))
    this.chatt = this.shadowRoot.querySelector('.chatt')
  }

  connectedCallback () {
    this.chatt.addEventListener('keypress', e => {
      if (e.keyCode === 13) {
        this.sendMsg(e.target.value)
        e.target.value = ''
        e.preventDefault()
      }
    })
  }
  test () {

  }

  connect () {

  }
  sendMsg (text) {
    console.log('sending massage', text)
  }
}

window.customElements.define('chatt-view', Chatt)
