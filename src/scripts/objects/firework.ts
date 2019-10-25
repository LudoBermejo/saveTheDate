export default class Firework {
  particleManager: Phaser.GameObjects.Particles.ParticleEmitterManager
  particleEmitterLong: Phaser.GameObjects.Particles.ParticleEmitter

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.particleManager = scene.add.particles('flares')
    this.particleEmitterLong = this.particleManager.createEmitter({
      accelerationX: 10,
      accelerationY: 10,
      frame: ['red', 'blue', 'green', 'yellow'],
      x,
      y,
      speed: [200, 175, 150, 125, 100],
      lifespan: 2000,
      gravityY: 290,
      quantity: 5,
      blendMode: 'SCREEN',
      scale: 0.2,
      maxParticles: 80,
      alpha: { start: 1, end: 0 }
    })

    scene.time.delayedCall(
      3000,
      () => {
        this.particleManager.destroy()
      },
      [],
      this
    )

    this.particleEmitterLong.explode(100, x, y)
  }
}
