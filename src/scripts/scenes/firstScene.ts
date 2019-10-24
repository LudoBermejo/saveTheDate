import Text from '../objects/text'

export default class FirstScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text
  constructor() {
    super({ key: 'FirstScene' })
  }

  create() {
    const date = new Text(this, this.cameras.main.width / 2, this.cameras.main.height/2 -100, 'On November the 4th');
    const saveTheDate = new Text(this, this.cameras.main.width / 2, this.cameras.main.height/2, 'Save the date!!', '120px');
    date.on('COMPLETED', () => {
      saveTheDate.start();
    })
    saveTheDate.on('COMPLETED', () => {
      setTimeout(() => {
        this.scene.start('SecondScene')
      }, 2000);
    })
    date.start();
  }
}