export default class cena1 extends Phaser.Scene {
  constructor () {
    super('cena1')

    this.velocidade = 200
    
  }

  /* sprites */
  preload() {
    this.load.tilemapTiledJSON('tilemap-cena1', '../assets/Arte/cena1.json')

    this.load.image('imagem-cena1', '../assets/Arte/cena1.png')

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

  /* animações */
  create() {
    this.tilemapcena1 = this.make.tilemap({
      key: 'tilemap-cena1'
    })
    this.tilesetcena1 = this.tilemapcena1.addTilesetImage('imagem-cena1')

    this.layerfundo = this.tilemapcena1.createLayer('fundo', [this.tilesetcena1])
    this.layervitral = this.tilemapcena1.createLayer('vitral', [this.tilesetcena1])
    this.layerpilares = this.tilemapcena1.createLayer('pilares', [this.tilesetcena1])
    this.layerchaocortina = this.tilemapcena1.createLayer('chao-cortina', [this.tilesetcena1])
    this.layercortina2 = this.tilemapcena1.createLayer('cortina', [this.tilesetcena1])

    this.add.image(400, 225, 'Fundo')
    this.personagem = this.physics.add.sprite(400, 200, 'gugu')
    
    this.personagem.setCollideWorldBounds(true)
    
    this.cameras.main.startFollow(this.personagem, false, 1, 0)
    this.physics.world.setBounds(0, 0, 1120, 450)
    this.cameras.main.setBounds(0, -150, 1120, 450)
    this.cameras.main.setZoom(this.cameras.main.zoom + 0.5)
    
    
    

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

    this.anims.create({
      key: 'gugu-cima',
      
    })

    /* botões */
    this.direita = this.add.sprite(150, 400, 'direita', 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.direita.setFrame(1)
        this.personagem.anims.play('gugu-direita', true)
        this.personagem.setVelocityX(100)
      })
      .on('pointerup', () => {
        this.direita.setFrame(0)
        this.personagem.anims.play('gugu-parado-direita')
        this.personagem.setVelocityX(0)
      })
      .setScrollFactor(0, 0)

    this.esquerda = this.add.sprite(50, 400, 'esquerda', 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.esquerda.setFrame(1)
        this.personagem.anims.play('gugu-esquerda', true)
        this.personagem.setVelocityX(-100)
      })
      .on('pointerup', () => {
        this.esquerda.setFrame(0)
        this.personagem.anims.play('gugu-parado-esquerda')
        this.personagem.setVelocityX(0)
      })
      .setScrollFactor(0, 0)
    
    this.cima = this.add.sprite(700, 400, 'cima', 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.cima.setFrame(1);

        // Verifica se o personagem está colidindo com o "layerchaocortina" na parte de baixo
        const bottomCheckPoint = this.personagem.y + this.personagem.displayHeight / 2 + 1; // Ponto abaixo do personagem
        const isCollidingWithLayer = this.layerchaocortina.getTileAtWorldXY(this.personagem.x, bottomCheckPoint);

        if (isCollidingWithLayer) {
          this.personagem.setVelocityY(-100);
        }
      })
      .on('pointerup', () => {
        // Verifica se o personagem está colidindo com o "layerchaocortina" na parte de baixo
        const bottomCheckPoint = this.personagem.y + this.personagem.displayHeight / 2 + 1; // Ponto abaixo do personagem
        const isCollidingWithLayer = this.layerchaocortina.getTileAtWorldXY(this.personagem.x, bottomCheckPoint);

        if (isCollidingWithLayer) {
          this.cima.setFrame(0);
        } else {
          // Se não estiver colidindo, defina o frame como 0
          this.cima.setFrame(0);
        }
      })
      .setScrollFactor(0, 0);
    
    /*limites*/

    


    this.layerchaocortina.setCollisionByProperty({ collides: true })
    this.physics.add.collider(this.personagem, this.layerchaocortina)
  }

  update() {
    // Defina a posição Y de destino da câmera para ser a posição Y do personagem menos 80 pixels
    const cameraY = this.personagem.y - 80;

    // Suavize o movimento da câmera usando o método Phaser.Math.Linear
    const smoothFactor = 0.1; // Ajuste esse valor para controlar a suavidade
    const newCameraY = Phaser.Math.Linear(this.cameras.main.scrollY, cameraY, smoothFactor);

    // Defina a posição Y da câmera
    this.cameras.main.scrollY = newCameraY;
  }
}
