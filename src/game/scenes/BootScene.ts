import Phaser from 'phaser'
import { ASSETS } from '../assets'

export default class BootScene extends Phaser.Scene {
  constructor() { super('boot') }
  preload() {
    // Load replaceable images
    this.load.image('boat', ASSETS.boat)
    this.load.image('bottle', ASSETS.bottle)
    this.load.image('can', ASSETS.can)
    this.load.image('bag', ASSETS.bag)
    this.load.image('log', ASSETS.log)
    this.load.image('net', ASSETS.net)
    this.load.image('sub', ASSETS.sub)
    this.load.image('magnet', ASSETS.magnet)
    this.load.image('shield', ASSETS.shield)
    this.load.image('time', ASSETS.time)

    ASSETS.backgrounds.forEach((p, i) => this.load.image('bg' + i, p))
  }
  create() {
    this.scene.start('menu')
  }
}
