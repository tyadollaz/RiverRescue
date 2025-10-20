import Phaser from 'phaser'
import { GAME_W, GAME_H, RUN_TIME, SCORE_VALUES, HIT_PENALTY, TIME_BOOST, CLEAN_THRESHOLDS } from '../settings'

const rand = (min:number, max:number) => Math.random() * (max - min) + min
const pick = <T,>(a:T[]) => a[Math.floor(Math.random() * a.length)]

export default class PlayScene extends Phaser.Scene {
  private boat!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
  private trash!: Phaser.Physics.Arcade.Group
  private obstacles!: Phaser.Physics.Arcade.Group
  private powerups!: Phaser.Physics.Arcade.Group
  private hud!: Phaser.GameObjects.Text
  private timeLeft = RUN_TIME
  private score = 0
  private collected = 0
  private cleanStage = 0
  private magnetOn = false
  private shieldOn = false
  private bg!: Phaser.GameObjects.TileSprite

  constructor(){ super('play') }

  create(){
    const { width:w, height:h } = this.scale

    // Background uses replaceable images per cleanliness stage
    this.bg = this.add.tileSprite(0, 0, w, h, 'bg0').setOrigin(0)

    // Player boat
    this.boat = this.physics.add.image(150, h/2, 'boat').setOrigin(0.5).setScale(1.5).setCollideWorldBounds(true)
    this.boat.body.setGravityY(500)

    this.trash = this.physics.add.group()
    this.obstacles = this.physics.add.group()
    this.powerups = this.physics.add.group()

    this.physics.add.overlap(this.boat, this.trash, (boat, item) => this.collectTrash(item as Phaser.Physics.Arcade.Image))
    this.physics.add.overlap(this.boat, this.powerups, (boat, p) => this.collectPower(p as Phaser.Physics.Arcade.Image))
    this.physics.add.overlap(this.boat, this.obstacles, () => this.hitObstacle())

    // Input
    const space = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.input.on('pointerdown', () => this.thrust(true))
    this.input.on('pointerup',   () => this.thrust(false))

    // HUD
    this.hud = this.add.text(12, 8, '', { fontSize: '16px', color:'#e9f7ff' }).setDepth(10)

    // Timers
    this.time.addEvent({ delay: 800, loop: true, callback: () => this.spawnWave() })
    this.time.addEvent({ delay: 6000, loop: true, callback: () => this.spawnPower() })
    this.time.addEvent({ delay: 1000, loop: true, callback: () => this.tick() })

    // Spacebar control each frame
    this.events.on('update', () => this.thrust(space.isDown))
  }

  update(){
    this.bg.tilePositionX += 0.9
  }

  private thrust(on:boolean){
    if (on) this.boat.setAccelerationY(-900)
    else this.boat.setAccelerationY(0)
  }

  private tick(){
    this.timeLeft--
    if (this.timeLeft <= 0) this.end()
    const pct = Math.min(100, Math.floor((this.score / CLEAN_THRESHOLDS[CLEAN_THRESHOLDS.length-1]) * 100))
    this.hud.setText(`Score: ${this.score}    Trash: ${this.collected}    Time: ${this.timeLeft}s${this.magnetOn ? '   [Turbo Cleaner]' : ''}${this.shieldOn ? '   [Eco Shield]' : ''}\nRiver Cleanliness: ${pct}%`)
  }

  private spawnWave(){
    const { width:w, height:h } = this.scale
    const y = rand(60, h-60)
    const types = ['bottle','can','bag','trashPair','obstacle','trashRow']
    const t = pick(types)
    if (t === 'trashPair') {
      this.spawnTrash(w + 20, y - 30, pick(['bottle','can','bag']))
      this.spawnTrash(w + 20, y + 30, pick(['bottle','can','bag']))
    } else if (t === 'trashRow') {
      for (let i=0;i<3;i++) this.spawnTrash(w + 20 + i*18, rand(80, h-80), pick(['bottle','can','bag']))
    } else if (t === 'obstacle') {
      this.spawnObstacle(w + 30, y, pick(['log','net','sub']))
    } else {
      this.spawnTrash(w + 20, y, t as string)
    }
  }

  private spawnTrash(x:number, y:number, key:string){
    const s = this.trash.create(x, y, key).setOrigin(0.5).setScale(1.5) as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    s.body.allowGravity = false
    s.body.velocity.x = -rand(120, 200)
    s.setData('type', key)
  }

  private spawnObstacle(x:number, y:number, key:string){
    const s = this.obstacles.create(x, y, key).setOrigin(0.5).setScale(1.5) as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    s.body.allowGravity = false
    s.body.velocity.x = -rand(160, 230)
  }

  private spawnPower(){
    const { width:w, height:h } = this.scale
    const key = pick(['magnet','shield','time'])
    const s = this.powerups.create(w + 20, rand(70, h-70), key).setOrigin(0.5).setScale(1.5) as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    s.body.allowGravity = false
    s.body.velocity.x = -rand(130, 190)
  }

  private collectTrash(item: Phaser.Physics.Arcade.Image){
    const t = (item.getData('type') as string) || 'bottle'
    const add = SCORE_VALUES[t] ?? 5
    this.score += add; this.collected += 1; item.destroy()

    const next = this.cleanStage + 1
    if (next < CLEAN_THRESHOLDS.length && this.score >= CLEAN_THRESHOLDS[next]){
      this.cleanStage = next
      this.bg.setTexture('bg' + next)
    }
  }

  private collectPower(p: Phaser.Physics.Arcade.Image){
    const kind = (p.texture.key)
    p.destroy()
    if (kind === 'magnet') {
      this.magnetOn = true
      this.time.delayedCall(5000, () => this.magnetOn = false)
      // Magnet effect handled in preUpdate below
      this.events.on('update', () => {
        if (!this.magnetOn) return
        const radius = 150
        this.trash.children.iterate((it:any) => {
          const item = it as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
          if (!item || !item.body) return true
          const dx = this.boat.x - item.x, dy = this.boat.y - item.y
          const d = Math.hypot(dx, dy)
          if (d < radius){
            const pull = (160 - d) * 0.08
            item.body.velocity.x += (dx / (d||1)) * pull
            item.body.velocity.y += (dy / (d||1)) * pull
          }
          return true
        })
      })
    } else if (kind === 'shield') {
      this.shieldOn = true
      this.cameras.main.flash(100, 127, 255, 192)
      this.time.delayedCall(4000, () => this.shieldOn = false)
    } else if (kind === 'time') {
      this.timeLeft = Math.min(RUN_TIME + 30, this.timeLeft + TIME_BOOST)
    }
  }

  private hitObstacle(){
    if (this.shieldOn) return
    this.score = Math.max(0, this.score - HIT_PENALTY)
    this.boat.setVelocity(-60, -120)
    this.cameras.main.shake(120, 0.004)
  }

  private end(){
    const pct = Math.min(100, Math.floor((this.score / CLEAN_THRESHOLDS[CLEAN_THRESHOLDS.length-1]) * 100))
    const best = Math.max(Number(localStorage.getItem('rr_best')||0), this.score)
    localStorage.setItem('rr_best', String(best))
    const total = Number(localStorage.getItem('rr_cleaned_total')||0) + this.collected
    localStorage.setItem('rr_cleaned_total', String(total))
    this.scene.start('end', { score: this.score, collected: this.collected, cleanPct: pct })
  }
}
