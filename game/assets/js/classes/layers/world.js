class World {
  constructor() {
    this.childrens = []
  }

  /* Draw all the childrens into the scene. */
  show() {
    this.childrens.forEach(element => {
      element.show()
    });
  }

  update() {
    this.childrens.forEach(element => {
      element.update()
    });
  }
}
