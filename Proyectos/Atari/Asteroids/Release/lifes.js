

function life(number, maxLifes){
  this.r = LIFE_RADIUS;
  this.number = number;
  this.offset = ((this.r * 2) + LIFE_SEPARATION) * (number - 1);
  this.render = function(){
    fill(255);
    noStroke();
    push();

    translate(width - this.offset - this.r * 3, this.r * 3);
    beginShape();
    vertex(0, -this.r);
    vertex(-this.r, this.r);
    vertex(0, this.r / 2);
    vertex(this.r, this.r);
    endShape(CLOSE);
    pop();
  }
  this.delete = function(){

  }
}
