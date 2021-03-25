class Draggable {
  constructor(p5, str, x, y, w, h, color, slider) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.str = str;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
    // this.color =  color;
    // this.slider = slider;

    this.over = () => {
      // Is mouse over object
      if (
        p5.mouseX > this.x &&
        p5.mouseX < this.x + this.w &&
        p5.mouseY > this.y &&
        p5.mouseY < this.y + this.h
      ) {
        this.rollover = true;
      } else {
        this.rollover = false;
      }
    };

    this.update = (baf, frameCount, color, sliderv) => {
      // Adjust location if being dragged
      //  console.log(this.slider);
      // console.log(this.color.r,this.color.g,this.color.b)
      if (color) {
        this.color = color;
      }
      if (sliderv) {
        this.slider = sliderv;
      }

      txt = this.slider;
      p5.textSize(this.slider);
      // p5.fill(this.color.r,this.color.g,this.color.b);
      // p5.textSize(this.slider);
      if (this.dragging) {
        this.x = p5.mouseX + this.offsetX;
        this.y = p5.mouseY + this.offsetY;
      }
      if (baf) {
        // console.log(baf)
        if (frameCount >= 60) {
          this.str = "After";
        } else {
          this.str = "Before";
        }
      }
    };

    this.show = () => {
      // p5.stroke(0);
      // Different fill based on state
      if (this.dragging) {
        p5.fill(50);
      } else if (this.rollover) {
        p5.fill(100);
      } else {
        p5.fill(175, 200, 255);
      }

      // console.log(txt);
      p5.color(this.color.r, this.color.g, this.color.b);
      p5.text(this.str, this.x, this.y, this.w, this.h);
    };

    this.pressed = () => {
      // Did I click on the rectangle?

      if (
        p5.mouseX > this.x &&
        p5.mouseX < this.x + this.w &&
        p5.mouseY > this.y &&
        p5.mouseY < this.y + this.h
      ) {
        this.dragging = true;
        // console.log("pressed should be dragging")
        // If so, keep track of relative location of click to corner of rectangle
        this.offsetX = this.x - p5.mouseX;
        this.offsetY = this.y - p5.mouseY;
      }
    };

    this.released = () => {
      // Quit dragging
      this.dragging = false;
    };
  }
}
