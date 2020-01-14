
import chattHTML from './Chatthtml.js'

class Chatt extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(chattHTML.content.cloneNode(true))
    this.chatt = this.shadowRoot.querySelector('.chatt')
    this.socket = null
  }

  /**
   * listeans to chatt and if pressed enter send message
   * connects to socket
   * Able to print username and save it
   */
  connectedCallback () {
    this.chatt.addEventListener('keypress', e => {
      if (e.keyCode === 13) {
        this.sendMsg(e.target.value)
        e.target.value = ''
        e.preventDefault()
      }
    })
    this.connect()

    this.userName()
  }
  /**
 * Connects to a webSocket listeans if print massage and parse it to json
 */
  connect () {
    return new Promise(function (resolve, reject) {
      if (this.socket && this.socket.readyState === 1) {
        resolve(this.socket)
        return
      }
      this.socket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')
      this.socket.addEventListener('open', function () {
        resolve(this.socket)
      }.bind(this))
      this.socket.addEventListener('message', e => {
        let message = JSON.parse(e.data)
        if (message.type === 'message') {
          this.print(message)
        }
      })
    }.bind(this))
  }
  /**
 * prints massage and username on site
 * @param {} message
 */
  print (message) {
    let temp = this.chatt.querySelectorAll('template')[0]
    let msg = document.importNode(temp.content.firstElementChild, true)
    msg.querySelectorAll('.text')[0].textContent = message.data
    msg.querySelectorAll('.author')[0].textContent = message.username + ':'
    this.chatt.querySelectorAll('.messages')[0].appendChild(msg)
  }
  /**
 * Contains a object with data that contains information that sends in a string format
 *  and a key for the websocket to connect
 * @param {} text
 */
  sendMsg (text) {
    const data = {
      type: 'message',
      data: text,
      username: this.user,
      channel: '',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }

    this.connect().then(function (socket) {
      socket.send(JSON.stringify(data))
      // console.log('sending message', text)
    })

    window.localStorage.setItem('username', JSON.stringify(data.username))
  }
  /**
 * Listeans to username text input and if you send store the username in localstorage
 */
  userName () {
    this.user = JSON.parse(window.localStorage.getItem('username'))

    this.shadowRoot.querySelector('#sendUser').addEventListener('click', e => {
      if (e.target === this.shadowRoot.querySelector('#sendUser')) {
        this.user = this.shadowRoot.querySelector('#username').value
      }
    })
  }
}

window.customElements.define('chatt-view', Chatt)
