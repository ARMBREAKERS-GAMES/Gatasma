export default class cena0 extends Phaser.Scene {
  constructor () {
    super('cena0')
  }

  preload () {
    this.load.image('Fundo', '../assets/Fundo.png')
    this.load.spritesheet('gatoroubado', '../assets/gato1-inteiro.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.spritesheet('direita', '../assets/direita.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.spritesheet('esquerda', '../assets/esquerda.png', {
      frameWidth: 64,
      frameHeight: 64
    })
  }

  create () {
    this.add.image(400, 225, 'Fundo')
    this.personagem = this.physics.add.sprite(400, 255, 'gatoroubado')

    this.anims.create({
      key: 'gatoroubado-parado',
      frames: this.anims.generateFrameNumbers('gatoroubado', {
        start: 0,
        end: 0
      }),
      frameRate: 1
    })

    this.anims.create({
      key: 'gatoroubado-direita',
      frames: this.anims.generateFrameNumbers('gatoroubado', {
        start: 8,
        end: 11
      }),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'gatoroubado-esquerda',
      frames: this.anims.generateFrameNumbers('gatoroubado', {
        start: 4,
        end: 7
      }),
      frameRate: 6,
      repeat: -1
    })


    this.direita = this.add.sprite(150, 400, 'direita', 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.direita.setFrame(1)
        this.personagem.anims.play('gatoroubado-direita', true)
        this.personagem.setVelocityX(100)
      })
      .on('pointerup', () => {
        this.direita.setFrame(0)
        this.personagem.anims.play('gatoroubado-parado')
        this.personagem.setVelocityX(0)
      })
    
    this.esquerda = this.add.sprite(50, 400, 'esquerda', 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.esquerda.setFrame(1)
        this.personagem.anims.play('gatoroubado-esquerda', true)
        this.personagem.setVelocityX(-100)
      })
      .on('pointerup', () => {
        this.esquerda.setFrame(0)
        this.personagem.anims.play('gatoroubado-parado')
        this.personagem.setVelocityX(0)
      })
  }

  update () { }
}
