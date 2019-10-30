class Player {
  constructor(params) {
    this.xpos = params.x
    this.ypos = params.y
    this.w = params.w
    this.h = params.h
    params.layer.childrens.push(this)

    this.velocity = createVector()
    this.grav = 0.1;
    this.state = params.initState
    this.player = createSprite(this.w, this.h)

    this.visible = true
    this.updateCheck = params.updateCheck

    this.player.addAnimation('normal', './assets/img/player/1.png', './assets/img/player/3.png');
    this.player.scale = 0.2
    this.player.debug = true

    this.player.setCollider('rectangle', 0, 19, 100, 200)
  }

  show() {
    if(!this.visible) return
    noFill()
    noStroke()
    ellipse(this.xpos, this.ypos, this.w, this.h)
  }

  update() {
    if(!this.updateCheck) return
    this[this.state]()
    this.player.position.x = this.xpos
    this.player.position.y = this.ypos
  }

  jumpState() {
    this.velocity.y += this.grav // vy = vy + gravity
    this.ypos += this.velocity.y // y = y + vy
    this.ypos = constrain(this.ypos, - 10, 400)
    return this
  }
}
