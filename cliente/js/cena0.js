export default class cena0 extends Phaser.Scene {
  constructor () {
    super('cena0')
  }

  /*sprites*/
  preload () {
    this.load.image('Fundo', '../assets/Fundo.png')
    this.load.spritesheet('vivi', '../assets/gato1-inteiro.png', {
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

    this.load.spritesheet('cima', '../assets/cima.png', {
      frameWidth: 64,
      frameHeight: 64
    })
  }

  /*animações*/
  create () {
    this.add.image(400, 225, 'Fundo')
    this.personagem = this.physics.add.sprite(400, 255, 'vivi')

    this.anims.create({
      key: 'vivi-parado',
      frames: this.anims.generateFrameNumbers('vivi', {
        start: 0,
        end: 0
      }),
      frameRate: 1
    })

    this.anims.create({
      key: 'vivi-direita',
      frames: this.anims.generateFrameNumbers('vivi', {
        start: 8,
        end: 11
      }),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'vivi-esquerda',
      frames: this.anims.generateFrameNumbers('vivi', {
        start: 4,
        end: 7
      }),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'vivi-cima',
      frames: this.anims.generateFrameNumbers('vivi', {
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
        this.personagem.anims.play('vivi-direita', true)
        this.personagem.setVelocityX(100)
      })
      .on('pointerup', () => {
        this.direita.setFrame(0)
        this.personagem.anims.play('vivi-parado')
        this.personagem.setVelocityX(0)
      })
    
    this.esquerda = this.add.sprite(50, 400, 'esquerda', 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.esquerda.setFrame(1)
        this.personagem.anims.play('vivi-esquerda', true)
        this.personagem.setVelocityX(-100)
      })
      .on('pointerup', () => {
        this.esquerda.setFrame(0)
        this.personagem.anims.play('vivi-parado')
        this.personagem.setVelocityX(0)
      })
    
    this.cima = this.add.sprite(700, 400, 'cima', 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.cima.setFrame(1)
        this.personagem.anims.play('vivi-cima', true)
        this.personagem.setVelocityY(-100)
      })
      .on('pointerup', () => {
        this.cima.setFrame(0)
        this.personagem.anims.play('vivi-parado')
        this.personagem.setVelocityY(0)
      })
  }

  update () { }
}
