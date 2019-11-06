'use strict'
/* ==========================================================================
  Variable definition
  ========================================================================== */
let world, player, obstaclesArr = [] , initSpeed = 5, score = 0
let clouds, sky, ground, mountain, assets, mountainX = 40, assetsX = 480, objective, cloudXPos = -800

/* ==========================================================================
  p5.js preload function
  ========================================================================== */
function preload () {
  sky = loadImage('assets/img/world/sky.png')
  clouds = loadImage('assets/img/world/clouds.png')
  ground = loadImage('assets/img/world/ground.png')
  mountain = loadImage('assets/img/world/mountain.png')
  assets = loadImage('assets/img/world/assets.png')
  objective = loadImage('assets/img/world/objective.png')
}

/* ==========================================================================
  General page setup
  ========================================================================== */
let $gameOver

$(function () {
  $gameOver = $('.js-game-over')
  $gameOver.hide()
})

/* ==========================================================================
  p5.js setup function
  ========================================================================== */
function setup() {
  createCanvas(800, 480);

  /* World definition */
  world = new World()

  /* Init Player */
  player = new Player({
    x: 80,
    y: 400,
    w: 20,
    h: 20,
    updateCheck: true,
    layer: world,
    initState: 'jumpState'
  })
}

/* ==========================================================================
  p5.js draw function
  ========================================================================== */
function draw() {
  clear()

  /* "ENGINE" */
  staticRender()
  fixUpdate()
  update()
  lateUpdate()
  render()
}


/* ==========================================================================
  Physics
  ========================================================================== */
const fixUpdate = args => {}


/* ==========================================================================
  Update / game logic
  ========================================================================== */
const update = args => {
  world.update()

  /* Update the obstacle speed over time */
  initSpeed = initSpeed + 0.005

  /* p5.play function, draw all sprites */
  drawSprites()

  /* Generate obstacles */
  generateObstacles({
    xPos: 900,
    yPos: 420,
    width: 20,
    height: 20,
    maxItems: 4
  })
}


/* ==========================================================================
  Post update
  ========================================================================== */

// ts stands for Twitter Share
const tsMainURL = 'https://twitter.com/intent/tweet'
const tsHashtag = 'hophopbunny'
const tsGameURL = 'https://games.eosdesignsystem.com'
const tsText = 'points! beat me at Hop Hop Bunny, a mini, free, and open source game by @eosdesignsystem'

const lateUpdate = args => {
  /* Screen score */
  fill(255)
  text(`Score: ${ Math.round(score = score + 0.1) }`, 10, 30)

  /* Check if ther's a collision between player and any obstacle in the array */
  obstaclesArr.forEach(element => {
    if (player.player.overlap(element.obstacle)) {

      /* prepare string for Twitter share button */
      let finalScore = Math.round(score)
      let tsButtonHref = `${tsMainURL}?hashtags=${tsHashtag}&url=${tsGameURL}&text=${finalScore} ${tsText}`

      /* populate the DOM with the score and twitter share URL*/
      $('.js-tsButton').prop('href', tsButtonHref)
      $('.js-final-score').text(finalScore)
      $gameOver.show()
      noLoop()
    }
  })
}


/* ==========================================================================
  Render elements
  ========================================================================== */
const render = args => {
  world.show()
  player.show()
}

/* ==========================================================================
  Render static assets
  ========================================================================== */
const staticRender = args => {
  image(sky, 0, 0)
  image(clouds, cloudXPos = cloudXPos + 0.08, 0, 1016 / 1.2, 480 / 1.2)
  image(mountain, mountainX = mountainX - 0.03 , 149, 993, 291)
  image(ground, 0, 430, 800, 50)
  // image(assets, assetsX = assetsX - 0.06 , 235, 848 / 1.2, 242 / 1.2)
  image(objective, 600, 280, 50, 90)
}

/* ==========================================================================
  Obstacles
  ========================================================================== */
/* Function that adds obstacles into map and also makes sure we clear the array for performance */
const generateObstacles = params => {

  const { xPos, yPos, width, height, maxItems } = params

  /* We clear the array at ${ maxItems } elements for better performace */
  if (obstaclesArr.length > maxItems) {
    obstaclesArr.shift()
  }

  if (frameCount % 78  == 0) {
    obstaclesArr.push(new Obstacle({
      x: xPos,
      y: yPos,
      w: width,
      h: height,
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
  singleJump()
}

function touchStarted(event) {
  singleJump()
}

function singleJump() {
  if( player.velocity.y > 4) {
    player.velocity.y = -4.5
  }
  return
}
