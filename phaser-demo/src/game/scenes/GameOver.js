import { GameBoard } from '../../modules/GameBoard'
import { ActionInterpreter } from '../../modules/ActionInterpreter'
import { EventBus } from '../EventBus'
import { Scene } from 'phaser'

export class GameOver extends Scene {
  constructor() {
    super('GameOver')
  }

  create() {
    this.gameBoard = new GameBoard({
      cardFields: {
        name: '',
        attack: 0,
        defense: 0
      },
      playmatFields: {
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
      },
      decks: [
        { name: 'Card 1', attack: 10, defense: 20 },
        { name: 'Card 2', attack: 20, defense: 10 },
        { name: 'Card 3', attack: 30, defense: 30 }
      ],
      phases: ['Stand', 'Draw', 'Clock', 'Main', 'Climax', 'Attack', 'End']
    })

    console.log(this.gameBoard)

    this.interpreter = new ActionInterpreter()
    this.interpreter.input('if(%=:Reverse)P(C!@):Rest:Rest:Rest:Back;_>[Deck,Deck$,Waiting]')
    let a = this.interpreter.input(
      'P4(Deck^4)>StandBy;x=f(G.StandBy={type=Climax});StandBy>Waiting;Px(Deck)>Hand'
    )

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
