export default class Cutscene extends Phaser.Scene {
  constructor () {
    super('cutscene');
  }

  preload() {
    this.load.image('frasco', 'assets/cutscene/frasco.png');
    this.load.image('olhando', 'assets/cutscene/olhando.png');
    this.load.image('submundo', 'assets/cutscene/submundo.png');
    this.load.image('logo', 'assets/cutscene/logo.png');
  }

  create() {
    // Adicione as imagens e defina a visibilidade inicial
    const submundoImage = this.add.image(400, 225, 'submundo').setAlpha(0);
    const frascoImage = this.add.image(400, 225, 'frasco').setAlpha(0);
    const olhandoImage = this.add.image(400, 225, 'olhando').setAlpha(0);
    const logoImage = this.add.image(400, 225, 'logo').setAlpha(0);

    const fadeIn = (target, duration, onComplete) => {
      this.tweens.add({
        targets: target,
        alpha: 1,
        duration: duration,
        onComplete: onComplete,
      });
    };

    const fadeOut = (target, duration, onComplete) => {
      this.tweens.add({
        targets: target,
        alpha: 0,
        duration: duration,
        onComplete: onComplete,
      });
    };

    // Animação de Fade In para 'logo'
    fadeIn(logoImage, 1000, () => {
      // Após o Fade In, aguarde 5 segundos antes de fazer o Fade Out
      this.time.delayedCall(2000, () => {
        // Animação de Fade Out para 'logo'
        fadeOut(logoImage, 1000, () => {
          // Animação de Fade In para 'submundo'
          fadeIn(submundoImage, 1000, () => {
            // Após o Fade In, aguarde 5 segundos antes de fazer o Fade Out
            this.time.delayedCall(5000, () => {
              // Animação de Fade Out para 'submundo'
              fadeOut(submundoImage, 1000, () => {
                // Animação de Fade In para 'frasco'
                fadeIn(frascoImage, 1000, () => {
                  // Após o Fade In, aguarde 5 segundos antes de fazer o Fade Out
                  this.time.delayedCall(5000, () => {
                    // Animação de Fade Out para 'frasco'
                    fadeOut(frascoImage, 1000, () => {
                      // Animação de Fade In para 'olhando'
                      fadeIn(olhandoImage, 1000, () => {
                        // Após o Fade In de 'olhando', aguarde 5 segundos antes de iniciar a cena1
                        this.time.delayedCall(5000, () => {
                          // Inicie a cena1
                          this.scene.start('cena1');
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }
}
