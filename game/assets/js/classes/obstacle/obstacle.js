class Obstacle {
  constructor(args) {
    this.xpos = args.x
    this.ypos = args.y
    this.w = args.w
    this.h = args.h
    this.speed = args.speed
    this.state = args.initState
    this.visible = true
    this.updateCheck = args.updateCheck
    this.obstacle = createSprite(this.xpos, this.ypos);
    /* Push obstacles to world. */
    args.layer.childrens.push(this)

    this.obstacleType = [
      '../../assets/img/obstacle/mushroom.png',
      '../../assets/img/obstacle/logs.png',
      '../../assets/img/obstacle/rock.png'
    ]

    this.image = loadImage(random(this.obstacleType))

    this.obstacle.addImage('mushroom', this.image);
    this.obstacle.scale = 0.2

    this.obstacle.debug = true
    this.obstacle.setCollider('rectangle', 0, 0, 70, 120)
  }

  show() {
    if(!this.visible) return
    noStroke()
    noFill()
    // fill(255)
    rect(this.xpos, this.ypos, this.w, this.h)
  }

  update() {
    if(!this.updateCheck) return
    this[this.state]()
    this.obstacle.position.x = this.xpos
    this.obstacle.position.y = this.ypos
  }

  idleState() {}

  moveState() {
    this.xpos = this.xpos - this.speed
  }
}