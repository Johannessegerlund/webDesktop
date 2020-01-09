// 'use strict'
// import calcHTML from './calcHtml.js'

// class Calculater extends window.HTMLElement {
//   constructor () {
//     super()
//     this.attachShadow({ mode: 'open' })
//     this.shadowRoot.appendChild(calcHTML.content.cloneNode(true))
//     this.operation = this.shadowRoot.querySelectorAll('.operation')

//     this.equal = this.shadowRoot.querySelector('.equal')
//     this.delet = this.shadowRoot.querySelector('.del')
//     this.enter = this.shadowRoot.querySelector('.enter')
//     this.previous = this.shadowRoot.querySelector('.previous')
//     this.curent = this.shadowRoot.querySelector('.current')
//     this.calc = (this.shadowRoot.querySelector('.previous'), this.shadowRoot.querySelector('.current'))
//     this.symbol = this.symbol
//     this.sum = this.sum
//   }

//   connectedCallback () {
//     this.hej()
//   }

//   hej () {
//     this.shadowRoot.querySelectorAll('button').forEach(item => {
//       item.addEventListener('click', e => {
//         e.preventDefault()

//         if (e.target.textContent === '+') {
//           this.symbol = '+'
//         } else if (e.target.textContent === '-') {
//           this.symbol = '-'
//         } if (e.target.textContent === '/') {
//           this.symbol = '/'
//         } else if (e.target.textContent === '*') {
//           this.symbol = '*'
//         }

//         if (e.target.matches('.number')) {
//           let number = ''
//           number = e.target.textContent
//           this.curent.textContent += number
//         }

//         if (e.target.matches('.operation')) {
//           let operation = ''
//           operation = e.target.textContent
//           this.curent.textContent += ' ' + operation
//           this.previous.textContent += this.curent.textContent
//           this.curent.textContent = ''
//         }

//         if (e.target.matches('.equal')) {
//           if (this.symbol === '+') {
//             this.add()
//           }
//           if (this.symbol === '-') {
//             this.subtrakt()
//           }
//           if (this.symbol === '*') {
//             this.times()
//           }
//           if (this.symbol === '/') {
//             this.devide()
//           }
//           this.curent.textContent = ''
//         }
//         // else if (this.previous.textContent !== '' && this.curent.textContent !== '') {
//         //   // && this.curent.textContent !== ''
//         //   if (this.symbol === '+') {
//         //     this.previous.textContent += this.sum
//         //     this.add()
//         //     // this.curent.textContent = ''
//         //   }
//         //   if (this.symbol === '-') {
//         //     this.subtrakt()
//         //   }
//         //   if (this.symbol === '*') {
//         //     this.times()
//         //   }
//         //   if (this.symbol === '/') {
//         //     this.devide()
//         //   }
//         //   this.curent.textContent = ''
//         // }

//         // if (e.target.matches('.AC')) {
//         //   this.curent.textContent = ''
//         //   this.previous.textContent = ''
//         // }
//         // if (e.target.matches('.del')) {
//         //   this.curent.textContent = this.curent.textContent.slice(0, -1)
//         // }
//         // if (e.target.matches('.dec')) {
//         //   this.curent.textContent = this.curent.textContent + '.'
//         // }
//       })
//     })
//   }

//   add () {
//     this.sum = parseFloat(this.previous.textContent) + parseFloat(this.curent.textContent)
//     this.previous.textContent = this.sum
//   }

//   devide () {
//     this.sum = parseFloat(this.previous.textContent) / parseFloat(this.curent.textContent)
//     this.previous.textContent = this.sum
//   }
//   subtrakt () {
//     this.sum = parseFloat(this.previous.textContent) - parseFloat(this.curent.textContent)
//     this.previous.textContent = this.sum
//   }

//   times () {
//     this.sum = parseFloat(this.previous.textContent) * parseFloat(this.curent.textContent)
//     this.previous.textContent = this.sum
//   }
// }

