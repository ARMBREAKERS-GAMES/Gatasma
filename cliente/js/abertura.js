export default class Abertura extends Phaser.Scene {
  constructor () {
    super('abertura')
  }

  preload () {
    this.load.spritesheet('aberturaSprite', 'assets/capa.png', {
      frameWidth: 800,
      frameHeight: 450
    })

    this.load.audio('musicaInicio', 'assets/ABERTURALULLABY.mp3')

    this.load.spritesheet('tela-cheia', './assets/fsb.png', {
      frameWidth: 32,
      frameHeight: 32
    })
  }

  create () {
    this.aberturaSprite = this.add.sprite(400, 225, 'aberturaSprite')

    this.add.text(50, this.game.config.height * 0.85, '[Iniciar]')
      .setInteractive()
      .on('pointerdown', () => {
        this.musicaSound.stop()
        this.scene.stop('abertura')
        this.scene.start('sala')
      })

    this.musicaSound = this.sound.add('musicaInicio')
    this.musicaSound.play()
    /* Abertura */

    this.anims.create({
      key: 'abertura',
      frames: this.anims.generateFrameNumbers('aberturaSprite', {
        start: 0,
        end: 4
      }),
      frameRate: 3,
      repeat: -1
    })

    this.aberturaSprite.anims.play('abertura')
    /* Full Screen */

    this.tela_cheia = this.add
      .sprite(770, 30, 'tela-cheia', 0)
      .setInteractive()
      .on('pointerdown', () => {
        if (this.scale.isFullscreen) {
          this.tela_cheia.setFrame(0)
          this.scale.stopFullscreen()
        } else {
          this.tela_cheia.setFrame(1)
          this.scale.startFullscreen()
        }
      })
      .setScrollFactor(0, 0)
  }
}
