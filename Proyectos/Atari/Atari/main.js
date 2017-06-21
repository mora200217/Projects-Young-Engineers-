
// Constants Declaration
var PAD_WIDTH = 150;
var PAD_HEIGHT = parseInt(PAD_WIDTH/10);
var STD_PLAYER_LIFES = 3;
var STD_SEPARATION_PAD = 10;

// Setup Function
function setup(){
  createCanvas(windowWidth, windowHeight);
  pad = new Pad();
}

// Draw Function
function draw(){
  background(0);
  pad.update();
}
