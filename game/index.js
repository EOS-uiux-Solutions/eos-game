let world, player, obstacle, playerSprite, obstaclesArr, initSpeed = 5, score = 0
obstaclesArr = []

// Assets
let sky

function preload () {
  sky = loadImage('assets/img/world/sky.png')
}

function setup() {
  createCanvas(640, 480);
  /* World definition */
  world = new World()

  /* ==========================================================================
    Player
    ========================================================================== */
  /* init Player */
  player = new Player({
    x: 50,
    y: width / 2 - 20,
    w: 20,
    h: 20,
    updateCheck: true,
    layer: world,
    initState: 'moveState'
  })
}

function draw() {
  clear()
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

  /* Draw all sprites */
  drawSprites()
  generateObstacles()
}

/* After pos update */
const lateUpdate = args => {
  /* Screen score */
  fill(255)
  text(`Score: ${ Math.round(score = score + 0.1) } `, 10, 30);

  /* Check if ther's a collision between player and any obstacle in the array */
  obstaclesArr.forEach(element => {
    if (player.player.overlap(element.obstacle)) {
      noLoop()
    }
  });
}

/* Render elements */
const render = args => {
  world.show()
  player.show()
}

/* Render static assets */
const staticRender = args => {
  image(sky, 0, 0);
}

/* Function that adds obstacles into map and also makes sure we clear the array for performance */
const generateObstacles = () => {
  if (obstaclesArr.length > 10) {
    obstaclesArr.shift();
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
function keyPressed() {
  if(!key === ' ') return
  player.state = 'jumpState'
  player.velocity.y = -3;
}

// function keyReleased() {
//   if (!key === ' ') return
//   player.state = 'idleState'
// }
