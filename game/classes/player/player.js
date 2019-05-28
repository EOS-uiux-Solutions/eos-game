
class Ellipse {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.pos = 5
  }

  show() {
    ellipse(this.x, this.y, this.w, this.h);
  }

  move() {
    if(this.x >= width) {
      this.x -= this.x - this.pos
    }
    if(this.x <=width){
      this.x = this.x + this.pos 
    }
  }
}
