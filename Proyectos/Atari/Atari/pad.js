function Pad(){
  this.len = PAD_WIDTH;
  this.height = PAD_HEIGHT;
  this.pos = createVector(windowWidth/2, windowHeight - (STD_SEPARATION_PAD + (PAD_HEIGHT / 2)));
  this.score = 0;
  this.lifes = STD_PLAYER_LIFES;
  this.vel = FIXED_PAD_VEL;
  this.dir = 0;

// Update funciton
  this.update = function(){
    // rectMode(CENTER);
    fill(255);
    rect(this.pos.x,this.pos.y, this.len, this.height);
    this.pos.x = this.pos.x + (this.dir * this.vel);
  }

// Movw Left function
  this.moveLeft = function(){
    if(this.pos.x - this.len / 2 > 0){
      this.dir = -1;
    }else{
      this.stopMovement();
    }
  }

  // Move Right Function
  this.moveRight = function(){
    if(this.pos.x + this.len / 2 < windowWidth){
      this.dir = 1;
    }else{
      this.stopMovement();
    }
  }

  // stop Movement function
  this.stopMovement = function(){
    this.dir = 0;
  }
}
