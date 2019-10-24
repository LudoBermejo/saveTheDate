export default class LudoSprite extends Phaser.Physics.Arcade.Sprite {
  originalX: number
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'ludoSprite')
    this.originalX = x;
    scene.add.existing(this)
    this.scale = 5
    this.x = x;
    this.y = y;
    scene.anims.create({
      key: 'travolta',
      frames: [{
        key: 'ludoSprite',
        frame: 4,
        duration: 1500
      }, {
        key: 'ludoSprite',
        frame: 8,
        duration: 1500
      }],
      delay: 500,
      repeat:5000,
    })
    scene.anims.create({
      key: 'stop',
      frames: scene.anims.generateFrameNames('ludoSprite', { start: 0, end: 0 }),
    })
    scene.anims.create({
      key: 'down',
      frames: scene.anims.generateFrameNames('ludoSprite', { start: 0, end: 3 }),
      repeat: -1
    })
    scene.anims.create({
      key: 'left',
      frames: scene.anims.generateFrameNames('ludoSprite', { start: 4, end: 7 }),
      repeat: -1
    })

    scene.anims.create({
      key: 'right',
      frames: scene.anims.generateFrameNames('ludoSprite', { start: 8, end: 11 }),
      repeat: -1
    })

    scene.anims.create({
      key: 'up',
      frames: scene.anims.generateFrameNames('ludoSprite', { start: 12, end: 15 }),
      repeat: -1
    })
  }

  public gotoCenter() {
    const tween = this.scene.tweens.add({
      targets: this,
      props: {
        x: {
          value: 100,
        }
      },
      // alpha: { start: 0, to: 1 },
      // alpha: 1,
      // alpha: '+=1',
      ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 3000,
      repeat: 0,            // -1: infinity
      yoyo: false,
      onComplete: () => {
        this.play('stop');
        this.emit('COMPLETE');
      },
    });
  }

  public exit() {
    this.play('right');
    const tween = this.scene.tweens.add({
      targets: this,
      props: {
        x: {
          value: this.originalX + 200,
        }
      },
      // alpha: { start: 0, to: 1 },
      // alpha: 1,
      // alpha: '+=1',
      ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 3000,
      repeat: 0,            // -1: infinity
      yoyo: false,
      onComplete: () => {
        this.play('stop');
        this.emit('COMPLETE_EXIT');
      },
    });
  }
}
