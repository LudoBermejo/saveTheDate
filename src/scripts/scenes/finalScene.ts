import Text from '../objects/text'

export default class FinalScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text
  constructor() {
    super({ key: 'FinalScene' })
  }

  create() {
    const first = new Text(
      this,
      this.cameras.main.width / 2,
      this.cameras.main.height / 2 - 100,
      'Thanks for watching'
    )
    const second = new Text(
      this,
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'You can download the code at'
    )
    const third = new Text(
      this,
      this.cameras.main.width / 2,
      this.cameras.main.height / 2 + 100,
      'https://github.com/LudoBermejo/saveTheDate',
      '50px'
    )
    first.on('COMPLETED', () => {
      second.start()
    })
    second.on('COMPLETED', () => {
      third.start()
    })
    first.start()
  }
}
