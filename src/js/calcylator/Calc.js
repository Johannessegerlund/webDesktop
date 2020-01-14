'use strict'
import calcHTML from './calcHtml.js'
/**
 * @class Calculater
 * @extends {window.HTML}
 */
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
    this.resetValue()
    this.operators = ['+', '-', '/', '*']
  }

  connectedCallback () {
    this.calculater()
  }
  /**
 * Makes the value null
 * Used for reseting the calculator
 */
  resetValue () {
    this.value = null
  }
  /**
 * Listens for the button and operators and pushes the number to a div (curent)
 * if pressed a operator the curent value goes to another div (previous) then
 * if pressed equal it calculates or you can press the same operator to get the sum emediatly
 */
  calculater () {
    this.shadowRoot.querySelectorAll('button').forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault()

        if (this.operators.includes(e.target.textContent)) {
          this.previousOperator = this.operator
          this.operator = e.target.textContent
        }

        if (e.target.matches('.number')) {
          let number = ''
          number = e.target.textContent
          this.curent.textContent += number
        }

        if (e.target.matches('.operation') || e.target.matches('.equal')) {
          this.curent.textContent += ' ' + this.operator
          if (this.operator === '+') {
            this.add()
          }
          if (this.operator === '-') {
            this.subtrakt()
          }
          if (this.operator === '*') {
            this.multiply()
          }
          if (this.operator === '/') {
            this.devide()
          }
          this.curent.textContent = ''
        }

        if (e.target.matches('.AC')) {
          this.curent.textContent = ''
          this.previous.textContent = ''
          this.resetValue()
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
  /**
 * Calculates addition
 */
  add () {
    if (!Number.isNaN(parseFloat(this.curent.textContent))) {
      if (this.value === null) {
        this.value = 0
      }
      this.value += parseFloat(this.curent.textContent)
      this.previous.textContent = this.value
    }
  }
  /**
 * Calculates devision
 */

  devide () {
    if (!Number.isNaN(parseFloat(this.curent.textContent))) {
      if (this.value === null) {
        this.value = parseFloat(this.curent.textContent)
      } else {
        this.value /= parseFloat(this.curent.textContent)
      }
      this.previous.textContent = this.value
    }
  }

  /**
 * Calculates subtract
 */

  subtrakt () {
    if (!Number.isNaN(parseFloat(this.curent.textContent))) {
      if (this.value === null) {
        this.value = 0
      }
      this.value -= parseFloat(this.curent.textContent)
      this.previous.textContent = this.value
    }
  }
  /**
 * Calculates multiply
 */
  multiply () {
    if (!Number.isNaN(parseFloat(this.curent.textContent))) {
      if (this.value === null) {
        this.value = 1
      }
      this.value *= parseFloat(this.curent.textContent)

      this.previous.textContent = this.value
    }
  }
}

window.customElements.define('calculater-view', Calculater)
