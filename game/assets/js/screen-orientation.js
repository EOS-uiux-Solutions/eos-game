const checkOrientation = () => {
  if (window.matchMedia("(orientation: portrait)").matches) {
   $('.js-portrait-screen').show()
   pauseStatus = false
   pauseGame()
    console.log("you're in PORTRAIT mode");
  }

  if (window.matchMedia("(orientation: landscape)").matches) {
    $('.js-portrait-screen').hide()
    console.log("you're in LANDSCAPE mode");
  }
}

$(window).resize(checkOrientation)

$(checkOrientation);
