export class GameBoard {
  phases = ['Stand', 'Draw', 'Clock', 'Main', 'Climax', 'Attack', 'End']
  nowPhase = ''

  constructor() {
    this.nowPhase = this.phases[0]
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

  // playmat
  goTo(from, to) {}
}
