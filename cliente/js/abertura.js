export default class Abertura extends Phaser.Scene {
  constructor () {
    super('abertura');
  }

  preload() {
    this.load.spritesheet('aberturaSprite', 'assets/capa.png', {
      frameWidth: 800,
      frameHeight: 450,
    })

    this.load.audio('musicaInicio', 'assets/ABERTURALULLABY.mp3');
  }

  create() {

    this.aberturaSprite = this.add.sprite(400, 225, 'aberturaSprite');

    this.add.text(50, this.game.config.height * 0.85, '[cutscene]')
      .setInteractive()
      .on('pointerdown', () => {
        this.musicaSound.stop();
        this.scene.stop('abertura');
        this.scene.start('cutscene');
      });

    this.musicaSound = this.sound.add('musicaInicio');
    this.musicaSound.play();

    this.add.text(700, this.game.config.height * 0.85, '[iniciar]')
      .setInteractive()
      .on('pointerdown', () => {
        this.musicaSound.stop();
        this.scene.stop('abertura');
        this.scene.start('cena1');
      });

    /*Abertura*/

    this.anims.create({
      key: 'abertura',
      frames: this.anims.generateFrameNumbers('aberturaSprite', {
        start: 0,
        end: 4,
      }),
      frameRate: 3,
      repeat: -1,
    });

    this.aberturaSprite.anims.play('abertura');
  }
}
