var height = windowHeight;
var width = windowWidth;

function setup(){
  // Defining Initial Configuration
  var DIFF_INIT = 4;
  createCanvas(windowWidth - DIFF_INIT, windowHeight - DIFF_INIT);
  ship = new Ship();
}

function draw(){
  background(0);
  ship.render();
  ship.turn(0.1);
}

function Ship(){
  this.pos = createVector(width/2, height/2)
  this.r = 20; // Radius
  this.heading = 0; // Heading of the Ship
  // RENDER SHIP
  this.render = function(){
    noFill();
    stroke(255);
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
  }
  // TURN SHIP
  this.turn = function(angle){
    this.heading += angle;
  }

}