// window.customElements.define('calculater-view', Calculater)

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
    this.resetValue()
    this.tmpNum = 0
    this.operators = ['+', '-', '/', '*']
  }

  connectedCallback () {
    this.hej()
  }

  resetValue () {
    this.value = null
  }

  hej () {
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
            this.times()
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

  add () {
    if (!Number.isNaN(parseFloat(this.curent.textContent))) {
      if (this.value === null) {
        this.value = 0
      }
      this.value += parseFloat(this.curent.textContent)
      console.log(this.value)
      this.previous.textContent = this.value
    }
  }

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
  subtrakt () {
    if (!Number.isNaN(parseFloat(this.curent.textContent))) {
      if (this.value === null) {
        this.value = 0
      }
      this.value -= parseFloat(this.curent.textContent)
      console.log(this.value)
      this.previous.textContent = this.value
    }
  }

  times () {
    if (!Number.isNaN(parseFloat(this.curent.textContent))) {
      if (this.value === null) {
        this.value = 1
      }
      this.value *= parseFloat(this.curent.textContent)

      console.log(this.value)
      this.previous.textContent = this.value
    }
  }
}

window.customElements.define('calculater-view', Calculater)

// 'use strict'
// import calcHTML from './calcHtml.js'

// class Calculater extends window.HTMLElement {
//   constructor () {
//     super()
//     this.attachShadow({ mode: 'open' })
//     this.shadowRoot.appendChild(calcHTML.content.cloneNode(true))
//     this.operation = this.shadowRoot.querySelectorAll('.operation')

//     this.equal = this.shadowRoot.querySelector('.equal')
//     this.delet = this.shadowRoot.querySelector('.del')
//     this.enter = this.shadowRoot.querySelector('.enter')
//     this.previous = this.shadowRoot.querySelector('.previous')
//     this.curent = this.shadowRoot.querySelector('.current')
//     this.calc = (this.shadowRoot.querySelector('.previous'), this.shadowRoot.querySelector('.current'))
//     this.resetValue()
//     this.tmpNum = 0
//     this.operators = ['+', '-', '/', '*']
//   }

//   connectedCallback () {
//     this.hej()
//   }

//   resetValue () {
//     this.value = null
//   }

//   hej () {
//     this.shadowRoot.querySelectorAll('button').forEach(item => {
//       item.addEventListener('click', e => {
//         e.preventDefault()

//         if (this.operators.includes(e.target.textContent)) {
//           this.previousOperator = this.operator
//           this.operator = e.target.textContent
//         }

//         if (e.target.matches('.number')) {
//           let number = ''
//           number = e.target.textContent
//           this.curent.textContent += number
//         }

//         if (e.target.matches('.operation') || e.target.matches('.equal')) {
//           // this.curent.textContent += ' ' + this.operator
//           if (this.previousOperator === '+') {
//             this.add()
//             this.curent.textContent = ''
//           }
//           if (this.previousOperator === '-') {
//             this.subtrakt()
//             this.curent.textContent = ''
//           }
//           if (this.previousOperator === '*') {
//             this.times()
//             this.curent.textContent = ''
//           }
//           if (this.previousOperator === '/') {
//             this.devide()
//             this.curent.textContent = ''
//           }
//         }

//         if (e.target.matches('.AC')) {
//           this.curent.textContent = ''
//           this.previous.textContent = ''
//           this.resetValue()
//         }
//         if (e.target.matches('.del')) {
//           this.curent.textContent = this.curent.textContent.slice(0, -1)
//         }
//         if (e.target.matches('.dec')) {
//           this.curent.textContent = this.curent.textContent + '.'
//         }
//       })
//     })
//   }

//   add () {
//     if (!Number.isNaN(parseFloat(this.curent.textContent))) {
//       if (this.value === null) {
//         this.value = 0
//       }
//       this.value += parseFloat(this.curent.textContent)
//       console.log(this.value)
//       this.previous.textContent = this.value
//     }
//   }

//   devide () {
//     if (!Number.isNaN(parseFloat(this.curent.textContent))) {
//       if (this.value === null) {
//         this.value = parseFloat(this.curent.textContent)
//       } else {
//         this.value /= parseFloat(this.curent.textContent)
//       }
//       this.previous.textContent = this.value
//     }
//   }
//   subtrakt () {
//     if (!Number.isNaN(parseFloat(this.curent.textContent))) {
//       if (this.value === null) {
//         this.value = 0
//       }
//       this.value -= parseFloat(this.curent.textContent)
//       console.log(this.value)
//       this.previous.textContent = this.value
//     }
//   }

//   times () {
//     if (!Number.isNaN(parseFloat(this.curent.textContent))) {
//       if (this.value === null) {
//         this.value = 1
//       }
//       this.value *= parseFloat(this.curent.textContent)

//       console.log(this.value)
//       this.previous.textContent = this.value
//     }
//   }
// }

// window.customElements.define('calculater-view', Calculater)
