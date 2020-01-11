'use strict'
import { template, Pick } from './html.js'

class Memory extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(Pick.content.cloneNode(true))
    this.turned1 = this.turned1
    this.lastTile = this.lastTile
    this.turned2 = this.turned2
    this.pairs = 0
    this.try = 0
    this.row = 4
    this.cols = 4
    this.tiles = this.something(this.row, this.cols)
  }

  connectedCallback () {
    this.shadowRoot.querySelectorAll('button').forEach(element => {
      element.addEventListener('click', e => {
        this.shadowRoot.querySelector('#remove').innerHTML = ''
        if (e.target.matches('#four')) {
          this.row = 4
          this.cols = 4
          this.tiles = this.something(this.row, this.cols)
          this.shadowRoot.appendChild(template.content.cloneNode(true))
          this.bricks(this.row, this.cols)
        } else if (e.target.matches('#two')) {
          this.row = 2
          this.cols = 2
          this.tiles = this.something(this.row, this.cols)
          this.shadowRoot.appendChild(template.content.cloneNode(true))
          this.bricks(this.row, this.cols)
        }
        if (e.target.matches('#twoByfour')) {
          this.row = 4
          this.cols = 2
          this.tiles = this.something(this.row, this.cols)
          this.shadowRoot.appendChild(template.content.cloneNode(true))
          this.bricks(this.row, this.cols)
        }
      })
    })
  }

  turnBrick (tile, a, img) {
    img = img.nodeName === 'IMG' ? img : img.firstElementChild
    if (this.turned2) { return }

    img.src = 'image/' + tile + '.png'

    if (!this.turned1) {
      this.turned1 = img
      this.lastTile = tile
    } else {
      if (img === this.turned1) {
        return
      }

      this.try += 1
      console.log(this.try)

      this.turned2 = img
      if (tile === this.lastTile) {
        this.pairs += 1

        if (this.pairs === (this.row * this.cols) / 2) {
          console.log('you won at' + ', ' + this.try + ', ' + 'tries')
          this.shadowRoot.querySelector('#Board').innerHTML = 'you won at' + ', ' + this.try + ', ' + 'tries'
        }

        console.log(this.pairs)

        setTimeout(() => {
          this.turned1.parentNode.classList.add('remove')
          this.turned2.parentNode.classList.add('remove')

          this.turned1 = null
          this.turned2 = null
        }, 300)
      } else {
        setTimeout(
          () => {
            this.turned1.setAttribute('src', 'image/0.png')
            this.turned2.setAttribute('src', 'image/0.png')

            this.turned1 = null
            this.turned2 = null
          }, 500)
      }
    }
  }

  bricks () {
    this.board = this.shadowRoot.querySelector('#Board')
    let img
    let a
    console.log(this.tiles)
    this.tiles.forEach((tile, index) => {
      a = document.createElement('a')

      a.setAttribute('data-content', index)

      a.setAttribute('href', '#')

      a.setAttribute('class', 'a')

      img = document.createElement('img')
      img.setAttribute('src', 'image/0.png')

      a.appendChild(img)
      this.board.appendChild(a)

      img.addEventListener('click', (e) => {
        this.turnBrick(tile, index, e.target)
      })

      a.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
          this.turnBrick(tile, index, e.target)
        }
      })

      if ((index + 1) % this.cols === 0) {
        this.board.appendChild(document.createElement('br'))
      }
    }
    )
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

window.customElements.define('memory-view', Memory)
