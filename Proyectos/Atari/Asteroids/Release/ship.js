// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/hacZU523FyM

// CLASS SHIP CREATED
function Ship() {
  // Declare main initial atributes
  this.pos = createVector(width / 2, height / 2);
  this.r = 15;
  this.heading = 0;
  this.rotation = 0;
  this.vel = createVector(0, 0);
  this.isBoosting = false;

  // BOOSTING FUNCTION
  this.boosting = function(b) {
    this.isBoosting = b;
  }

  // UPDATE FUNCTION
  this.update = function() {
    if (this.isBoosting) {
      this.boost();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.99);
  }

  // BOOST FUNCTION
  this.boost = function() {
    var force = p5.Vector.fromAngle(this.heading); // Create Vector from angle
    force.mult(0.3); // Multiply force Vector
    this.vel.add(force); // Add Force to vel vector
  }

  // HITS FUNCTION
  this.hits = function(asteroid) {
    // Proves distance between center of laser and asteroids position
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    // TODO: Improve Collision recognition
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
    pop();
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

}
