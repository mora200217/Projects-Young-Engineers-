// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/hacZU523FyM

// CLASS SHIP CREATED
function Ship(initialLifes) {
  // Declare main initial atributes
  this.alreadyDied = false;
  this.initialLifes = initialLifes;
  this.pos = createVector(width / 2, height / 2);
  this.r = 15;
  this.heading = PI * 3 / 2;
  this.rotation = 0;
  this.vel = createVector(0, 0);
  this.isBoosting = false;
  this.len = 0;
  this.showFire = false;
  this.lifes = []
  this.score = 0; // Initial Score of the player

  for(var i = 0; i < this.initialLifes; i ++){
    this.lifes.push(new life(i + 1,MAX_LIFES));
  }
  // BOOSTING FUNCTION
  this.boosting = function(b) {
    this.isBoosting = b;
  }

  // UPDATE FUNCTION
  this.update = function() {
    if (this.isBoosting) {
      this.showFire = true;
      this.boost();
    }else{
      this.showFire = false;
    }
    this.pos.add(this.vel);
    this.vel.mult(0.99);
    for(var i = 0; i < initialLifes; i ++){
      if(this.lifes[i] != null){
        this.lifes[i].render();
      }
    }
  }

  // BOOST FUNCTION
  this.boost = function() {
    var force = p5.Vector.fromAngle(this.heading); // Create Vector from angle
    force.mult(0.3); // Multiply force Vector
    this.vel.add(force); // Add Force to vel vector
    this.len = abs(this.force);
  }

  // HITS FUNCTION
  this.hits = function(asteroid) {
    // Proves distance between center of laser and asteroids position
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    // TODO: Improve Collision recognition id:136
    // Return boolean state from function
    if (d < this.r + asteroid.r) {
      return true;
    } else {
      return false;
    }
  }

  // RENDER FUNCTION
  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    noFill();
    stroke(255);
    beginShape();
    vertex(0, -this.r);
    vertex(this.r, this.r);
    vertex(0, this.r / 2);
    vertex(-this.r, this.r);
    endShape(CLOSE);
    this.fire();
    pop();
    this.updateScore();
  }

  // EDGES FUNCTION
  this.edges = function() {
    // Function for offscreen ship
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }

  // SET ROTATION FUNCTION
  this.setRotation = function(a) {
    this.rotation = a;
  }

  // TURN FUNCTION
  this.turn = function() {
    this.heading += this.rotation;
  }

  // UPDAE SCORE FUNCTION
  this.updateScore = function(){
    noStroke();
    fill(255);
    textSize(this.r);
    text("SCORE: " + this.score, SCORE_SEPARATION / 2, SCORE_SEPARATION);
}
  // PARTICLE SYSTEM FUNCTION
  this.fire = function(){
    this.len = max(this.vel.x,this.vel.y  );
    if(this.showFire){
      stroke(255);
      fill(255);
    }else{
      noFill();
      stroke(0);
    }
    this.fixedPos = this.r ;
    triangle(0, this.fixedPos * 2 , -this.fixedPos / 4, this.fixedPos, this.fixedPos / 4, this.fixedPos);

  }

}
