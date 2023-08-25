export default class cena0 extends Phaser.Scene {
  constructor () {
    super('cena0')
  }

  preload () {
    this.load.image('ifsc-sj-2014', '../assets/ifsc-sj-2014.png')
    this.load.spritesheet('gatoroubado', '../assets/gato1-inteiro.png', {
      frameWidth: 64,
      frameHeight: 64
    })
  }

  create () {
    this.add.image(400, 225, 'ifsc-sj-2014')
    this.personagem = this.physics.add.sprite(400, 255, 'gatoroubado')
      .setInteractive()
      .on('pointerdown', () => { 
        this.personagem.anims.play('gatoroubado-direita')
        this.personagem.setVelocityX(100)
      })
    
  this.anims.create({
      key: 'gatoroubado-direita',
      frames: this.anims.generateFrameNumbers('gatoroubado', {
        start: 8,
        end: 11
      }),
      frameRate: 6,
      repeat: -1
    })
  }

  update () { }
}
