import Phaser from 'phaser'
import { GAME_W, GAME_H } from './settings'
import BootScene from './scenes/BootScene'
import MenuScene from './scenes/MenuScene'
import PlayScene from './scenes/PlayScene'
import EndScene from './scenes/EndScene'

export function initGame(parent: HTMLElement) {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent,
    width: GAME_W,
    height: GAME_H,
    pixelArt: true,
    physics: { default: 'arcade', arcade: { gravity: { x: 0, y: 0 }, debug: false } },
    scene: [BootScene, MenuScene, PlayScene, EndScene]
  }
  return new Phaser.Game(config)
}

export function destroyGame(game?: Phaser.Game) {
  if (game) game.destroy(true)
}
