/* importação de objetos */

import config from './config.js'
import cena1 from './cena1.js'
import cena2 from './cena2.js'
import cena3 from './cena3.js'
import sala from './sala.js'
import abertura from './abertura.js'
import cutscene from './cutscene.js'

class Game extends Phaser.Game {
  constructor () {
    super(config)

    this.id = 11 // Jogo GATASMA, id 1
    this.valor = 100 // crédito padrão em Tijolinhos quando termina o jogo

    let iceServers
    if (window.location.host === 'feira-de-jogos.sj.ifsc.edu.br') {
      iceServers = [
        {
          urls: 'stun:feira-de-jogos.sj.ifsc.edu.br'
        },
        {
          urls: 'turns:feira-de-jogos.sj.ifsc.edu.br',
          username: 'adcipt',
          credential: 'adcipt20232'
        }
      ]
    } else {
      iceServers = [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    }
    this.iceServers = { iceServers }
    this.audio = document.querySelector('audio')

    this.socket = io()
    this.socket.on('connect', () => {
      console.log(' Conectado ao Servidor')
    })

    this.scene.add('cena1', cena1)
    this.scene.add('sala', sala)
    this.scene.add('cena2', cena2)
    this.scene.add('cena3', cena3)
    this.scene.add('abertura', abertura)
    this.scene.add('cutscene', cutscene)

    this.cena = 'abertura'
    this.scene.start(this.cena)

    this.socket.on('cena-notificar', cena => {
      this.scene.stop(this.cena)
      this.scene.start(cena)
    })
  }
}

window.onload = () => {
  window.game = new Game()
}
