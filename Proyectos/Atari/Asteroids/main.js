var height = windowHeight;
var width = windowWidth;

function setup(){
  // Defining Initial Configuration
  var DIFF_INIT = 4;
  createCanvas(windowWidth - DIFF_INIT, windowHeight - DIFF_INIT);
}

function draw(){
  background(0);
  ship = new Ship();
  ship.render();
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
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
  }

}
