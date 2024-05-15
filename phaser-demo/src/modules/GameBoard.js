import { CardHandler, Card } from './CardHandler'
import { PlaymatHandler, Playmat } from './PlaymatHandler'

export class GameBoard {
  cardSetting
  playmatSetting
  playmat
  cardDecks
  phases
  nowPhase

  constructor({ cardFields, playmatFields, phases = ['Stand', 'End'], decks = [] }) {
    this.cardSetting = new CardHandler(cardFields)

    this.cardDecks = decks.map((deck) => {
      return new Card(this.cardSetting.getDefinition(), deck)
    })

    this.playmatSetting = new PlaymatHandler(playmatFields)
    this.playmat = new Playmat(this.playmatSetting.getDefinition())

    this.phases = phases
    this.nowPhase = this.phases[0]
  }

  // action
  init() {
    this.nowPhase = this.phases[0]
    this.playmat.reset()
    this.playmat
      .where('Deck')
      .addCards(this.cardDecks.map((card) => card.setStatus(['stand', 'back'])))
  }

  // phase
  nextPhase() {
    let index = this.phases.indexOf(this.nowPhase)
    if (index < this.phases.length - 1) {
      this.nowPhase = this.phases[index + 1]
    } else {
      this.nowPhase = this.phases[0]
    }
  }
}
