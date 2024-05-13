import { EventBus } from '../EventBus'
import { Scene } from 'phaser'

export class Game extends Scene {
  platforms
  player
  cursor
  stars

  constructor() {
    super('Game')
  }

  create() {
    // this.cameras.main.setBackgroundColor(0x00ff00)

    this.add.image(512, 384, 'background').setAlpha(0.5)

    // platform
    this.platforms = this.physics.add.staticGroup()

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody()

    this.platforms.create(600, 400, 'ground')
    this.platforms.create(50, 250, 'ground')
    this.platforms.create(750, 220, 'ground')

    // player
    this.player = this.physics.add.sprite(100, 450, 'dude')

    this.player.setBounce(0.2)
    this.player.setCollideWorldBounds(true)
    this.player.body.setGravityY(300)

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    })

    // star
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 110,
      setXY: { x: 12, y: 0, stepX: 7 }
    })

    this.stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    })

    // collision
    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.stars, this.platforms)
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)

    // cursor
    this.cursors = this.input.keyboard.createCursorKeys()

    EventBus.emit('current-scene-ready', this)
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160)
      this.player.anims.play('left', true)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160)
      this.player.anims.play('right', true)
    } else {
      this.player.setVelocityX(0)
      this.player.anims.play('turn')
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-500)
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true)
  }

  changeScene() {
    this.scene.start('GameOver')
  }
}
