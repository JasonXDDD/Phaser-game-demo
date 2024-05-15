import { CardHandler, Card } from '../../modules/CardHandler'
import { PlaymatHandler, Playmat } from '../../modules/PlaymatHandler'
import { EventBus } from '../EventBus'
import { Scene } from 'phaser'

export class GameOver extends Scene {
  card
  constructor() {
    super('GameOver')
  }

  create() {
    this.cardSetting = new CardHandler({
      name: '',
      attack: 0,
      defense: 0
    })

    this.cardDecks = [
      new Card(this.cardSetting.getDefinition(), { name: 'Card 1', attack: 10, defense: 20 }),
      new Card(this.cardSetting.getDefinition(), { name: 'Card 2', attack: 20, defense: 10 }),
      new Card(this.cardSetting.getDefinition(), { name: 'Card 3', attack: 30, defense: 30 })
    ]

    console.log(this.cardDecks)

    this.playmatSetting = new PlaymatHandler({
      CL: [],
      CC: [],
      CR: [],
      BL: [],
      BR: [],
      Stock: [],
      Climax: [],
      Level: [],
      Clock: [],
      Memory: [],
      Waiting: []
    })
    this.playmat = new Playmat(this.playmatSetting.getDefinition())

    this.playmat.where('CL').addCards(this.cardDecks)

    this.playmat.where('CL').setStatus('back')
    console.log(this.playmat)

    // Phaser
    this.cameras.main.setBackgroundColor(0xff0000)

    this.add.image(512, 384, 'background').setAlpha(0.5)

    this.add
      .text(512, 384, 'Game Over', {
        fontFamily: 'Arial Black',
        fontSize: 64,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center'
      })
      .setOrigin(0.5)
      .setDepth(100)

    EventBus.emit('current-scene-ready', this)
  }

  changeScene() {
    this.scene.start('MainMenu')
  }
}
