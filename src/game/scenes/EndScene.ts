import Phaser from 'phaser'

function pick<T>(a:T[]) { return a[Math.floor(Math.random() * a.length)] }

export default class EndScene extends Phaser.Scene {
  private final!: { score:number; collected:number; cleanPct:number }
  constructor(){ super('end') }
  init(data:any){ this.final = data }
  create(){
    const { width:w } = this.scale
    this.add.text(w/2, 120, 'Mission Complete!', { fontSize:'40px', color:'#7fd1ff' }).setOrigin(0.5)
    this.add.text(w/2, 180, `Score: ${this.final.score}    Trash Collected: ${this.final.collected}`, { fontSize:'20px' }).setOrigin(0.5)
    this.add.text(w/2, 220, `River Cleanliness: ${this.final.cleanPct}%`, { fontSize:'20px', color:'#7cffc0' }).setOrigin(0.5)

    const facts = [
      'Vietnam discards ~3.7M tons of plastic annually — you just cleaned some (virtually)!',
      'The Mekong is among the most biodiverse rivers; keeping it clean protects countless species.',
      'Reducing single-use plastics and recycling can dramatically lower river pollution.',
      'Community clean-ups and proper waste sorting make a real difference!'
    ]
    this.add.text(w/2, 280, pick(facts), { fontSize:'16px', color:'#ccefff', align:'center', wordWrap: { width: 700 }}).setOrigin(0.5)

    const again = this.add.text(w/2, 360, '▶ Replay', { fontSize:'22px', backgroundColor:'#102a3a', padding:{ left:10, right:10, top:6, bottom:6 } }).setOrigin(0.5).setInteractive({ useHandCursor:true })
    again.on('pointerdown', () => this.scene.start('play'))
    const menu = this.add.text(w/2, 410, '⟲ Menu', { fontSize:'18px', backgroundColor:'#102a3a', padding:{ left:8, right:8, top:5, bottom:5 } }).setOrigin(0.5).setInteractive({ useHandCursor:true })
    menu.on('pointerdown', () => this.scene.start('menu'))
  }
}
