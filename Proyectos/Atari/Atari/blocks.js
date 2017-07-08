function Block(posX, posY){
  this.len = BLOCK_LEN;
  this.height = BLOCK_HEIGHT;
  this.pos = createVector(posX, posY);
  this.colorA = abs(tan(posY)) * 255;
  this.colorB = abs(tan(posY)) * 255;
  this.colorC = abs(tan(posY)) * 255;

  this.render = function(){
    fill(this.colorA,this.colorB,this.colorC);
    rectMode(LEFT);
    rect(this.pos.x, this.pos.y, this.len, this.height);
  }

}
