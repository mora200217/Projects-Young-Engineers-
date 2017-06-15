var height = 0;
var width = 0;
var numAsteroids = 7;

var MAX_VEL =  0.2; // Maximum Velocity allowed
var TOTAL_FRICTION = 0.01; // Friction for the ship movement
var MAX_ASTEROID_SIZE = 60;
var MIN_ASTEROID_SIZE = 30;
var MAX_VERTEX =  5;
var SPACE_BAR = 32; // Space Bar Key Code

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
    asteroids[i].edges();
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
  this.r = 20; // Radius
  this.heading = 0; // Heading of the Ship
  this.rotation = 0;
  this.vel = createVector(1,0);
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
    var force = p5.Vector.fromAngle(this.heading, MAX_VEL);
    this.vel.add(force);
    force.mult((1 - TOTAL_FRICTION) * 2);

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
    ellipse(this.pos.x, this.pos.y, 20,20);
  }
}

// ASTEROIDS FUNCTION
function Asteroid(){
  this.size = random(15,50);
  this.pos = createVector(Math.random() * width,Math.random() * height);
  this.vel = p5.Vector.fromAngle(Math.random() * 2 * PI, MAX_VEL * 10);
  this.numVertex = floor(random(5,15));
  this.offset = [];
  for(var i = 0; i < this.numVertex; i++){
    this.offset[i] = random(-5,5);
  }

  // RENDER FUNCTION
  this.render = function(){
    push();
    translate(this.pos.x, this.pos.y);
    beginShape();
    for(var i = 0; i < this.numVertex; i++){
      var angle = map(i, 0, this.numVertex, 0, TWO_PI);
      var r = this.size + this.offset[i];
      var x = r * cos(angle);
      var y = r * sin(angle);
      vertex(x,y);
    }

    endShape(CLOSE);
    pop();
  }
  this.update = function(){
    this.pos.add(this.vel);
  }
  this.edges = function(){
    if(this.pos.x < 0 + - this.size){
      this.pos.x = width;
    }else if(this.pos.x > width + this.size){
      this.pos.x = 0;
    }
    if(this.pos.y < 0 - this.size){
      this.pos.y = height;
    }else if(this.pos.y > height + this.size){
      this.pos.y = 0;
    }

  }
}
