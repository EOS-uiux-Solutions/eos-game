class Obstacle {
  constructor(args) {
    this.xpos = args.x
    this.ypos = args.y
    this.w = args.w
    this.h = args.h
    this.speed = args.speed
    /* Push obstacles to world. */
    args.layer.childrens.push(this)

    this.state = args.initState

    this.visible = true
    this.updateCheck = args.updateCheck
    // this.direction = 2;
    this.obstacle = createSprite(this.xpos, this.ypos);
  }

  show() {
    if(!this.visible) return
    noStroke()
    // noFill(this.color)
    fill(255)
    rect(this.xpos, this.ypos, this.w, this.h)
  }

  update() {
    if(!this.updateCheck) return
    this[this.state]()
    this.obstacle.position.x = this.xpos
    this.obstacle.position.y = this.ypos
  }

  idleState() {

  }

  moveState() {
    this.xpos = this.xpos - this.speed
  }

  createObstacleSprite() {
    this.obstacle.addAnimation('normal', '../../img/obstacle/box0001.png', '../../img/obstacle/box0003.png');
    obstacleSprite.scale = 1
  }
}