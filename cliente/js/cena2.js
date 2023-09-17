export default class Cena1 extends Phaser.Scene {
  constructor () {
    super('cena2');
  }

  preload() {
    this.load.tilemapTiledJSON('tilemap-cena2', 'assets/fase2/cena2.json');
    this.load.image('imagem-cena1', 'assets/fase2/cena2.png');
    this.load.image('sombra', 'assets/fase2/sombra.png');


    this.load.spritesheet('gugu', 'assets/gugu.png', {
      frameWidth: 64,
      frameHeight: 64,
    })
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

    this.load.spritesheet('vapo', 'assets/fase2/vapo.png', {
      frameWidth: 800,
      frameHeight: 448,
    });
    
  }

  create() {
    this.tilemapcena1 = this.make.tilemap({ key: 'tilemap-cena2' });
    this.tilesetcena2 = this.tilemapcena1.addTilesetImage('imagem-cena1', 'imagem-cena1'); // Use o nome correto da imagem
    this.tilesetcena2 = this.tilemapcena1.addTilesetImage('sombra', 'sombra'); // Use o nome correto da imagem

    this.layersombrap = this.tilemapcena1.createLayer('sombrap', [this.tilesetcena2]);
    this.layersombra = this.tilemapcena1.createLayer('sombra', [this.tilesetcena2]);
    this.layersombrac = this.tilemapcena1.createLayer('sombrac', [this.tilesetcena2]);
    this.layerblocos = this.tilemapcena1.createLayer('blocos', [this.tilesetcena2]);

    // Personagem "gugu"
    this.personagem = this.physics.add.sprite(0, 200, 'gugu');
    const hitboxWidth = 17;
    const hitboxHeight = 56;
    const offsetX = (this.personagem.width - hitboxWidth) / 2;
    const offsetY = this.personagem.height - hitboxHeight;
    this.personagem.setSize(hitboxWidth, hitboxHeight, true);
    this.personagem.setOffset(offsetX, offsetY);
    this.personagem.setCollideWorldBounds(true);

    // Câmera segue o personagem "gugu"
    this.cameras.main.startFollow(this.personagem, true, 0.1, 0.1); // Os últimos dois valores controlam a suavização

    // Câmera segue o personagem "gugu"
    this.cameras.main.startFollow(this.personagem, false, 1, 0);
    this.physics.world.setBounds(0, 0, this.tilemapcena1.widthInPixels, this.tilemapcena1.heightInPixels);
    this.cameras.main.setBounds(0, 0, this.tilemapcena1.widthInPixels, this.tilemapcena1.heightInPixels);


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

  criarBotao(botao, x) {
    this[botao] = this.add.sprite(x, 350, botao, 0)
      .setInteractive()
      .on('pointerdown', () => {
        this[botao].setFrame(1);
        if (botao === 'cima') {
          const bottomCheckPoint = this.personagem.y + this.personagem.displayHeight / 2 + 1;
          const isCollidingWithLayer = this.layerchaocortina.getTileAtWorldXY(this.personagem.x, bottomCheckPoint);

          if (isCollidingWithLayer) {
            this.personagem.setVelocityY(-100);
          }
        } else {
          this.personagem.anims.play(`gugu-${botao}`, true);
          this.personagem.setVelocityX((botao === 'direita') ? 100 : -100);
        }
      })
    
    // Configurar colisões
    this.layerblocos.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.personagem, this.layerblocos);

    //fundo
    this.anims.create({
      key: 'vapo',
      frames: this.anims.generateFrameNumbers('vapo', { start: 0, end: 7 }),
      frameRate: 12,
      repeat: -1,
    });
    this.personagem.anims.play('vapo');
  }
}