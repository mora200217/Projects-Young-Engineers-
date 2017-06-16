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
var MAX_ALLOWED_SIZE = 5;

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
