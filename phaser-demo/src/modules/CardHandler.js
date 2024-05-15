export class Card {
  base = {}

  info = {
    status: ['stand', 'front'], // [0] is (stand, rest, reverse), [1] is (front, back)
    position: 'Deck' // playmat position
  }

  constructor(defintion = {}, data = {}) {
    Object.keys(defintion).forEach((key) => {
      this.base[key] = data[key] || defintion[key]
    })
  }

  setStatus(status) {
    let first = ['stand', 'rest', 'reverse']
    let second = ['front', 'back']

    if (Array.isArray(status) && status.length === 2) {
      this.info.status = status
      return
    }

    if (first.includes(status)) {
      this.info.status[0] = status
    }
    if (second.includes(status)) {
      this.info.status[1] = status
    }
  }

  resetStatus() {
    this.info.status = ['stand', 'front']
  }

  setPosition(position) {
    this.info.position = position
  }
}

export class CardHandler {
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
