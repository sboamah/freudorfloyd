let floydLanding;
let freudLanding;

function preload(){
  freudLanding = loadImage('/images/freud-landing.png');
  floydLanding = loadImage('/images/floyd-landing.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    floydLanding.resize(width/3, 0);
    freudLanding.resize(width/3, 0);
  }
  
  function draw() {
    background(255, 255, 186);
    strokeWeight(10);
    fill(252, 198, 0);
    beginShape();
    vertex(0,0);
    vertex(0, height/2 - height/(8));
    vertex(width, height/2 - height/(6));
    vertex(width, 0);
    endShape(CLOSE);

    image(freudLanding, width/4-100, 0);
    image(floydLanding, width/2-100, 50);

    beginShape();
    vertex(0,height);
    vertex(0, height/2 + height/(8));
    vertex(width, height/2 + height/(6));
    vertex(width, height);
    endShape(CLOSE);
  }
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }