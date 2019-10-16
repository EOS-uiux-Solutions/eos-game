class Player {
  constructor(args) {
    this.xpos = args.x
    this.ypos = args.y
    this.w = args.w
    this.h = args.h
    args.layer.childrens.push(this)

    this.velocity = createVector()
    this.grav = .09;
    this.state = args.initState
    this.player = createSprite(this.w, this.h)

    this.visible = true
    this.updateCheck = args.updateCheck

    this.player.addAnimation('normal', '../../assets/img/player/1.png', '../../assets/img/player/3.png');
    this.player.scale = 0.2
    this.player.debug = true
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

  idleState() {
    this.ypos = width / 2 - 20
  }

  moveState() {
    // console.log('player is moving')
    // this.xpos = mouseX
    // this.ypos = mouseY
  }

  jumpState() {
    this.velocity.y += this.grav; // vy = vy + gravity;
    this.ypos += this.velocity.y; // y = y + vy;
    this.ypos = constrain(this.ypos, - 40, width / 2 - 20);
    return this;
  }

  debug() {
    this.player.debug = true
  }
}