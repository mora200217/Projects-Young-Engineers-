var height = 0;
var width = 0;

function setup(){
  // Defining Initial Configuration
  var DIFF_INIT = 4;
  height = windowHeight;
  width = windowWidth;
  createCanvas(windowWidth - DIFF_INIT, windowHeight - DIFF_INIT);
  ship = new Ship();
}

function draw(){
  background(0);
  ship.render();
  ship.turn();
}

// KEY RELEASED EVENT
function keyReleased(){
  ship.setRotation(0);
}
// KEY PRESSED EVENT
function keypressed(){
  if(keyCode == RIGHT_ARROW){
    ship.setRotation(0.1);
  }else if(keyCode == LEFT_ARROW){
    ship.setRotation(-0.1);
  }
}

// SHIP CLASS CREATED
function Ship(){
  this.pos = createVector(width/2, height/2)
  this.r = 20; // Radius
  this.heading = 0; // Heading of the Ship
  this.rotation = 0;
  // RENDER SHIP
  this.render = function(){
    noFill();
    stroke(255);
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
  }
  // THIS SET ROTATION
  this.setRotation = function(angle){
    this.rotation = angle;
  }
  // TURN SHIP
  this.turn = function(){
    this.heading += this.rotation;
  }

}
