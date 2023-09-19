export default class Cena2 extends Phaser.Scene {
  constructor () {
    super('cena2');
  }

  preload() {
    this.load.tilemapTiledJSON('cena2', 'assets/fase2/cena2.json');
    this.load.image('imagemcena2', 'assets/fase2/imagemcena2.png');
    this.load.image('sombra', 'assets/fase2/sombra.png');
    this.load.audio('musica2', 'assets/fase2/musica2.mp3');
    this.load.spritesheet('vapo', 'assets/fase2/vapo.png', {
      frameWidth: 800,
      frameHeight: 448
    })
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
  }

  create() {
    this.musicaSound = this.sound.add('musica2');
    this.musicaSound.setLoop(true);
    this.musicaSound.play();

    this.vapo = this.add.sprite(400, 225, 'vapo');
    this.anims.create({
      key: 'vapo',
      frames: this.anims.generateFrameNumbers('vapo', {
        start: 0,
        end: 6,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.vapo.anims.play('vapo', true);
    this.tilemapcena2 = this.make.tilemap({
      key: 'cena2'
    });
 
    this.tilesetcena2 = this.tilemapcena2.addTilesetImage('imagemcena2', 'imagemcena2');
    this.tilesetcena2 = this.tilemapcena2.addTilesetImage('sombra', 'sombra');
    this.layersombrap = this.tilemapcena2.createLayer('sombrap', [this.tilesetcena2]);
    this.layersombra = this.tilemapcena2.createLayer('sombra', [this.tilesetcena2]);
    this.layersombrac = this.tilemapcena2.createLayer('sombrac', [this.tilesetcena2]);
    this.layerblocos = this.tilemapcena2.createLayer('blocos', [this.tilesetcena2]);
    this.layerblocos.setCollisionByProperty({ collides: true })

   
    this.personagem = this.physics.add.sprite(0, 380, 'gugu');
    const hitboxWidth = 17;
    const hitboxHeight = 62;
    const offsetX = (this.personagem.width - hitboxWidth) / 2;
    const offsetY = this.personagem.height - hitboxHeight;
    this.personagem.setSize(hitboxWidth, hitboxHeight, true);
    this.personagem.setCollideWorldBounds(true);

    this.cameras.main.startFollow(this.personagem, false, 1, 0);
    this.cameras.main.setBounds(0, 30, 800, 450);
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
    // Crie botões
    this.criarBotao('direita', 166);
    this.criarBotao('esquerda', 70);
    this.criarBotao('cima', 730);

    // Configurar colisões
   
    this.physics.add.collider(this.personagem, this.layerblocos);

    
  }
  criarBotao(botao, x) {
    this[botao] = this.add.sprite(x, 415, botao, 0)
      .setInteractive()
      .on('pointerdown', () => {
        this[botao].setFrame(1);
        if (botao === 'cima') {
          const bottomCheckPoint = this.personagem.y + this.personagem.displayHeight / 2 + 1;
          const isCollidingWithLayer = this.layerblocos.getTileAtWorldXY(this.personagem.x, bottomCheckPoint);

          if (isCollidingWithLayer) {
            this.personagem.setVelocityY(-200);
          }
        } else {
          this.personagem.anims.play(`gugu-${botao}`, true);
          this.personagem.setVelocityX((botao === 'direita') ? 100 : -100);
        }
      })
      .on('pointerup', () => {
        this[botao].setFrame(0);
        if (botao !== 'cima') {
          this.personagem.anims.play(`gugu-parado-${botao}`);
          this.personagem.setVelocityX(0);
        }
      })
      .setScrollFactor(0, 0);
  }
}
