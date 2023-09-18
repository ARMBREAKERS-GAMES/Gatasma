export default class Cena2 extends Phaser.Scene {
  constructor () {
    super('cena2');
  }

  preload() {
    this.load.tilemapTiledJSON('cena2', 'assets/fase2/cena2.json');
    this.load.image('imagemcena2', 'assets/fase2/imagemcena2.png');
    this.load.image('sombra', 'assets/fase2/sombra.png');
   
  }
  create() {
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

  }
  }
