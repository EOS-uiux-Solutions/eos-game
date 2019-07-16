let world, player, obstacle, playerSprite, obstaclesArr, initSpeed = 5, score = 0
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

  /* Update the obstacle speed over time */
  initSpeed = initSpeed + 0.005

  drawSprites()
  generateObstacles()
}

/* After pos update */
const lateUpdate = args => {
  /* Screen score */
  fill(255)
  text(`Score: ${Math.round(score = score + 0.1)} `, 10, 30);

  /* Check if ther's a collision between player and any obstacle in the array */
  obstaclesArr.forEach(element => {
    if (playerSprite.overlap(element.obstacle)) {
      noLoop()
    }
  });
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

/* Function that adds obstacles into map and also makes sure we clear the array for performance */
const generateObstacles = () => {
  /* Clear elements from array for performance */
  if (obstaclesArr.length < 1) {
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
      initState: 'moveState',
      speed: initSpeed,
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