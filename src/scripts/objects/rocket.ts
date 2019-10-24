export default class Rocket extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'flares')
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.scale = 0.2;
    this.setVelocity(this.getSpeedX(),-Math.random()*400-400)
  }

  getSpeedX():integer {
    const sign = Math.round(Math.random()) * 2 - 1;
    return (Math.floor(Math.random()*200)+50) * sign;
  }

}
