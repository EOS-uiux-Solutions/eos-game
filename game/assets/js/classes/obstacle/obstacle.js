/**
 * @param { Number } x x location
 * @param { Number } y y location
 * @param { Number } w w obstacle  width
 * @param { Number } h h obstacle  height
 * @param { Number } speed obstalce speed
 * @param { Number } initState object initial state
 */
class Obstacle {
  constructor(params) {
    this.xpos = params.x
    this.ypos = params.y
    this.w = params.w
    this.h = params.h
    this.speed = params.speed
    this.state = params.initState
    this.visible = true
    this.updateCheck = params.updateCheck
    this.obstacle = createSprite(this.xpos, this.ypos);

    /* Push obstacles to world. */
    params.layer.childrens.push(this)

    this.obstacleType = [
      './assets/img/obstacle/mushroom.png',
      './assets/img/obstacle/logs.png',
      './assets/img/obstacle/rock.png'
    ]

    this.image = loadImage(random(this.obstacleType))

    this.obstacle.addImage('obstacle', this.image);
    this.obstacle.scale = 0.2

    this.obstacle.debug = false
    this.obstacle.setCollider('rectangle', 0, 0, 100, 130)
  }

  show() {
    if(!this.visible) return
    noStroke()
    noFill()
    rect(this.xpos, this.ypos, this.w, this.h)
  }

  update() {
    if(!this.updateCheck) return
    this[this.state]()
    this.obstacle.position.x = this.xpos
    this.obstacle.position.y = this.ypos
  }

  moveState() {
    this.xpos = this.xpos - this.speed
  }
}
