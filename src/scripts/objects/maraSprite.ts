export default class MaraSprite extends Phaser.Physics.Arcade.Sprite {
  originalX: number
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'maraSprite')
    this.originalX = x
    scene.add.existing(this)
    this.scale = 5
    this.x = x
    this.y = y
    scene.anims.create({
      key: 'travolta',
      frames: [
        {
          key: 'maraSprite',
          frame: 4,
          duration: 1500
        },
        {
          key: 'maraSprite',
          frame: 8,
          duration: 1500
        }
      ],
      delay: 500,
      repeat: 5000
    })
    scene.anims.create({
      key: 'stopMara',
      frames: scene.anims.generateFrameNames('maraSprite', { start: 0, end: 0 })
    })
    scene.anims.create({
      key: 'downMara',
      frames: scene.anims.generateFrameNames('maraSprite', {
        start: 0,
        end: 3
      }),
      repeat: -1
    })
    scene.anims.create({
      key: 'leftMara',
      frames: scene.anims.generateFrameNames('maraSprite', {
        start: 4,
        end: 7
      }),
      repeat: -1
    })

    scene.anims.create({
      key: 'rightMara',
      frames: scene.anims.generateFrameNames('maraSprite', {
        start: 8,
        end: 11
      }),
      repeat: -1
    })

    scene.anims.create({
      key: 'up',
      frames: scene.anims.generateFrameNames('maraSprite', {
        start: 12,
        end: 15
      }),
      repeat: -1
    })
  }

  public gotoCenter() {
    const tween = this.scene.tweens.add({
      targets: this,
      props: {
        x: {
          value: 100
        }
      },
      // alpha: { start: 0, to: 1 },
      // alpha: 1,
      // alpha: '+=1',
      ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 3000,
      repeat: 0, // -1: infinity
      yoyo: false,
      onComplete: () => {
        this.play('stopMara')
        this.emit('COMPLETE')
      }
    })
  }

  public exit() {
    this.play('rightMara')
    const tween = this.scene.tweens.add({
      targets: this,
      props: {
        x: {
          value: this.originalX + 200
        }
      },
      // alpha: { start: 0, to: 1 },
      // alpha: 1,
      // alpha: '+=1',
      ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 1000,
      repeat: 0, // -1: infinity
      yoyo: false,
      onComplete: () => {
        this.play('stopMara')
        this.emit('COMPLETE_EXIT')
      }
    })
  }
}
