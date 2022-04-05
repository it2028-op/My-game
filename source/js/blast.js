class Blast {
    constructor(x, y) {
      this.size = Csize/16;
      this.y = y;
      this.x = x;
      this.speed = Cspeed;
    }
  
    move() {
      this.x += this.speed;
    }
  
    draw(s) {
          fill(0, 255, 255);
      this.move();
      ellipse(this.x, this.y, this.size*6, this.size/2);
      fill(255, 255, 255)
    }
  }