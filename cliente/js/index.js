/* importação de objetos */

import config from './config.js'
import cena1 from './cena1.js'
import cena2 from './cena2.js'
import cena3 from './cena3.js'
import abertura from './abertura.js'
import cutscene from './cutscene.js'


class Game extends Phaser.Game {
  constructor () {
    super(config)

    this.scene.add('cena1', cena1)
    this.scene.add('cena2', cena2)
    this.scene.add('cena3', cena3)
    this.scene.add('aberura', abertura)
    this.scene.add('cutscene', cutscene)
    this.scene.start('abertura')
    
  }
}

window.onload = () => {
  window.game = new Game()
}
