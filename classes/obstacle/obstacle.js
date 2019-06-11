class Obstacle {
  constructor(args) {
    this.xpos = args.x
    this.ypos = args.y
    this.w = args.w
    this.h = args.h
    /* Push obstacles to world. */
    args.layer.childrens.push(this)

    this.state = args.initState

    this.visible = true
    this.updateCheck = args.updateCheck
    this.direction = 2;
  }

  show() {
    if(!this.visible) return
    noStroke()
    noFill(this.color)
    rect(this.xpos, this.ypos, this.w, this.h)
  }

  update() {
    if(!this.updateCheck) return
    this[this.state]()
    obstacleSprite.position.x = this.xpos
    obstacleSprite.position.y = this.ypos
  }

  idleState() {

  }

  moveState() {
    this.xpos = this.xpos - 0.4
  }
}