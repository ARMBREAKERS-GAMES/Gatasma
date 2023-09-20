export default class Cena2 extends Phaser.Scene {
  constructor () {
    super('cena2');
    this.botoesPressionados = {
      cima: false,
      direita: false,
      esquerda: false,
    };
  }

  preload() {
    this.load.tilemapTiledJSON('cena2', 'assets/fase2/cena2.json');
    this.load.image('imagemcena2', 'assets/fase2/imagemcena2.png');
    this.load.image('sombra', 'assets/fase2/sombra.png');
    this.load.audio('musica2', 'assets/fase2/musica2.mp3');
    this.load.image('portasobe2', 'assets/fase2/portasobe2.png')
    this.load.spritesheet('porta2', 'assets/fase2/porta2.png', {
      frameWidth: 80,
      frameHeight: 144,
    })
    this.load.spritesheet('botaoa', 'assets/fase2/botaoa.png', {
      frameWidth: 64,
      frameHeight: 64,
    })
    this.load.spritesheet('botaoc2', 'assets/fase2/botaoc2.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('tocha', 'assets/fase2/tocha.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('alavanca2', 'assets/fase2/alavanca2.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
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
    this.scene.input.addPointer(3);
    
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
   
    this.portasobe2 = this.physics.add.image(176, 158, 'portasobe2');
    this.portasobe2.body.setAllowGravity(false);
    this.portasobe2.setImmovable(true);
    
    this.porta2 = this.physics.add.sprite(749, 216, 'porta2').setFrame(1)
    this.porta2.body.setAllowGravity(false);
    this.porta2.setImmovable(true);
   
  
  

    this.tilesetcena2 = this.tilemapcena2.addTilesetImage('imagemcena2', 'imagemcena2');
    this.tilesetcena2 = this.tilemapcena2.addTilesetImage('sombra', 'sombra');
    this.layersombrap = this.tilemapcena2.createLayer('sombrap', [this.tilesetcena2]);
    this.layersombra = this.tilemapcena2.createLayer('sombra', [this.tilesetcena2]);
    this.layersombrac = this.tilemapcena2.createLayer('sombrac', [this.tilesetcena2]);
    this.layerblocos = this.tilemapcena2.createLayer('blocos', [this.tilesetcena2]);
    this.layerblocos.setCollisionByProperty({ collides: true })
    

   
    this.personagem = this.physics.add.sprite(0, 380, 'gugu');
    const hitboxWidth = 17;
    const hitboxHeight = 58;
    const offsetX = 24
    const offsetY = 6
    this.personagem.setSize(hitboxWidth, hitboxHeight, true);
    this.personagem.body.offset.set(offsetX, offsetY)
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
    this.botaoCimaPressionado = false;
    this.botaoDireitaPressionado = false;
    this.botaoEsquerdaPressionado = false;

    this.botaoc2 = this.add
      .sprite(720, 400, 'botaoc2', 0)
    this.botaoc2Collider = this.add.rectangle(732, 412, 1, 8, 0x000000, 0); // O retângulo invisível que corresponde ao botaoc2
    this.physics.world.enable(this.botaoc2Collider); // Habilita a física para o retângulo
    this.botaoc2Collider.body.setAllowGravity(false); // Não permita que a gravidade afete o retângulo

    
    this.alavanca2 = this.add
      .sprite(48, 192, 'alavanca2', 0)
    this.alavanca2Collider = this.add.rectangle(48, 192, 24, 24, 0x000000, 0); // O retângulo invisível que corresponde ao alavanca2
    this.physics.world.enable(this.alavanca2Collider); // Habilita a física para o retângulo
    this.alavanca2Collider.body.setAllowGravity(false); // Não permita que a gravidade afete o retângulo

    //fazeralavancafuncionar
    this.botaoa = this.add.sprite(634, 415, 'botaoa', 0)
      .setInteractive()
      .on('pointerdown', () => {
       const isCollidingWithAlavanca2 = Phaser.Geom.Intersects.RectangleToRectangle(
      this.personagem.getBounds(),
      this.alavanca2Collider.getBounds()
    );

    if (isCollidingWithAlavanca2) {
      // Se estiver colidindo com a alavanca2, defina o frame da alavanca2 para 2
      this.alavanca2.setFrame(2);
      this.porta2.setFrame(0)
      
    }

    // Defina o frame do botaoa para 1
    this.botaoa.setFrame(1);
  })
      .on('pointerup', () => {
        
    // Defina o frame do botaoa de volta para 0
    this.botaoa.setFrame(0);
    
  })
  .setScrollFactor(0, 0);
    // Configurar colisões
   
    this.physics.add.collider(this.personagem, this.layerblocos,);
    this.physics.add.collider(this.personagem, this.portasobe2);

    
  }
  criarBotao(botao, x) {
    this[botao] = this.add.sprite(x, 415, botao, 0)
      .setInteractive()
      .on('pointerdown', () => {
        this[botao].setFrame(1);
        this.botoesPressionados[botao] = true;

        if (botao === 'cima') {
          const bottomCheckPoint = this.personagem.y + this.personagem.displayHeight / 2 + 1;
          const isCollidingWithLayer = this.layerblocos.getTileAtWorldXY(this.personagem.x, bottomCheckPoint);

          if (isCollidingWithLayer) {
            this.personagem.setVelocityY(-500);
          }
        } else {
          this.personagem.anims.play(`gugu-${botao}`, true);
          this.personagem.setVelocityX((botao === 'direita') ? 100 : -100);
        }
      })
      .on('pointerup', () => {
        this[botao].setFrame(0);
        this.botoesPressionados[botao] = false;

        if (botao !== 'cima') {
          this.personagem.anims.play(`gugu-parado-${botao}`);
          this.personagem.setVelocityX(0);
        }
      })
      .setScrollFactor(0, 0);
  }


update() {
  if (this.botoesPressionados.cima) {
    // Ação quando o botão 'cima' estiver pressionado
    const bottomCheckPoint = this.personagem.y + this.personagem.displayHeight / 2 + 1;
    const isCollidingWithLayer = this.layerblocos.getTileAtWorldXY(this.personagem.x, bottomCheckPoint);

    if (isCollidingWithLayer) {
      this.personagem.setVelocityY(-500);
    }
  }

  if (this.botoesPressionados.direita) {
    // Ação quando o botão 'direita' estiver pressionado
    this.personagem.anims.play('gugu-direita', true);
    this.personagem.setVelocityX(100);
  }

  if (this.botoesPressionados.esquerda) {
    // Ação quando o botão 'esquerda' estiver pressionado
    this.personagem.anims.play('gugu-esquerda', true);
    this.personagem.setVelocityX(-100);
  }


    // Verifica a sobreposição entre o personagem e o botaoc2Collider
    const isOverlapping = Phaser.Geom.Intersects.RectangleToRectangle(
      this.personagem.getBounds(),
      this.botaoc2Collider.getBounds()
    );

    if (isOverlapping) {
      // Quando houver sobreposição, mude o sprite do botaoc2 para 1
      this.botaoc2.setFrame(1);
      this.portasobe2.setVelocityY(-30);
  
    } else {
      // Caso contrário, mantenha o sprite do botaoc2 como 0
      this.botaoc2.setFrame(0);
      this.portasobe2.setVelocityY(0);
      
    }
    const isOverlappingalavanca = Phaser.Geom.Intersects.RectangleToRectangle(
      this.personagem.getBounds(),
      this.alavanca2Collider.getBounds()
    );

    if (isOverlappingalavanca) {
      this.botaoa
        .setAlpha(1)
    }
    else {
      this.botaoa
        .setAlpha(0)

    }
   

    // ...
  }
  }

