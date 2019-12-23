'use strict'
/* ==========================================================================
  Variables definition
  ========================================================================== */
let world, player, obstaclesArr = [] , initSpeed = 5, score = 0
let clouds, sky, ground, mountain, assets, mountainX = 40, assetsX = 480,
  objective, cloudXPos = -800, baseSound, jumpSound, endSound

// too see if the game is in pause state
let pauseStatus = false

// initial framecount for obstacle
let obstacleFrameCount = 70

// framecounts for obstacle
let obstacleFrameCountArray = [66,70,74,78,82,86,92,98,104]

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
  baseSound = loadSound('assets/sound/base.mp3')
  jumpSound = loadSound('assets/sound/jump.ogg')
  endSound = loadSound('assets/sound/end.ogg')
}

//return random frame counts from list
function random_item(items)
{
  return items[Math.floor(Math.random()*items.length)];
}

/* ==========================================================================
  General page setup
  ========================================================================== */

/* game ui elements */
let $gameOver, $menu, $logo, $pause

/* initiate the game with all elements hidden to display them accordingly */
$(function () {
  $gameOver = $('.js-game-over').hide()
  $menu = $('.js-menu').hide()
  $logo = $('.js-logo').hide()
  $pause = $('.js-pause').hide()
})

/* Init function:
 * It will show the menu and logo first
 */

const initGame = () => {
  $menu.show()
  $logo.show()
}

/* Sound settings */
const musicVol = 0.1
const soundEfxVol = 0.05

/* Start button */
$(document).on('click', '.js-start', () => {
  $menu.hide()
  $pause.show()
  loop()
})

/* Music volume configuration */
$(document).on('input', '.js-music-volume', () => {
  const volumeSelected = parseFloat($('.js-music-volume').val())
  baseSound.setVolume(volumeSelected)
})

/* Sound EFX volume configuration */
$(document).on('input', '.js-sound-volume', () => {
  const volumeSelected = parseFloat($('.js-sound-volume').val())
  jumpSound.setVolume(volumeSelected)
  endSound.setVolume(volumeSelected)
})

/* ==========================================================================
  p5.js setup function
  ========================================================================== */
function setup() {
  var mainCanvas = createCanvas(800, 480);
  //placing canvas inside div with id game
  mainCanvas.parent("game")

  //replaced touchStarted function as it works for whole screen
  mainCanvas.mousePressed(singleJump);

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

  // Sound files
  soundFormats('mp3', 'ogg');
  baseSound.play()

  // Setup the volume for sounds
  baseSound.setVolume(musicVol)
  jumpSound.setVolume(soundEfxVol)
  endSound.setVolume(soundEfxVol)

  // Start the game paused so the user can change settings and start it when ready
  noLoop()
  initGame()
}

/* ==========================================================================
  p5.js draw function
  ========================================================================== */
function draw() {
  clear()
  background(255);

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
      $('.js-tsButton').prop({'href': tsButtonHref, 'target': 'blank'})
      $('.js-final-score').text(finalScore)
      $gameOver.show()
      noLoop()
      endSound.play()
      baseSound.stop()
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

  if (frameCount == obstacleFrameCount) {
    //if time for obstacle, set random framecount for next obstacle
    obstacleFrameCount = random_item(obstacleFrameCountArray) + frameCount
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


function singleJump() {
  if( player.velocity.y > 4) {
    player.velocity.y = -4.5
    jumpSound.play()
  }

  return
}

function pauseGame() {
  if (pauseStatus == false){
    noLoop()
    pauseStatus = true
    $('.js-pause')[0].innerText = "play_circle_outline"
  }

  else {
    loop()
    pauseStatus = false
    $('.js-pause')[0].innerText = "pause_circle_outline"
  }
}
