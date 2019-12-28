import Minehtml from './MineHtml.js'

class Mine extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(Minehtml.content.cloneNode(true))
    this.mine = this.shadowRoot.querySelector('#mine')
    this.row = 4
    this.cols = 4
    this.tiles = this.something(this.row, this.cols)
  }

  connectedCallback () {
    this.brick(4, 4)
  }

  hej1 () {
    let hej = document.createElement('img')
    Math.floor(Math.random() * rows, cols)
  }

  brick (rows, cols) {
    for (let i = 0; i < rows * cols; i += 1) {
      let img = document.createElement('img')
      img.setAttribute('src', 'image/questionmark.jpg')
      this.mine.appendChild(img)

      if ((i + 1) % cols === 0) {
        this.mine.appendChild(document.createElement('br'))
      }

      img.addEventListener('click', (e) => {
        img.setAttribute('src', 'image/smily.png')
      })
    }
  }

  turn () {

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
