import Minehtml from './MineHtml.js'

class Mine extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(Minehtml.content.cloneNode(true))
    this.board = this.shadowRoot.querySelector('#mine')
    this.row = 4
    this.cols = 4
    this.tiles = this.something(this.row, this.cols)
  }

  connectedCallback () {
    this.brick(this.row, this.cols)
  }

  brick () {
for(i = 0; i < rows*cols; i+=)
  }

  something (rows, cols) {
    let i
    let arr = []
    for (i = 1; i <= (rows * cols) / 2; i += 1) {
      arr.push(i)
      arr.push(i)
    }

    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }

    this.tiles = arr
    return arr
  }
}

window.customElements.define('minesweaper-view', Mine)
