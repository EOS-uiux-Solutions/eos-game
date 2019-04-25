function setup() {
  createCanvas(640, 480);
}

const e = new Ellipse(20,20,20,20)

function draw() {
  background('#ffff')
  e.show()
  e.move()
}

