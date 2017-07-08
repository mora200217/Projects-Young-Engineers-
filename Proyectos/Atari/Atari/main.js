
// Constants Declaration
var PAD_WIDTH = 150;
var PAD_HEIGHT = parseInt(PAD_WIDTH/10);
var STD_PLAYER_LIFES = 3;
var STD_SEPARATION_PAD = 10;
var FIXED_PAD_VEL = 10;
var BALL_RADIUS = 20;
var BALL_VELOCITY = 10;
var NUM_ROWS = 5;
var NUM_COLS =  7;
var SEP_BLOCKS = 5;
var BLOCK_LEN ;
var BLOCK_HEIGHT;

// Arrays Declaration
blocks = [];
for(var i=0; i<NUM_ROWS; i++) {
    blocks[i] = new Array(NUM_COLS);
}

// Setup Function
function setup(){
  createCanvas(windowWidth, windowHeight);
  BLOCK_LEN = (windowWidth - SEP_BLOCKS) / NUM_ROWS - SEP_BLOCKS;
  BLOCK_HEIGHT = BLOCK_LEN / 7;



  pad = new Pad();
  ball = new Ball();
  frameRate(60);
  // Blocks generator
  for(var i = 0; i < NUM_ROWS; i++){
    for(var j = 0; j < NUM_COLS; j++){
      blocks[i][j] = new Block((i * (BLOCK_LEN + SEP_BLOCKS)) + SEP_BLOCKS, (j * (BLOCK_HEIGHT + SEP_BLOCKS)) + SEP_BLOCKS );
    }
  }
}

// Draw Function
function draw(){
  background(0);
  pad.update();
  ball.render();
  ball.update();

  for(var i = 0; i < NUM_ROWS; i++){
    for(var j = 0; j < NUM_COLS; j++){
      blocks[i][j].render();
    }
  }
}

function keyPressed(){
  if(keyCode == RIGHT_ARROW){
    pad.moveRight();
  }else if(keyCode == LEFT_ARROW){
    pad.moveLeft();
  }
}


function keyReleased(){
  pad.stopMovement();
}
