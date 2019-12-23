const checkOrientation = () => {
  if (window.matchMedia("(orientation: portrait)").matches) {
    $('.js-portrait-screen').show()
    pauseStatus = false
    pauseGame()
  }

  if (window.matchMedia("(orientation: landscape)").matches) {
    $('.js-portrait-screen').hide()
  }
}

$(window).resize(checkOrientation)

$(checkOrientation);
