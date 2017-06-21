function Pad(){
  this.len = PAD_WIDTH;
  this.height = PAD_HEIGHT;
  this.pos = createVector(windowWidth/2, windowHeight - (STD_SEPARATION_PAD + (PAD_HEIGHT / 2)));
  this.score = 0;
  this.lifes = STD_PLAYER_LIFES;

  this.update = function(){
    rectMode(CENTER);
    rect(this.pos.x,this.pos.y, this.len, this.height);
  }

}
