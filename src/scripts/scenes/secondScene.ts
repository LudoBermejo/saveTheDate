import Rocket from '../objects/rocket'
import Fireworks from '../objects/firework'
import LudoSprite from '../objects/ludoSprite'
import MaraSprite from '../objects/maraSprite'

import Dialog from '../objects/dialog'
import { throws } from 'assert'

export default class SecondScene extends Phaser.Scene {
  rockets: Array<Rocket>
  ludoSprite: LudoSprite
  maraSprite: MaraSprite

  dialogLudo: Dialog
  dialogMara: Dialog
  dialogCorifeo1: Dialog
  dialogCorifeo2: Dialog
  dialogCorifeo3: Dialog
  dialogFinal: Dialog

  constructor() {
    super({ key: 'SecondScene' })
    this.rockets = []
  }

  createRockets() {
    setTimeout(() => {
      const rocket = new Rocket(
        this,
        this.cameras.main.width / 2,
        this.cameras.main.height
      )
      this.createRockets()
      this.rockets.push(rocket)
    }, Math.random() * 1000)
  }

  create() {
    this.ludoSprite = new LudoSprite(
      this,
      this.cameras.main.width,
      this.cameras.main.height - 100
    )
    this.ludoSprite.play('left')

    this.ludoSprite.gotoCenter()
    this.ludoSprite.on('COMPLETE', () => {
      this.dialogLudo = new Dialog(this, {
        forceX: 0,
        padding: 180,
        forceY: 0
      })

      this.dialogLudo.setText([
        { text: 'Hello guys!' },
        { text: 'Mara and me have been working on...' },
        { text: 'mmm...' },
        { text: 'Mara? Where are you?' },
        { text: '... Mara?' },
        { text: '...', wait: 8000 },
        { text: '... ok' },
        { text: 'so... let me do it by myself' },
        { text: 'We have been thinking about this release' },
        {
          text:
            'You know... all the effort, the deadlines, the event calendar...'
        },
        { text: 'And we have concluded something' },
        { text: 'You are amazing!', wait: 500 },
        { wait: 3000 },
        { text: '... ok. Focus, please. Focus.' },
        { text: 'We want to thank your effort' },
        { text: 'So on November, the 4th...', wait: 500 },
        { wait: 6000 },
        { text: 'FOCUS! Please! FOCUS!' },
        { text: 'Ok... again...' },
        { text: 'You are amazing and we must celebrate it...' },
        { text: 'So, ladies and gentlemen' },
        { text: 'On November, the 4th...' },
        { text: 'We will do...' },
        { text: 'A HACKATON!!!!!!!!', wait: 100 },
        { wait: 4000 },
        { text: 'AN A DINNER!!!!!!!!!!', wait: 500 },
        { wait: 5000 },
        { text: 'So please... save the date' },
        { text: 'November the 4th' },
        { text: 'Remember it!!' },
        { text: 'And now, have a good day!' },
        { text: 'Hasta luego!', wait: 3000 },
        { text: '' }
      ])

      this.dialogLudo.on('COMPLETE_LINE', line => {
        if (line === 2) {
          this.ludoSprite.play('travolta')
        }
        if (line === 5) {
          this.dialogMara = new Dialog(this, {
            padding: 400,
            forceX: 600,
            forceY: 200
          })

          this.dialogMara.setText([
            { text: 'No!!' },
            { text: 'I dont want to go outside!!' },
            { text: 'It is embarrasing!!!' }
          ])
        }

        if (line === 6) {
          this.dialogMara.destroy()
          this.ludoSprite.play('stop')
        }

        if (line === 12) {
          this.dialogMara = new Dialog(this, {
            padding: 400,
            forceX: 600,
            forceY: 200
          })

          this.dialogMara.setText([{ text: 'No! You are amazing! (tm)' }])
        }
        if (line === 13) {
          this.dialogMara.destroy()
        }
        if (line === 16) {
          this.dialogMara = new Dialog(this, {
            padding: 400,
            forceX: 600,
            forceY: 200
          })

          this.dialogMara.setText([
            { text: 'On monday?' },
            { text: `After Sunday's hangover?` }
          ])
        }
        if (line === 17) {
          this.dialogMara.destroy()
        }

        if (line === 23) {
          this.createRockets()
        }
        if (line === 24) {
          this.dialogCorifeo1 = new Dialog(this, {
            padding: 475,
            forceX: 100,
            forceY: 0
          })

          this.dialogCorifeo1.setText([
            { text: 'WTF?' },
            { wait: 3000 },
            { text: `Ok, cool enough` }
          ])
          this.dialogCorifeo2 = new Dialog(this, {
            padding: 475,
            forceX: 450,
            forceY: 50
          })

          this.dialogCorifeo2.setText([
            { text: 'Are you kidding me?' },
            { wait: 3000 },
            { text: `Sure, that's better` }
          ])

          this.dialogCorifeo3 = new Dialog(this, {
            padding: 450,
            forceX: 800,
            forceY: 75
          })

          this.dialogCorifeo3.setText([
            { text: `More work...` },
            { wait: 3000 },
            { text: `Beer and wine included?` }
          ])
        }

        if (line === 27) {
          this.dialogCorifeo1.destroy()
          this.dialogCorifeo2.destroy()
          this.dialogCorifeo3.destroy()
        }
        if (line === 32) {
          this.ludoSprite.exit()
          this.dialogLudo.destroy()
          this.ludoSprite.on('COMPLETE_EXIT', () => {
            this.dialogMara = new Dialog(this, {
              padding: 400,
              forceX: 600,
              forceY: 200
            })

            this.dialogMara.setText([
              { text: 'Oh, no!' },
              { text: 'He totally forgot it!' },
              { text: '...' },
              { text: 'Ok, Mara, you can do it!', wait: 4000 },
              { text: '' }
            ])
            this.dialogMara.on('COMPLETE_LINE', line => {
              if (line === 4) {
                this.dialogMara.visible = false
                this.dialogMara.destroy()
                this.maraSprite = new MaraSprite(
                  this,
                  this.cameras.main.width,
                  this.cameras.main.height - 100
                )
                this.maraSprite.play('leftMara')
                this.maraSprite.gotoCenter()

                this.maraSprite.on('COMPLETE', () => {
                  this.dialogFinal = new Dialog(this, {
                    forceX: 0,
                    padding: 180,
                    forceY: 0
                  })

                  this.dialogFinal.setText([
                    { text: 'Ok...' },
                    { text: 'mmm...' },
                    { text: 'Oh boy...' },
                    { text: 'I... er... want... err' },
                    {
                      text:
                        'I WILL SHARE WITH YOU THE ADDRESS WHEN I HAVE ONE!!!!!!!'
                    },
                    { text: 'BYE!', wait: 3000 },
                    { text: '' }
                  ])
                  this.dialogFinal.on('COMPLETE_LINE', line => {
                    if (line === 5) {
                      this.dialogFinal.visible = false
                      this.dialogFinal.destroy()
                      this.maraSprite.exit()
                      this.maraSprite.on('COMPLETE_EXIT', () => {
                        setTimeout(() => {
                          this.scene.start('FinalScene')
                        }, 2000)
                      })
                    }
                  })
                })
              }
            })
          })
        }
      })

      this.dialogLudo.on('COMPLETE_LINE', line => {})
    })
  }

  update() {
    this.rockets.forEach((rocket, index) => {
      if (rocket.body.velocity.y > 0) {
        new Fireworks(this, rocket.body.x, rocket.body.y)
        rocket.destroy()
        this.rockets.splice(index, 1)
      }
    })
  }
}
//
