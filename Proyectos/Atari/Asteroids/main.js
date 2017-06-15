var height = 0;
var width = 0;
var numAsteroids = 7;

var MAX_VEL =  0.2; // Maximum Velocity allowed
var TOTAL_FRICTION = 0.01; // Friction for the ship movement
var MAX_ASTEROID_SIZE = 60; // Maximum Asteroid size
var MIN_ASTEROID_SIZE = 30; // Minimum Asteroid size
var MAX_VERTEX =  5; // Amount of vertex within the polygonal Asteroids fig.
var SPACE_BAR = 32; // Space Bar Key Code
var SHOOT_LIFETIME = 10; // In seconds
var SHIP_SIZE =  15;

shoots = [];

function setup(){
  // Defining Initial Configuration
  var DIFF_INIT = 4;
  height = windowHeight;
  width = windowWidth;
  createCanvas(windowWidth - DIFF_INIT, windowHeight - DIFF_INIT);
  ship = new Ship();
  asteroids = [];
  for(var i = 0; i < numAsteroids; i++){
    asteroids[i] = new Asteroid();
  }
}

function draw(){
  background(0);
  ship.render();
  ship.turn();
  ship.update();

  for(var i = 0; i < numAsteroids; i++){
    asteroids[i].render();
    asteroids[i].update();
  }
  for(var i = 0; i < shoots.length; i++){
    shoots[i].update();
  }
}

// KEY RELEASED EVENT
function keyReleased(){
  ship.setRotation(0);
  ship.isBoosting = false;
}

// KEY PRESSED EVENT
function keyPressed(){
  if(keyCode == RIGHT_ARROW){
    ship.setRotation(0.1);
  }else if(keyCode == LEFT_ARROW){
    ship.setRotation(-0.1);
  }else if(keyCode == UP_ARROW){
    ship.isBoosting = true;
  }
  if(keyCode == SPACE_BAR){
    ship.shoot();
  }
}

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
