export default class Cena2 extends Phaser.Scene {
  constructor () {
    super('cena2')
    this.botoesPressionados = {
      cima: false,
      direita: false,
      esquerda: false
    }
  }

  preload () {
    this.load.tilemapTiledJSON('cena2', 'assets/fase2/cena2.json')
    this.load.image('imagemcena2', 'assets/fase2/imagemcena2.png')
    this.load.image('sombra', 'assets/fase2/sombra.png')
    this.load.audio('musica2', 'assets/fase2/musica2.mp3')
    this.load.image('portasobe2', 'assets/fase2/portasobe2.png')
    this.load.image('transparente', 'assets/fase2/transparente.png')

    this.load.spritesheet('porta2', 'assets/fase2/porta2.png', {
      frameWidth: 80,
      frameHeight: 144
    })
    this.load.spritesheet('botaoa', 'assets/fase2/botaoa.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('botaoc2', 'assets/fase2/botaoc2.png', {
      frameWidth: 32,
      frameHeight: 32
    })
    this.load.spritesheet('tocha', 'assets/fase2/tocha.png', {
      frameWidth: 32,
      frameHeight: 32
    })
    this.load.spritesheet('alavanca2', 'assets/fase2/alavanca2.png', {
      frameWidth: 32,
      frameHeight: 32
    })
    this.load.spritesheet('vapo', 'assets/fase2/vapo.png', {
      frameWidth: 800,
      frameHeight: 448
    })
    this.load.spritesheet('gugu', 'assets/gugu.png', {
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
    this.load.spritesheet('tela-cheia', './assets/fsb.png', {
      frameWidth: 32,
      frameHeight: 32
    })
  }

  create () {
    this.game.cena = 'cena2'
    this.input.addPointer(3)

    this.musicaSound = this.sound.add('musica2')
    this.musicaSound.setLoop(true)
    this.musicaSound.play()

    this.vapo = this.add.sprite(400, 225, 'vapo')
    this.anims.create({
      key: 'vapo',
      frames: this.anims.generateFrameNumbers('vapo', {
        start: 0,
        end: 6
      }),
      frameRate: 6,
      repeat: -1
    })
    this.vapo.anims.play('vapo', true)
    this.tilemapcena2 = this.make.tilemap({
      key: 'cena2'
    })

    this.portasobe2 = this.physics.add.image(176, 158, 'portasobe2')
    this.portasobe2.body.setAllowGravity(true)
    this.portasobe2.setImmovable(true)

    this.porta2 = this.physics.add.sprite(749, 216, 'porta2').setFrame(1)
    this.porta2.body.setAllowGravity(false)
    this.porta2.setImmovable(true)

    this.transparente = this.physics.add.image(176, 240, 'transparente')
    this.transparente.body.setAllowGravity(false)
    this.transparente.setImmovable(true)

    this.tilesetcena2 = this.tilemapcena2.addTilesetImage('imagemcena2', 'imagemcena2')
    this.tilesetcena2 = this.tilemapcena2.addTilesetImage('sombra', 'sombra')
    this.layersombrap = this.tilemapcena2.createLayer('sombrap', [this.tilesetcena2])
    this.layersombra = this.tilemapcena2.createLayer('sombra', [this.tilesetcena2])
    this.layersombrac = this.tilemapcena2.createLayer('sombrac', [this.tilesetcena2])
    this.layerblocos = this.tilemapcena2.createLayer('blocos', [this.tilesetcena2])
    this.layerblocos.setCollisionByProperty({ collides: true })

    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = 'gugu'
      this.remoto = 'vivi'
      this.personagem = this.physics.add.sprite(10, 384, this.local, 0)
      this.personagemRemoto = this.add.sprite(10, 384, this.remoto, 0)
    } else if (this.game.jogadores.segundo === this.game.socket.id) {
      this.local = 'vivi'
      this.remoto = 'gugu'
      this.personagemRemoto = this.add.sprite(10, 384, this.remoto, 0)
      this.personagem = this.physics.add.sprite(10, 384, this.local, 0)
    }

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
      key: 'personagem-parado-direita',
      frames: this.anims.generateFrameNumbers('this.local', {
        start: 0,
        end: 3
      }),
      frameRate: 3,
      repeat: -1
    })

    this.anims.create({
      key: 'personagem-parado-esquerda',
      frames: this.anims.generateFrameNumbers('this.local', {
        start: 8,
        end: 11
      }),
      frameRate: 3,
      repeat: -1
    })

    this.anims.create({
      key: 'personagem-direita',
      frames: this.anims.generateFrameNumbers('this.local', {
        start: 4,
        end: 7
      }),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'personagem-esquerda',
      frames: this.anims.generateFrameNumbers('this.local', {
        start: 12,
        end: 15
      }),
      frameRate: 6,
      repeat: -1
    })
    // Crie botões
    this.criarBotao('direita', 166)
    this.criarBotao('esquerda', 70)
    this.criarBotao('cima', 730)
    this.botaoCimaPressionado = false
    this.botaoDireitaPressionado = false
    this.botaoEsquerdaPressionado = false

    this.botaoc2 = this.add
      .sprite(720, 400, 'botaoc2', 0)
    this.botaoc2Collider = this.add.rectangle(732, 412, 1, 8, 0x000000, 0) // O retângulo invisível que corresponde ao botaoc2
    this.physics.world.enable(this.botaoc2Collider) // Habilita a física para o retângulo
    this.botaoc2Collider.body.setAllowGravity(false) // Não permita que a gravidade afete o retângulo

    this.alavanca2 = this.add
      .sprite(48, 192, 'alavanca2', 0)
    this.alavanca2Collider = this.add.rectangle(48, 192, 24, 24, 0x000000, 0) // O retângulo invisível que corresponde ao alavanca2
    this.physics.world.enable(this.alavanca2Collider) // Habilita a física para o retângulo
    this.alavanca2Collider.body.setAllowGravity(false) // Não permita que a gravidade afete o retângulo

    // fazeralavancafuncionar
    this.botaoa = this.add.sprite(634, 415, 'botaoa', 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.game.socket.emit('artefatos-publicar', this.game.sala, { portasso2: true })
        this.alavanca2.setFrame(2)
        this.porta2.setFrame(0)
        this.botaoa.setFrame(1)
      })
      .on('pointerup', () => {
        // Defina o frame do botaoa de volta para 0
        this.botaoa.setFrame(0)
      })
      .setScrollFactor(0, 0)
    // Configurar colisões

    this.physics.add.collider(this.personagem, this.layerblocos)
    this.physics.add.collider(this.personagem, this.portasobe2)
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

    this.game.socket.on('estado-notificar', ({ x, y, frame }) => {
      this.personagemRemoto.x = x
      this.personagemRemoto.y = y
      this.personagemRemoto.setFrame(frame)
    })
    this.physics.add.collider(this.personagem, this.porta2, this.handlePortaCollision, null, this)
    this.physics.add.collider(this.personagemRemoto, this.porta2, this.handlePortaCollision, null, this)
    // Método para lidar com a colisão com a porta2
  }

  handlePortaCollision (personagem, porta2) {
    if (porta2.frame.name === 0) {
      // Aqui você pode adicionar a lógica para mostrar texto ou iniciar a cena3
      console.log('Gugu ou Vivi está em contato com a porta2 no frame 0!')
      // Exemplo de como iniciar a cena3 após 1 segundo
      this.scene.start('finalfeliz')
    }
  }

  criarBotao (botao, x) {
    this[botao] = this.add.sprite(x, 415, botao, 0)
      .setInteractive()
      .on('pointerdown', () => {
        this[botao].setFrame(1)
        this.botoesPressionados[botao] = true

        if (botao === 'cima') {
          const bottomCheckPoint = this.personagem.y + this.personagem.displayHeight / 2 + 1
          const isCollidingWithLayer = this.layerblocos.getTileAtWorldXY(this.personagem.x, bottomCheckPoint)

          if (isCollidingWithLayer) {
            this.personagem.setVelocityY(-500)
          }
        } else {
          this.personagem.anims.play(`personagem-${botao}`, true)
          this.personagem.setVelocityX((botao === 'direita') ? 100 : -100)
        }
      })
      .on('pointerup', () => {
        this[botao].setFrame(0)
        this.botoesPressionados[botao] = false

        if (botao !== 'cima') {
          this.personagem.anims.play(`personagem-parado-${botao}`)
          this.personagem.setVelocityX(0)
        }
      })
      .setScrollFactor(0, 0)

    this.game.socket.on('botaoc2-notificar', (botao) => {
      if (botao.pressionado && this.portasobe2.setVelocityY !== 0) {
        this.botaoc2.setFrame(1)
        this.portasobe2.setVelocityY(-140)
      }
    })
    this.game.socket.on('portasobe2-notificar', ({ x, y, frame }) => {
      this.portasobe2.x = x
      this.portasobe2.y = y
      this.portasobe2.setFrame(frame)
    })
    this.game.socket.on('artefatos-notificar', (artefatos) => {
      if (artefatos.portasso2) {
        this.alavanca2.setFrame(2)
        this.porta2.setFrame(0)
        this.botaoa.setFrame(1)
      }
    })
  }

  update () {
    try {
      this.game.socket.emit('estado-publicar', this.game.sala, {
        x: this.personagem.x,
        y: this.personagem.y,
        frame: this.personagem.frame.name
      })
    } catch (error) {
      console.error(error)
    }

    if (this.botoesPressionados.cima) {
      // Ação quando o botão 'cima' estiver pressionado
      const bottomCheckPoint = this.personagem.y + this.personagem.displayHeight / 2 + 1
      const isCollidingWithLayer = this.layerblocos.getTileAtWorldXY(this.personagem.x, bottomCheckPoint)

      if (isCollidingWithLayer) {
        this.personagem.setVelocityY(-200)
      }
    }

    if (this.botoesPressionados.direita) {
      // Ação quando o botão 'direita' estiver pressionado
      this.personagem.anims.play('personagem-direita', true)
      this.personagem.setVelocityX(100)
    }

    if (this.botoesPressionados.esquerda) {
      // Ação quando o botão 'esquerda' estiver pressionado
      this.personagem.anims.play('personagem-esquerda', true)
      this.personagem.setVelocityX(-100)
    }

    // Verifica a sobreposição entre o personagem e o botaoc2Collider
    const isOverlapping = Phaser.Geom.Intersects.RectangleToRectangle(
      this.personagem.getBounds(),
      this.botaoc2Collider.getBounds()
    )

    if (isOverlapping) {
      // Quando houver sobreposição, mude o sprite do botaoc2 para 1
      this.botaoc2.setFrame(1)
      this.portasobe2.setVelocityY(-60)
      this.game.socket.emit('botaoc2-publicar', this.game.sala, { pressionado: true })
    } else {
      // Caso contrário, mantenha o sprite do botaoc2 como 0
      this.botaoc2.setFrame(0)
      this.portasobe2.setVelocityY(0)
    }
    const isOverlappingalavanca = Phaser.Geom.Intersects.RectangleToRectangle(
      this.personagem.getBounds(),
      this.alavanca2Collider.getBounds()
    )

    if (isOverlappingalavanca) {
      this.botaoa
        .setAlpha(1)
    } else {
      this.botaoa
        .setAlpha(0)
    }

    // Verifica a sobreposição entre o personagem e o botaoc2Collider
    const isOverlappingtransparente = Phaser.Geom.Intersects.RectangleToRectangle(
      this.portasobe2.getBounds(),
      this.transparente.getBounds()
    )

    if (isOverlappingtransparente) {
      // Quando houver sobreposição, mude o sprite do botaoc2 para 1
      this.portasobe2.body.setAllowGravity(false)
    } else {
      // Caso contrário, mantenha o sprite do botaoc2 como 0
      this.portasobe2.body.setAllowGravity(true)
      this.portasobe2.body.setGravityY(1000)
    }
  }
}
