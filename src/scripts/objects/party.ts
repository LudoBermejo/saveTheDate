export default class TextDate extends Phaser.GameObjects.Text {
  content: Array<string>
  line: Array<string>
  wordIndex: integer
  lineIndex: integer
  wordDelay: integer
  lineDelay: integer

  timerWord: number

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    originalText: string,
    fontSize: string = '90px'
  ) {
    super(scene, 0, 0, originalText, {
      fontFamily: 'Arial',
      fontSize,
      color: '#EC68B5',
      align: 'center'
    })
    this.x = x - this.width / 2
    this.rotation = 45
    this.y = y
    this.text = ''
    this.content = [originalText]
    this.line = []

    this.wordIndex = 0
    this.lineIndex = 0

    this.wordDelay = 1000
    this.lineDelay = 400

    scene.add.existing(this)
  }

  nextLine() {
    if (this.lineIndex === this.content.length) {
      this.emit('COMPLETED')
      return
    }

    this.line = this.content[this.lineIndex].split(' ')

    this.wordIndex = 0

    this.timerWord = window.setInterval(
      this.nextWord.bind(this),
      this.wordDelay,
      this.line.length
    )
    this.lineIndex++
  }

  public start() {
    this.nextLine()
  }

  nextWord() {
    this.text = this.text.concat(this.line[this.wordIndex] + ' ')
    this.scene.sound.play('stamp')
    this.wordIndex++

    console.log(this.line.length)
    if (this.wordIndex === this.line.length) {
      console.log('LLEGO')
      clearInterval(this.timerWord)
      this.text = this.text.concat('\n')
      this.nextLine()
    }
  }
}
