export class CardList {
  name = ''
  cards = []

  constructor(cards, name = '') {
    this.cards = cards
    this.name = name
  }

  // head (old) -> [0,1,2,3,4,5] <- tail (new)
  // getIndex(-1) -> 5

  getIndex(index) {
    if (index < 0) {
      return this.cards[this.cards.length + index]
    } else return this.cards[index]
  }

  addCard(card, index) {
    card.setPosition(this.name)

    if (index === undefined) {
      this.cards.push(card)
    } else {
      // [0,1,2,3]
      // index = 1 add 9, [0,9,1,2,3]
      // index = -1 add 9, [0,1,2,9,3]
      this.cards.splice(index, 0, card)
    }
  }

  addCards(cards, index) {
    cards.forEach((card) => {
      card.setPosition(this.name)
    })

    if (index === undefined) {
      this.cards = this.cards.concat(cards)
    } else {
      // [0,1,2,3]
      // index = 1 add [8,9], [0,8,9,1,2,3]
      // index = -1 add [8,9], [0,1,2,8,9,3]
      this.cards.splice(index, 0, ...cards)
    }
  }

  removeCard(index) {
    this.cards.splice(index, 1)
  }

  setStatus(status, index) {
    if (index === undefined) {
      this.cards.forEach((card) => {
        card.setStatus(status)
      })
    } else {
      let id = index < 0 ? this.cards.length + index : index
      this.cards[id].setStatus(status)
    }
  }
}

export class Playmat {
  base = {
    Hand: new CardList([], 'Hand'),
    Deck: new CardList([], 'Deck'),
    StandBy: new CardList([], 'StandBy')
  }

  constructor(defintion = {}, data = {}) {
    Object.keys(defintion).forEach((key) => {
      this.base[key] = new CardList(data[key] || defintion[key], key)
    })
  }

  where(pos) {
    return this.base[pos] || null
  }
}

export class PlaymatHandler {
  fields = {}

  constructor(setting) {
    if (setting) {
      this.fields = setting
    }
  }

  addField(name, value) {
    this.fields[name] = value
  }

  getFields() {
    return Object.keys(this.fields)
  }

  getDefinition() {
    return this.fields
  }
}
