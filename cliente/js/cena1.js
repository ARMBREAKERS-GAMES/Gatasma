export default class Cena1 extends Phaser.Scene {
  constructor () {
    super('cena1');
    this.velocidade = 200;
  }

  preload() {
    // Carregue os recursos
    this.load.tilemapTiledJSON('tilemap-cena1', 'assets/Arte/cena1.json');
    this.load.image('imagem-cena1', 'assets/Arte/cena1.png');
    this.load.image('pilarsu', 'assets/pilarsu.png');
    this.load.spritesheet('gugu', 'assets/gugu.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet('direita', 'assets/botao.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet('esquerda', 'assets/botao.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet('cima', 'assets/botao.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    // Crie as camadas do mapa
    this.tilemapcena1 = this.make.tilemap({
      key: 'tilemap-cena1',
    });
    this.tilesetcena1 = this.tilemapcena1.addTilesetImage('imagem-cena1');

    this.layerfundo = this.tilemapcena1.createLayer('fundo', [this.tilesetcena1]);
    this.layervitral = this.tilemapcena1.createLayer('vitral', [this.tilesetcena1]);
    this.layerpilares = this.tilemapcena1.createLayer('pilares', [this.tilesetcena1]);
    this.layerchaocortina = this.tilemapcena1.createLayer('chao-cortina', [this.tilesetcena1]);
    this.layercortina2 = this.tilemapcena1.createLayer('cortina', [this.tilesetcena1]);

    // Crie o personagem
    this.personagem = this.physics.add.sprite(0, 200, 'gugu');
    const hitboxWidth = 17;
    const hitboxHeight = 56;
    const offsetX = (this.personagem.width - hitboxWidth) / 2;
    const offsetY = this.personagem.height - hitboxHeight;
    this.personagem.setSize(hitboxWidth, hitboxHeight, true);
    this.personagem.setOffset(offsetX, offsetY);
    this.personagem.setCollideWorldBounds(true);

    // Siga o personagem com a câmera
    this.cameras.main.startFollow(this.personagem, false, 1, 0);
    this.physics.world.setBounds(0, 0, 1120, 450);
    this.cameras.main.setBounds(0, -150, 1120, 450);
    this.cameras.main.setZoom(this.cameras.main.zoom + 0.5);

    // Crie o pilar
    this.pilar = this.add.sprite(641, 152, 'pilarsu', 0);

    // Crie animações para o personagem
    this.anims.create({
      key: 'gugu-parado-direita',
      frames: this.anims.generateFrameNumbers('gugu', {
        start: 0,
        end: 3,
      }),
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: 'gugu-parado-esquerda',
      frames: this.anims.generateFrameNumbers('gugu', {
        start: 8,
        end: 11,
      }),
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: 'gugu-direita',
      frames: this.anims.generateFrameNumbers('gugu', {
        start: 4,
        end: 7,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: 'gugu-esquerda',
      frames: this.anims.generateFrameNumbers('gugu', {
        start: 12,
        end: 15,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: 'gugu-cima', // Defina os quadros para esta animação
    });

    // Crie botões
    this.criarBotao('direita', 266);
    this.criarBotao('esquerda', 170);
    this.criarBotao('cima', 630);

    // Configurar colisões
    this.layerchaocortina.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.personagem, this.layerchaocortina);

    // Armazenar a posição anterior da câmera
    this.previousCameraX = this.cameras.main.scrollX;
  }

  criarBotao(nome, x) {
    this[nome] = this.add.sprite(x, 350, nome, 0)
      .setInteractive()
      .on('pointerdown', () => {
        this[nome].setFrame(1);
        if (nome === 'cima') {
          const bottomCheckPoint = this.personagem.y + this.personagem.displayHeight / 2 + 1;
          const isCollidingWithLayer = this.layerchaocortina.getTileAtWorldXY(this.personagem.x, bottomCheckPoint);

          if (isCollidingWithLayer) {
            this.personagem.setVelocityY(-100);
          }
        } else {
          this.personagem.anims.play(`gugu-${nome}`, true);
          this.personagem.setVelocityX((nome === 'direita') ? 100 : -100);
        }
      })
      .on('pointerup', () => {
        this[nome].setFrame(0);
        if (nome !== 'cima') {
          this.personagem.anims.play(`gugu-parado-${nome}`);
          this.personagem.setVelocityX(0);
        }
      })
      .setScrollFactor(0, 0);
  }

  update() {
    const cameraY = this.personagem.y - 80;
    const smoothFactor = 0.1;
    const newCameraY = Phaser.Math.Linear(this.cameras.main.scrollY, cameraY, smoothFactor);
    this.cameras.main.scrollY = newCameraY;

    if (this.cameras.main.scrollX > this.previousCameraX) {
      this.pilar.x -= 0.4;
    }
    if (this.cameras.main.scrollX < this.previousCameraX) {
      this.pilar.x += 0.4;
    }

    this.previousCameraX = this.cameras.main.scrollX;
  }
}
