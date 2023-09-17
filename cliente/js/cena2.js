export default class Cena1 extends Phaser.Scene {
  constructor () {
    super('cena2');
  }
  preload() {
    this.load.spritesheet('vapo', 'assets/fase2/vapo.png',{
      frameWidth: 800,
      frameHeight: 448,
    })
  }

  create() {
    this.vapoSprite = this.add.sprite(400, 225, 'vapo');

    this.anims.create({
      key: 'vapo',
      frames: this.anims.generateFrameNumbers('vapo', { start: 0, end: 7 }),
      frameRate: 12,
      repeat: -1,
    });

    
    this.vapoSprite.anims.play('vapo');
  }
}