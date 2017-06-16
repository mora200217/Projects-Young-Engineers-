
// SHIP CLASS CREATED
function Ship(){
  this.pos = createVector(width/2, height/2)
  this.r = SHIP_SIZE; // Radius
  this.heading = 0; // Heading of the Ship
  this.rotation = 0;
  this.vel = createVector(0,0);
  this.isBoosting = false;

  // BOOSTING FUNCTION
  this.boosting = function(){
    if(this.isBoosting){
      this.boost();
    }
  }
  // RENDER SHIP
  this.render = function(){
    noFill();
    stroke(255);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI/2);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    pop();
  }
  // UPDATE FUNCTION
  this.update = function(){
    this.pos.add(this.vel);
    this.vel.mult(1 - TOTAL_FRICTION);
    this.boosting();
    this.edges();
    this.collisionElement = this.isColliding();
    if(this.collisionElement[0]){ // Boolean Component of the returned tuple
      this.resetShip();
    }
  }

  // RESET SHIP FUNCTION
  this.resetShip = function(){
      this.pos = createVector(width / 2, height / 2);
      console.log("Collision Detected!");
      this.blink();
      this.vel.mult(0); // Reset Ships Velocity
  }

  // BLINK FUNCTION
  this.blink = function(){
    // IDEA: Blink Ship after collision
    stroke(0);
    stroke(255);
  }


  // COLLISION DETECTION FUNCTION
  this.isColliding = function(){
    for(var i = 0; i < asteroids.length; i++){
      if(this.pos.x  > asteroids[i].pos.x - asteroids[i].size && this.pos.x  < asteroids[i].pos.x + asteroids[i].size ){
        if(this.pos.y  > asteroids[i].pos.y - asteroids[i].size && this.pos.y  < asteroids[i].pos.y + asteroids[i].size ){
          return [true,asteroids[i]];
        }
      }
    }
    return [false,NaN];

  }
  // EDGES FUNCTION
  this.edges = function(){
    if(this.pos.x < 0 + - this.r){
      this.pos.x = width;
    }else if(this.pos.x > width + this.r){
      this.pos.x = 0;
    }
    if(this.pos.y < 0 - this.r){
      this.pos.y = height;
    }else if(this.pos.y > height + this.r){
      this.pos.y = 0;
    }

  }

  // BOOST FUNCTION
  this.boost = function(){
    var force = p5.Vector.fromAngle(this.heading);
    force.mult((TOTAL_FRICTION * 30));
    this.vel.add(force);
  }
  // SET ROTATION
  this.setRotation = function(angle){
    this.rotation = angle;
  }
  // TURN SHIP
  this.turn = function(){
    this.heading += this.rotation;
  }
  // SHOOT FUNCTION
  this.shoot = function(){
    shootElement = new Shoot(this.r);
    shoots.push(shootElement);
  }
}
