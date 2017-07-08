function Ball(){
  this.r = BALL_RADIUS;
  this.pos = createVector(windowWidth/2, windowHeight/2);
  this.vel = p5.Vector.fromAngle(random(0, 2* PI));
  this.vel.mult(BALL_VELOCITY);
  this.dir = createVector(1,1);

  // Render function
  this.render = function(){
    noStroke();
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }

  // Update function
  this.update = function(){
    this.pos.x += this.vel.x * this.dir.x;
    this.pos.y += this.vel.y * this.dir.y;
    this.edges();
  }

  // Edges function
  this.edges = function(){
    // Copmponent Y of edges recognition
    if(this.pos.x + this.r > windowWidth || this.pos.x - this.r < 0){
      this.dir.x *= -1;
    }

    // Copmponent X of edges recognition
    if(this.pos.y + this.r > windowHeight || this.pos.y - this.r < 0){
      this.dir.y *= -1;
    }

  }
}
