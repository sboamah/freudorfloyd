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
let scoreKeeper = [0];

let scoreFill; 
let ranNums = shuffle([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]);

function shuffle(array) {
  var i = array.length,
      j = 0,
      temp;

  while (i--) {

      j = Math.floor(Math.random() * (i+1));

      // swap randomly chosen element with current element
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;

  }

  return array;
}

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

let iterator = ranNums.values();

function setup() {
  land = createGraphics(windowWidth, windowHeight);
  g = createCanvas(300, 200);
  g.parent('sketch-holder');

  quoteColor = document.querySelector('h4'); //changes if answer is right or not
  quoteColor.style.backgroundColor = '#ffffb9';

  center = createVector(150, 100);

  score = createGraphics(400, 100);
  score.parent('score-holder');

  qLeft.resize(15, 15);
  qCurrent.resize(15, 15);
  qCorrect.resize(15, 15);
  qIncorrect.resize(15, 15);

  id = iterator.next().value;
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
   let message = 'Congratulations, you got a score of ' + thisScore + '%!'
   congrats.innerHTML = message;
   console.log(congrats);
 }
  // main();
}


function mainGame() {

  document.getElementById('sketch-holder').style.display = 'inline-block';

  floyd.style.display = 'inline-block';
  freud.style.display = 'inline-block';

  next.style.display = 'inline-block';

  document.getElementById('quote').innerHTML = '"' + source.quotes[id].quote + '"';
  document.getElementById('alert').innerHTML = alert;
  if (typeof(Storage) !== "undefined") {
    document.getElementById('high-score').innerHTML = 'Current Score: ' + thisScore + 
    ', Highest Score: ' + localStorage.getItem('highScore');
  }

  background(255, 255, 186);
  score.image(scoreFill[0], 0, 10);
  score.image(scoreFill[1], 20, 10);
  score.image(scoreFill[2], 40, 10);
  score.image(scoreFill[3], 60, 10);
  score.image(scoreFill[4], 80, 10);

  image(freudimg[freudIndex], center.x-150, 50);
  image(floydimg[floydIndex], center.x, 50);
  image(score, width/2 - 50, 0);

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
