export default class Rocket extends Phaser.GameObjects.Graphics {
  animate: boolean
  borderThickness: number
  borderColor: number
  borderAlpha: number
  windowAlpha: number
  windowColor: number
  windowHeight: number
  padding: number
  closeBtnColor: string
  dialogSpeed: number
  eventCounter: number
  text: Phaser.GameObjects.Text
  dialog: string[]
  graphics: Phaser.GameObjects.Graphics
  closeBtn: Object
  timedEvent: Phaser.Time.TimerEvent
  restOfConfig: object[]
  currentLine: integer
  forceX: number
  forceY: number
  currentConf: Object

  constructor(
    scene: Phaser.Scene,
    conf: { forceX: number; forceY: number; padding: number }
  ) {
    super(scene)
    // Check to see if any optional parameters were passed
    // set properties from opts object or use defaults
    this.borderThickness = 3
    this.borderColor = 0x907748
    this.borderAlpha = 1
    this.windowAlpha = 1
    this.windowColor = 0x303030
    this.windowHeight = 150
    this.forceY = conf.forceY
    this.forceX = conf.forceX
    this.padding = this.getPadding(conf.padding)
    this.closeBtnColor = 'darkgoldenrod'
    this.dialogSpeed = 3
    this.animate = true
    this.currentLine = -1

    // used for animating the text
    this.eventCounter = 0
    // if the dialog window is shown
    this.visible = true
    // the current text in the window
    this.text
    // the text that will be displayed in the window
    this.dialog
    this.closeBtn
    this.createWindow()
  }

  getPadding(padding: number = 0): number {
    if (padding < 0) {
      return this.getGameWidth() + padding
    }
    return padding
  }
  // Gets the width of the game (based on the scene)
  getGameWidth(): number {
    return Number(this.scene.sys.game.config.width)
  }

  // Gets the height of the game (based on the scene)
  getGameHeight(): number {
    return Number(this.scene.sys.game.config.height)
  }

  // Calculates where to place the dialog window based on the game size
  calculateWindowDimensions(width: number, height: number) {
    const x = this.forceX || this.padding
    const y = this.forceY || height - this.windowHeight - this.padding
    const rectWidth = width - this.padding * 2
    const rectHeight = this.windowHeight
    return {
      x,
      y,
      rectWidth,
      rectHeight
    }
  }

  // Creates the inner dialog window (where the text is displayed)
  createInnerWindow(
    x: number,
    y: number,
    rectWidth: number,
    rectHeight: number
  ) {
    this.graphics.fillStyle(this.windowColor, this.windowAlpha)
    this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1)
  }

  // Creates the border rectangle of the dialog window
  createOuterWindow(
    x: number,
    y: number,
    rectWidth: number,
    rectHeight: number
  ) {
    this.graphics.lineStyle(
      this.borderThickness,
      this.borderColor,
      this.borderAlpha
    )
    this.graphics.strokeRect(x, y, rectWidth, rectHeight)
  }

  getSpeedX(): integer {
    const sign = Math.round(Math.random()) * 2 - 1
    return (Math.floor(Math.random() * 200) + 50) * sign
  }

  // Creates the dialog window
  createWindow() {
    const gameHeight: number = this.getGameHeight()
    const gameWidth: number = this.getGameWidth()
    const dimensions = this.calculateWindowDimensions(gameWidth, gameHeight)
    this.graphics = this.scene.add.graphics()

    this.createOuterWindow(
      dimensions.x,
      dimensions.y,
      dimensions.rectWidth,
      dimensions.rectHeight
    )
    this.createInnerWindow(
      dimensions.x,
      dimensions.y,
      dimensions.rectWidth,
      dimensions.rectHeight
    )
  }

  waitForNextLine() {
    this.timedEvent.remove()
    this.timedEvent = this.scene.time.addEvent({
      delay: this.currentConf['wait'] || 2000,
      callback: () => this.setText(this.restOfConfig),
      callbackScope: this,
      repeat: 1
    })
  }
  // Slowly displays the text in the window to make it appear annimated
  animateText() {
    this.eventCounter++
    this.text.setText(this.text.text + this.dialog[this.eventCounter - 1])
    if (this.eventCounter === this.dialog.length) {
      this.waitForNextLine()
    }
  }

  public setText(conf: object[]) {
    this.restOfConfig = conf
    if (conf.length) {
      this.currentLine++
      if (this.currentLine > 0) {
        this.emit('COMPLETE_LINE', this.currentLine)
      }
      this.currentConf = Object(conf.shift())
      if (!this.currentConf['text']) {
        this.waitForNextLine()
        return
      }
      const line: string = this.currentConf['text']
      // Reset the dialog
      this.eventCounter = 0
      this.dialog = line.split('')
      if (this.timedEvent) this.timedEvent.remove()

      const tempText = this.animate ? '' : line
      this._setText(tempText)

      if (this.animate) {
        this.timedEvent = this.scene.time.addEvent({
          delay: 150 - this.dialogSpeed * 30,
          callback: this.animateText,
          callbackScope: this,
          loop: true
        })
      }
    }
  }

  public destroy() {
    this.graphics.destroy()
    this.text.destroy()
  }

  // Calcuate the position of the text in the dialog window
  _setText(text: string) {
    // Reset the dialog
    if (this.text) this.text.destroy()

    const x = (this.forceX || this.padding) + 10
    const y =
      (this.forceY || this.getGameHeight() - this.windowHeight - this.padding) +
      10

    this.text = this.scene.make.text({
      x,
      y,
      text,
      style: {
        font: '60px pixelFont',
        wordWrap: { width: this.getGameWidth() - this.padding * 2 - 25 }
      }
    })
  }
}
