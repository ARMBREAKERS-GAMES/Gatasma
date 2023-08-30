export default class cena0 extends Phaser.Scene {
  constructor () {
    super('cena0')
  }

  /*sprites*/
  preload () {
    this.load.image('Fundo', '../assets/Fundo.png')
    this.load.spritesheet('gugu', '../assets/gugu.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.spritesheet('direita', '../assets/botao.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.spritesheet('esquerda', '../assets/botao.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.spritesheet('cima', '../assets/botao.png', {
      frameWidth: 64,
      frameHeight: 64
    })
  }

  /*animações*/
  create () {
    this.add.image(400, 225, 'Fundo')
    this.personagem = this.physics.add.sprite(400, 255, 'gugu')

    this.anims.create({
      key: 'gugu-parado',
      frames: this.anims.generateFrameNumbers('gugu', {
        start: 0,
        end: 3
      }),
      frameRate: 3,
      repeat: -1
    })

    this.anims.create({
      key: 'gugu-direita',
      frames: this.anims.generateFrameNumbers('gugu', {
        start: 4,
        end: 7
      }),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'gugu-esquerda',
      frames: this.anims.generateFrameNumbers('gugu', {
        start: 12,
        end: 15
      }),
      frameRate: 6,
      repeat: -1
    })

    /*botões*/
    this.direita = this.add.sprite(150, 400, 'direita', 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.direita.setFrame(1)
        this.personagem.anims.play('gugu-direita', true)
        this.personagem.setVelocityX(100)
      })
      .on('pointerup', () => {
        this.direita.setFrame(0)
        this.personagem.anims.play('gugu-parado')
        this.personagem.setVelocityX(0)
      })

    this.esquerda = this.add.sprite(50, 400, 'esquerda', 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.esquerda.setFrame(1)
        this.personagem.anims.play('gugu-esquerda', true)
        this.personagem.setVelocityX(-100)
      })
      .on('pointerup', () => {
        this.esquerda.setFrame(0)
        this.personagem.anims.play('gugu-parado')
        this.personagem.setVelocityX(0)
      })
      .on('pointerup', () => {
        this.cima.setFrame(0)
        this.personagem.anims.play('gugu-parado')
        this.personagem.setVelocityY(0)
      })
  }

  update () { }
}
