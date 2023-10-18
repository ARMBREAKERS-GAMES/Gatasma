export default class Cena1 extends Phaser.Scene {
  constructor () {
    super('cena1')
    this.velocidade = 200
  }

  preload () {
    // Carregue os recursos
    this.load.tilemapTiledJSON('tilemap-cena1', 'assets/Arte/cena1.json')
    this.load.image('imagem-cena1', 'assets/Arte/cena1.png')
    this.load.image('pilarsu', 'assets/pilarsu.png')

    this.load.spritesheet('gugu', 'assets/gugu.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('vivi', 'assets/vivi.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('direita', 'assets/botao.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('esquerda', 'assets/botao.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('cima', 'assets/botao.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.audio('passo', 'assets/passo.mp3')

    this.load.spritesheet('tela-cheia', './assets/fsb.png', {
      frameWidth: 32,
      frameHeight: 32
    })
  }

  create () {
    this.input.addPointer(3)
    this.cena = 'cena1'

    // Crie as camadas do mapa
    this.tilemapcena1 = this.make.tilemap({
      key: 'tilemap-cena1'
    })
    this.tilesetcena1 = this.tilemapcena1.addTilesetImage('imagem-cena1')

    this.layerfundo = this.tilemapcena1.createLayer('fundo', [this.tilesetcena1])
    this.layervitral = this.tilemapcena1.createLayer('vitral', [this.tilesetcena1])
    this.layerchaocortina = this.tilemapcena1.createLayer('chao-cortina', [this.tilesetcena1])
    this.layercortina2 = this.tilemapcena1.createLayer('cortina', [this.tilesetcena1])
    this.layerpilares = this.tilemapcena1.createLayer('pilares', [this.tilesetcena1])

    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = 'gugu'
      this.remoto = 'vivi'
      this.personagem = this.physics.add.sprite(0, 200, this.local, 0)
      this.personagemRemoto = this.add.sprite(64, 200, this.remoto, 0)
    } else if (this.game.jogadores.segundo === this.game.socket.id) {
      this.local = 'vivi'
      this.remoto = 'gugu'
      this.personagemRemoto = this.add.sprite(64, 200, this.remoto, 0)
      this.personagem = this.physics.add.sprite(0, 200, this.local, 0)
    } else {
      // jogador em tela cheia
    }

    // Crie o personagem
    // this.personagem = this.physics.add.sprite(0, 200, 'gugu')
    const hitboxWidth = 17
    const hitboxHeight = 56
    const offsetX = (this.personagem.width - hitboxWidth) / 2
    const offsetY = this.personagem.height - hitboxHeight
    this.personagem.setSize(hitboxWidth, hitboxHeight, true)
    this.personagem.setOffset(offsetX, offsetY)
    this.personagem.setCollideWorldBounds(true)

    // Siga o personagem com a câmera
    this.cameras.main.startFollow(this.personagem, false, 1, 0)
    this.physics.world.setBounds(0, 0, 1120, 450)
    this.cameras.main.setBounds(0, -150, 1120, 450)
    this.cameras.main.setZoom(this.cameras.main.zoom + 0.5)
    // Crie o pilar
    this.pilar = this.add.sprite(641, 152, 'pilarsu', 0)

    // Crie animações para o personagem
    this.anims.create({
      key: 'personagem-parado-direita',
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 0,
        end: 3
      }),
      frameRate: 3,
      repeat: -1
    })

    this.anims.create({
      key: 'personagem-parado-esquerda',
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 8,
        end: 11
      }),
      frameRate: 3,
      repeat: -1
    })

    this.anims.create({
      key: 'personagem-direita',
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 4,
        end: 7
      }),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'personagem-esquerda',
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 12,
        end: 15
      }),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'personagem-cima' // Defina os quadros para esta animação
    })

    // Crie botões
    this.criarBotao('direita', 266)
    this.criarBotao('esquerda', 170)
    this.criarBotao('cima', 630)

    // Configurar colisões
    this.layerchaocortina.setCollisionByProperty({ collides: true })
    this.physics.add.collider(this.personagem, this.layerchaocortina)

    // Armazenar a posição anterior da câmera
    this.previousCameraX = this.cameras.main.scrollX

    this.textShown = false

    /* Full Screen */

    this.tela_cheia = this.add
      .sprite(630, 100, 'tela-cheia', 0)
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
    this[botao] = this.add.sprite(x, 350, botao, 0)
      .setInteractive()
      .on('pointerdown', () => {
        this[botao].setFrame(1)
        if (botao === 'cima') {
          const bottomCheckPoint = this.personagem.y + this.personagem.displayHeight / 2 + 1
          const isCollidingWithLayer = this.layerchaocortina.getTileAtWorldXY(this.personagem.x, bottomCheckPoint)

          if (isCollidingWithLayer) {
            this.personagem.setVelocityY(-100)
          }
        } else {
          this.personagem.anims.play(`personagem-${botao}`, true)
          this.personagem.setVelocityX((botao === 'direita') ? 100 : -100)
        }
        this.passoSound = this.sound.add('passo')
        this.passoSound.setLoop(true)
        this.passoSound.play()
        this.passoSound.setVolume(0.1)
        this.passoSound.setRate(0.8)
      })
      .on('pointerup', () => {
        this[botao].setFrame(0)
        if (botao !== 'cima') {
          this.personagem.anims.play(`personagem-parado-${botao}`)
          this.personagem.setVelocityX(0)
        }
        this.passoSound.stop()
      })
      .setScrollFactor(0, 0)

    this.game.socket.on('estado-notificar', ({ cena, x, y, frame }) => {
      console.log(cena)
      if (cena !== this.cena) {
        this.scene.stop(this.cena)
        this.scene.start(cena)
      }
      this.personagemRemoto.x = x
      this.personagemRemoto.y = y
      this.personagemRemoto.setFrame(frame)
    })
  }

  update () {
    try {
      this.game.socket.emit('estado-publicar', this.game.sala, {
        cena: this.cena,
        x: this.personagem.x,
        y: this.personagem.y,
        frame: this.personagem.frame.name
      })
    } catch (error) {
      console.error(error)
    }

    const cameraY = this.personagem.y - 80
    const smoothFactor = 0.1
    const newCameraY = Phaser.Math.Linear(this.cameras.main.scrollY, cameraY, smoothFactor)
    this.cameras.main.scrollY = newCameraY

    if (this.cameras.main.scrollX > this.previousCameraX) {
      this.pilar.x -= 0.4
    }
    if (this.cameras.main.scrollX < this.previousCameraX) {
      this.pilar.x += 0.4
    }

    this.previousCameraX = this.cameras.main.scrollX
    const limiteDireitoTela = 1020 // Altere para o valor apropriado
    if ((this.personagem.x >= limiteDireitoTela) && (this.textShown == false)) {
      this.textShown = true
      this.add.text(980, 10, '[próxima fase]')
        .setInteractive()
        .on('pointerdown', () => {
          this.scene.stop('cena1')
          this.scene.start('cena2')
        })
    }
  }
}
