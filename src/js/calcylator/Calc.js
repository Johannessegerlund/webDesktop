'use strict'
import calcHTML from './calcHtml.js'

class Calculater extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(calcHTML.content.cloneNode(true))
    this.operation = this.shadowRoot.querySelectorAll('.operation')

    this.equal = this.shadowRoot.querySelector('.equal')
    this.delet = this.shadowRoot.querySelector('.del')
    this.enter = this.shadowRoot.querySelector('.enter')
    this.previous = this.shadowRoot.querySelector('.previous')
    this.curent = this.shadowRoot.querySelector('.current')
    this.calc = (this.shadowRoot.querySelector('.previous'), this.shadowRoot.querySelector('.current'))
  }

  connectedCallback () {
    this.hej()
  }

  hej () {
    this.shadowRoot.querySelectorAll('button').forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault()
        if (e.target.matches('.number')) {
          let x = ''
          x = e.target.textContent
          this.curent.textContent += x
          console.log(x)
        }
        if (e.target.matches('.operation')) {
          this.previous.textContent = this.curent.textContent
          this.curent.textContent = ''
        }
        if (e.target.matches('.enter')) {
        // let hi
        // switch () {
        //   case '+':
        //     hi = this.add()
        //     break
        //   case '-':
        //     hi = this.subtrakt()
        //     break
        //   case '*':
        //     hi = this.times()
        //     break
        //   case '/':
        //     hi = this.devide()
        //     break
        //   default:
        //     return hi
        // }
        // this.curent.textContent = hi

          this.add()
        // this.subtrakt()
        //  this.devide()
        //  this.times()
        }
      })
    })
  }

  add () {
    let hej = parseFloat(this.previous.textContent) + parseFloat(this.curent.textContent)
    this.curent.textContent = hej
  }

  devide () {
    let hej1 = parseFloat(this.previous.textContent) / parseFloat(this.curent.textContent)
    this.curent.textContent = hej1
  }
  subtrakt () {
    let hej2 = parseFloat(this.previous.textContent) - parseFloat(this.curent.textContent)
    this.curent.textContent = hej2
  }

  times () {
    let hej2 = parseFloat(this.previous.textContent) * parseFloat(this.curent.textContent)
    this.curent.textContent = hej2
  }
}

window.customElements.define('calculater-view', Calculater)
