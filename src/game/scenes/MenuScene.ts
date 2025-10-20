import Phaser from 'phaser'

export default class MenuScene extends Phaser.Scene {
  constructor(){ super('menu') }
  create(){
    const { width: w, height: h } = this.scale

    this.add.text(w/2, 90, 'River Rescue', { fontSize: '48px', color: '#7fd1ff' }).setOrigin(0.5)
    this.add.text(w/2, 130, 'Clean the Mekong!', { fontSize: '24px', color: '#7cffc0' }).setOrigin(0.5)

    const play = this._btn(w/2, 220, '▶ Play', () => this.scene.start('play'))
    this._btn(w/2, 270, 'ℹ About the Issue', () => this._about())
    this._btn(w/2, 320, '📊 Stats (local)', () => this._stats())

    this.time.addEvent({ delay: 600, loop: true, callback: () => play.setVisible(!play.visible) })

    const story = [
      "Every year, millions of tons of plastic flow into Vietnam's rivers —",
      'harming marine life and coastal communities.',
      '',
      "You're part of the River Rescue team! Navigate the river,",
      'collect trash, and avoid hazards. Can you clean the river',
      'before time runs out?'
    ].join('\n')
    this.add.text(w/2, 400, story, { fontSize: '16px', color:'#ccefff', align:'center' }).setOrigin(0.5)
    this.add.text(w/2, 480, 'Hold Space / Mouse to go up · Release to fall', { fontSize: '14px', color:'#9cd7ff' }).setOrigin(0.5)
  }

  private _btn(x:number, y:number, label:string, onClick: () => void){
    const t = this.add.text(x, y, label, { fontSize:'20px', backgroundColor:'#102a3a', color:'#e9f7ff', padding:{ left:8, right:8, top:6, bottom:6 }}).setOrigin(0.5).setInteractive({ useHandCursor:true })
    t.on('pointerover', () => t.setStyle({ backgroundColor:'#163e57'}))
    t.on('pointerout',  () => t.setStyle({ backgroundColor:'#102a3a'}))
    t.on('pointerdown', onClick)
    return t
  }

  private _about(){
    const msg = [
      'Plastic waste in Vietnam is estimated at ~3.7M tons annually.',
      'Reduce single-use plastics, recycle, and join local clean-ups.'
    ].join('\n')
    this.add.rectangle(0,0,this.scale.width,this.scale.height,0x000000,0.6).setOrigin(0)
    this.add.text(this.scale.width/2, this.scale.height/2, msg, { fontSize:'16px', color:'#ffffff', backgroundColor:'#102a3a', padding:{ left:10, right:10, top:10, bottom:10 }, align:'center' }).setOrigin(0.5).setInteractive().on('pointerdown', () => this.scene.restart())
  }

  private _stats(){
    const best = localStorage.getItem('rr_best') || '0'
    const cleaned = localStorage.getItem('rr_cleaned_total') || '0'
    const msg = `Best Score: ${best}\nTotal Trash Collected: ${cleaned}`
    this.add.rectangle(0,0,this.scale.width,this.scale.height,0x000000,0.6).setOrigin(0)
    this.add.text(this.scale.width/2, this.scale.height/2, msg, { fontSize:'18px', color:'#7fd1ff', backgroundColor:'#0b1520', padding:{ left:10, right:10, top:10, bottom:10 }, align:'center' }).setOrigin(0.5).setInteractive().on('pointerdown', () => this.scene.restart())
  }
}
