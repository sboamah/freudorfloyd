// Freud or Floyd? 
// Game inspired by NeverBland's Mariah or Messiah
// https://mariahormessiah.fun/
// by Sylvia Boamah

// Creative Programming 2

let source; // JSON file
let id; // id in JSON file
let alert; // are you wrong or right?
let congrats;

let floydneutral 
let floydhappy;
let floydmad;

let freudneutral;
let freuddhappy;
let freudmad;


let floydimg; // arrays of images
let freudimg;

let floydIndex;
let freudIndex;

let g; let land; //main graphic
let center;

let play; let learn; // buttons
let freud; let floyd; let next;

let qLeft; let qCurrent; let qCorrect; let qIncorrect;

let score; //score graphic (circles)
let scoreVectors = new Array(5);
let quoteColor; 
let correct = 0;
let incorrect = 0;
let number = 0;
let threshold = 5;

let thisScore; 
let highScore; //highest score locally stored
let scoreKeeper = new Array();

let scoreFill; 

function preload() {
  source = loadJSON("quotes.json");

  qLeft = loadImage('images/qLeft.png'); 
  qCurrent = loadImage('images/qCurrent.png'); 
  qCorrect = loadImage('images/qCorrect.png');
  qIncorrect = loadImage('images/qIncorrect.png');

  floydhappy = loadImage('/images/floydhappy.png');
  floydmad = loadImage('/images/floydmad.png');
  floydneutral = loadImage('/images/floydneutral.png');

  freudhappy = loadImage('/images/freudhappy.png');
  freudmad = loadImage('/images/freudmad.png');
  freudneutral = loadImage('/images/freudneutral.png');

  scoreFill = [qLeft, qLeft, qLeft, qLeft, qLeft];

}

function setup() {
  land = createGraphics(windowWidth, windowHeight);
  g = createCanvas(windowWidth/2, min(windowWidth/3, windowHeight/3));
  g.parent('sketch-holder');

  quoteColor = document.querySelector('h4'); //changes if answer is right or not
  quoteColor.style.backgroundColor = '#ffffb9';

  center = createVector(width/4, height/6);

  score = createGraphics(400, 100);
  score.parent('score-holder');

  qLeft.resize(15, 15);
  qCurrent.resize(15, 15);
  qCorrect.resize(15, 15);
  qIncorrect.resize(15, 15);

  id = getRandomInt(0, 19);
  alert = "";
  floydIndex = 0;
  freudIndex = 0;

  floydneutral.resize(150, 150);
  floydmad.resize(150, 150);
  floydhappy.resize(150, 150);

  freudneutral.resize(150, 150);
  freudmad.resize(150, 150);
  freudhappy.resize(150, 150);

  play = document.getElementById('play');
  learn = document.getElementById('learn');
  freud = document.getElementById('freud');
  floyd = document.getElementById('floyd');
  next = document.getElementById('next');
  congrats = document.getElementById('congrats');

  
  floydimg = [floydneutral, floydhappy, floydmad];
  freudimg = [freudneutral, freudhappy, freudmad];  
  number++;
  floyd.style.backgroundColor = '#000';
  freud.style.backgroundColor = '#000';
}

function draw() {
  thisScore = 100*correct/threshold; 

  mainGame();

 if(number > threshold){
   next.innerHTML = "See Score";
   if(thisScore > localStorage.getItem("highScore")){
    scoreKeeper.push(thisScore);
    localStorage.setItem('highScore', thisScore);
   }

   highScore = Math.max(...scoreKeeper);
  
   next.onclick = location.href='endScreen.html';
   congrats.innerHTML = 'Congratulations, you got a score of ' + thisScore + '%!';
   console.log(congrats);
 }
  // main();
}


function mainGame() {

  document.getElementById('sketch-holder').style.display = 'inline-block';

  floyd.style.display = 'inline-block';
  freud.style.display = 'inline-block';

  next.style.display = 'inline-block';

  document.getElementById('quote').innerHTML = source.quotes[id].quote;
  document.getElementById('alert').innerHTML = alert;
  if (typeof(Storage) !== "undefined") {
    document.getElementById('high-score').innerHTML = 'Current Score: ' + thisScore + 
    ', Highest Score: ' + localStorage.getItem('highScore');
  }

  background(255, 255, 186);
  score.image(scoreFill[0], 10, 10);
  score.image(scoreFill[1], 30, 10);
  score.image(scoreFill[2], 50, 10);
  score.image(scoreFill[3], 70, 10);
  score.image(scoreFill[4], 90, 10);

  image(freudimg[freudIndex], center.x-100, center.y);
  image(floydimg[floydIndex], center.x+50, center.y);
  image(score, center.x, 0);

}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}



function checkAnswer(){
  let freud = document.getElementById('freud');
  let floyd = document.getElementById('floyd');

  freud.onclick = function() { 
    if(source.quotes[id].author.includes(freud.innerHTML)){
      alert = "Correct! The answer is " + source.quotes[id].author + ".";
      quoteColor.style.backgroundColor = '#8cc63f';
      freud.style.backgroundColor = '#8cc63f';
      scoreFill.splice(number-1, 1,  qCorrect);
      freudIndex = 1;
      correct++;
   } else{
    alert = "Wrong! the answer is " + source.quotes[id].author + ".";
    quoteColor.style.backgroundColor = '#ff5e55';
    freud.style.backgroundColor = '#ff5e55';
    scoreFill.splice(number-1,1, qIncorrect);
    freudIndex = 2;
    incorrect++;
  }
}
   
  floyd.onclick = function() { 
    if (source.quotes[id].author.includes(floyd.innerHTML)){
      alert = "Correct! The answer is " + source.quotes[id].author + ".";
      quoteColor.style.backgroundColor = '#8cc63f';
      floyd.style.backgroundColor = '#8cc63f';
      scoreFill.splice(number-1, 1,  qCorrect);
      floydIndex = 1;
      correct++;
   } else{
        alert = "Wrong! the answer is " + source.quotes[id].author + ".";
        quoteColor.style.backgroundColor = '#ff5e55';
        floydIndex = 2;
        floyd.style.backgroundColor = '#ff5e55';
        scoreFill.splice(number-1,1, qIncorrect);
        incorrect++;
      }
    }

  }
  
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
