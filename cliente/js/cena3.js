export default class Cena3 extends Phaser.Scene {
  constructor () {
    super('cena3')
  }

  preload () {
    this.load.tilemapTiledJSON('tilemapcena3', 'assets/fase3/cena3.json')
    this.load.image('imagemcena3', 'assets/fase3/imagemcena3.png')
    this.load.image('fundo', 'assets/fase3/fundocena3.png')
    this.load.spritesheet('gugu', 'assets/fase3/gugu.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('direita', 'assets/botaopb.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('esquerda', 'assets/botaopb.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('cima', 'assets/botaopb.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('tela-cheia', './assets/fsb.png', {
      frameWidth: 32,
      frameHeight: 32
    })
  }

  create () {
    this.input.addPointer(3)

    this.tilemapcena3 = this.make.tilemap({
      key: 'tilemapcena3'
    })
    this.tilesetcena1 = this.tilemapcena3.addTilesetImage('imagemcena3')

    this.tilesetcena3 = this.tilemapcena3.addTilesetImage('imagemcena3', 'imagemcena3')
    this.tilesetcena3 = this.tilemapcena3.addTilesetImage('fundo', 'fundo')
    this.layerfundo = this.tilemapcena3.createLayer('fundo', [this.tilesetcena3])
    this.layerblocos = this.tilemapcena3.createLayer('blocos', [this.tilesetcena3])
    this.layerblocos.setCollisionByProperty({ collides: true })

    this.personagem = this.physics.add.sprite(64, 335, 'gugu')
    const hitboxWidth = 17
    const hitboxHeight = 58
    const offsetX = 24
    const offsetY = 6
    this.personagem.setSize(hitboxWidth, hitboxHeight, true)
    this.personagem.body.offset.set(offsetX, offsetY)
    this.personagem.setCollideWorldBounds(true)

    this.cameras.main.startFollow(this.personagem, false, 1, 0)
    this.cameras.main.setBounds(0, 30, 800, 450)
    this.anims.create({
      key: 'gugu-parado-direita',
      frames: this.anims.generateFrameNumbers('gugu', {
        start: 0,
        end: 3
      }),
      frameRate: 3,
      repeat: -1
    })

    this.anims.create({
      key: 'gugu-parado-esquerda',
      frames: this.anims.generateFrameNumbers('gugu', {
        start: 8,
        end: 11
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

    this.physics.add.collider(this.personagem, this.layerblocos)
    // Crie botões
    this.criarBotao('direita', 166)
    this.criarBotao('esquerda', 70)
    this.criarBotao('cima', 730)
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

  criarBotao (botao, x) {
    this[botao] = this.add.sprite(x, 400, botao, 0)
      .setInteractive()
      .on('pointerdown', () => {
        this[botao].setFrame(1)
        if (botao === 'cima') {
          if (this.personagem.body.blocked.down) { this.personagem.setVelocityY(-200) }
        } else {
          this.personagem.anims.play(`gugu-${botao}`, true)
          this.personagem.setVelocityX((botao === 'direita') ? 100 : -100)
        }
      })
      .on('pointerup', () => {
        this[botao].setFrame(0)
        if (botao !== 'cima') {
          this.personagem.anims.play(`gugu-parado-${botao}`)
          this.personagem.setVelocityX(0)
        }
      })
      .setScrollFactor(0, 0)
  }

  update () {

  }
}
