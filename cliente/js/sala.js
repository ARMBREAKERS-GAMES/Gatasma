export default class Abertura extends Phaser.Scene {
  constructor () {
    super('sala')
  }

  preload () { }

  create () {
    this.salas = [
      {
        numero: 1,
        x: 100,
        y: 100
      },
      {
        numero: 2,
        x: 200,
        y: 100
      }
    ]

    this.salas.forEach((sala) => {
      sala.botao = this.add
        .text(sala.x, sala.y, 'sala ' + sala.numero)
        .setInteractive()
        .on('pointerdown', () => {
          this.game.socket.emit('entrar-na-sala', sala.numero)
          this.game.scene.stop('sala')
          this.game.scene.start('cena1')
        })
    })
  }
}
