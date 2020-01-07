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
    this.symbol = this.symbol
    this.numbers = []
  }

  connectedCallback () {
    this.hej()
  }

  hej () {
    this.shadowRoot.querySelectorAll('button').forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault()

        if (e.target.textContent === '+') {
          this.symbol = '+'
        } else if (e.target.textContent === '-') {
          this.symbol = '-'
        } if (e.target.textContent === '/') {
          this.symbol = '/'
        } else if (e.target.textContent === '*') {
          this.symbol = '*'
        }

        if (e.target.matches('.number')) {
          let x = ''
          x = e.target.textContent
          this.curent.textContent += x

          if (this.symbol = '+') {
            this.numbers.push(parseFloat(e.target.textContent))
            console.log('x', this.numbers)
            let sum = this.numbers.reduce((a, b) => a + b, 0)
            this.curent.textContent = sum

            console.log('TOT', sum)
          } else if (this.symbol = '*') {
            this.numbers.push(parseFloat(e.target.textContent))
            console.log('x', this.numbers)
            let sum = this.numbers.reduce((a, b) => a * b, 0)
            this.curent.textContent = sum

            console.log('TOT', sum)
          }
        }
        if (e.target.matches('.operation')) {
          let x = ''
          x = e.target.textContent
          this.curent.textContent += ' ' + x
          this.previous.textContent = this.curent.textContent
          this.curent.textContent = ''
        }

        if (e.target.matches('.equal')) {
          if (this.symbol === '+') {
            this.add()
          }
          if (this.symbol === '-') {
            this.subtrakt()
          }
          if (this.symbol === '*') {
            this.times()
          }
          if (this.symbol === '/') {
            this.devide()
          }
        }

        if (e.target.matches('.AC')) {
          this.curent.textContent = ''
          this.previous.textContent = ''
          this.numbers = []
        }
        if (e.target.matches('.del')) {
          this.curent.textContent = this.curent.textContent.slice(0, -1)
        }
        if (e.target.matches('.dec')) {
          this.curent.textContent = this.curent.textContent + '.'
        }
      })
    })
  }

  add () {
    let hej = parseFloat(this.previous.textContent) + parseFloat(this.curent.textContent)
    this.curent.textContent = hej
  }

  devide () {
    let hej = parseFloat(this.previous.textContent) / parseFloat(this.curent.textContent)
    this.curent.textContent = hej
  }
  subtrakt () {
    let hej = parseFloat(this.previous.textContent) - parseFloat(this.curent.textContent)
    this.curent.textContent = hej
  }

  times () {
    let hej = parseFloat(this.previous.textContent) * parseFloat(this.curent.textContent)
    this.curent.textContent = hej
  }
}

window.customElements.define('calculater-view', Calculater)
