class Player {
  constructor(args) {
    this.xpos = args.x
    this.ypos = args.y
    this.w = args.w
    this.h = args.h
    args.layer.childrens.push(this)


    this.state = args.initState

    this.visible = true
    this.updateCheck = args.updateCheck
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
    playerSprite.position.x = this.xpos
    playerSprite.position.y = this.ypos
  }

  idleState() {
    // console.log('player is idle')
  }

  moveState() {
    // console.log('player is moving')
    this.xpos = mouseX
    this.ypos = mouseY
  }

  jumpState() {
    this.ypos++
  }
}