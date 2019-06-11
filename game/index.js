let world, player, obstacle, playerSprite, obstacleSprite

function setup() {
  createCanvas(640, 480);

  /* Ground */
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
  obstacle = new Obstacle({
    x: 500,
    y: width / 2,
    w: 20,
    h: 20,
    updateCheck: true,
    layer: world,
    initState: 'moveState'
  })

  /* Obstacle sprite */
  obstacleSprite = createSprite(obstacle.x, obstacle.y);
  obstacleSprite.addAnimation('normal', './assets/img/obstacle/box0001.png', './assets/img/obstacle/box0003.png');
  obstacleSprite.scale = 1

  /* DEBUG
  ========================================================================== */
  // console.log('playerSprite: ', playerSprite.getBoundingBox());
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
}

/* After pos update */
const lateUpdate = args => {
  if (playerSprite.overlap(obstacleSprite)) {
      playerSprite.changeAnimation('round')
      noLoop()
  } else {
    playerSprite.changeAnimation('normal');
  }
}

/* Render elements */
const render = args => {
  world.show()
  playerSprite.debug  = mouseIsPressed
  obstacleSprite.debug  = mouseIsPressed
}

/* Render static assets */
const staticRender = args => {
  background(0)
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