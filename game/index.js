let world, player, obstacle, playerSprite, obstaclesArr

obstaclesArr = []

function setup() {
  createCanvas(640, 480);

  /* World definition */
  world = new World()

  /* ==========================================================================
    Player
    ========================================================================== */
  /* init Player */
  player = new Player({
    x: 20,
    y: width / 2,
    w: 20,
    h: 20,
    updateCheck: true,
    layer: world,
    initState: 'moveState'
  })

  /* Player sprite */
  playerSprite = createSprite(200, 200);
  playerSprite.addAnimation('normal', './assets/img/player/asterisk_normal0001.png', './assets/img/player/asterisk_normal0003.png');
  playerSprite.addAnimation('round', './assets/img/player/asterisk_circle0006.png', './assets/img/player/asterisk_circle0008.png');
  playerSprite.scale = 1

  /* ==========================================================================
     Obstacle
    ========================================================================== */

  /* DEBUG
  ========================================================================== */
  // console.log('playerSprite: ', playerSprite.getBoundingBox());
}

const createObstacleSprite = args => {
  obstacleSprite = createSprite(obstacle.x, obstacle.y);
  obstacleSprite.addAnimation('normal', './assets/img/obstacle/box0001.png', './assets/img/obstacle/box0003.png');
  obstacleSprite.scale = 1
}

function draw() {
  /* "ENGINE" */
  staticRender()
  fixUpdate()
  update()
  lateUpdate()
  render()
}

/* Physics */
const fixUpdate = args => {

}

/* Game logic */
const update = args => {
  world.update()

  drawSprites()

  generateObstacles()
}

/* After pos update */
const lateUpdate = args => {
  // if (playerSprite.overlap(obstacleSprite)) {
  //     playerSprite.changeAnimation('round')
  //     noLoop()
  // } else {
  //   playerSprite.changeAnimation('normal');
  // }
}

/* Render elements */
const render = args => {
  world.show()
  playerSprite.debug  = mouseIsPressed
  // obstacleSprite.debug  = mouseIsPressed
}

/* Render static assets */
const staticRender = args => {
  background(0)
}



const generateObstacles = () => {
  /* Clear elements from array for performance */
  if (obstaclesArr.length > 5) {
    obstaclesArr.pop();
  }

  if (frameCount % 90 == 0) {
    obstaclesArr.push(new Obstacle({
      x: 900,
      y: width / 2,
      w: 20,
      h: 20,
      updateCheck: true,
      layer: world,
      initState: 'moveState'
    }));
  }
}
/* ==========================================================================
  Player controller, jump functionality
  ========================================================================== */
// function keyPressed() {
//   if(!key === ' ') return
//   player.state = 'moveState'
//   obstacle.state = 'moveState'
// }

// function keyReleased() {
//   if (!key === ' ') return
//   player.state = 'idleState'
// }