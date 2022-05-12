let arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
let ranNums = shuffle(arr);
let id = 0;
let qNum = id + 1;
let q;
let alert;
let correct = 0;
let incorrect = 0;
let threshold = 5;
let thisScore = 0;


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

function next(){
    getScore();
    alert.innerHTML = "";
    alert.style.backgroundColor = 'transparent';
    freud.style.backgroundColor = '#000';
    floyd.style.backgroundColor = '#000';
    document.getElementById("freud").disabled = false;
    document.getElementById("floyd").disabled = false;
    document.getElementById('frFace').src = 'images/freudneutral.png';
    document.getElementById('flFace').src = 'images/floydneutral.png';
    loadQuotes();
    if(id < threshold){
        id++;
        qNum++;
    }
    if(id == 4){
        next.innerHTML = "See Score";
    }
    if(id == 5){
    next.onclick = location.href='endScreen.html';
      if(thisScore > localStorage.getItem("highScore")){
            localStorage.setItem('highScore', thisScore);
           }
    }
    console.log(id);
    console.log(qNum);
}

function loadQuotes(){
    let html = '';
        $(document).ready(function(){
            $.getJSON("quotes.json", function(data){
                console.log(data.quotes[ranNums[id]].quote); // Prints: Harry
                let htmlSegment = `<div class="content">
                    <h5> "${data.quotes[ranNums[id]].quote}"</h5>
                </div>`;
                html += htmlSegment;
            let container = document.querySelector('#quote');
            container.innerHTML = html;
            }).fail(function(){
                console.log("An error has occurred.");
            });
        });

}

function checkAnswer(){
    alert = document.getElementById('alert');
    let freud = document.getElementById('freud');
    let floyd = document.getElementById('floyd');
    $(document).ready(function(){
        $.getJSON("quotes.json", function(data){
        freud.onclick = function() { 
        if(data.quotes[ranNums[id]].author.includes(freud.innerHTML)){
            freud.style.backgroundColor = '#8cc63f';
            alert.innerHTML = "Correct! The answer is " + data.quotes[ranNums[id]].author + ".";
            alert.style.backgroundColor = '#8cc63f';
            correct++;
            thisScore = thisScore + 20;
            console.log(thisScore);
            document.getElementById("freud").disabled = true;
            document.getElementById("floyd").disabled = true;
            document.getElementById('q'+ qNum).src = 'images/qCorrect.png';
            document.getElementById('frFace').src = 'images/freudhappy.png';
            // scoreFill.splice(number-1, 1,  qCorrect);
            // freudIndex = 1;
        } else{
             freud.style.backgroundColor = '#ff5e55';
             alert.innerHTML = "Wrong! the answer is " + data.quotes[ranNums[id]].author + ".";
             alert.style.backgroundColor = '#ff5e55';
             incorrect++;
             document.getElementById("freud").disabled = true;
             document.getElementById("floyd").disabled = true;
             document.getElementById('q'+ qNum).src = 'images/qIncorrect.png';
             document.getElementById('frFace').src = 'images/freudmad.png';
        //   scoreFill.splice(number-1,1, qIncorrect);
        //   freudIndex = 2;
        }
    } 
        floyd.onclick = function() { 
        if (data.quotes[ranNums[id]].author.includes(floyd.innerHTML)){
            floyd.style.backgroundColor = '#8cc63f';
            alert.innerHTML = "Correct! The answer is " + data.quotes[ranNums[id]].author + ".";
            alert.style.backgroundColor = '#8cc63f';
            correct++;
            console.log(thisScore);
            thisScore = thisScore + 20;
            document.getElementById("freud").disabled = true;
            document.getElementById("floyd").disabled = true;
            document.getElementById('q'+ qNum).src = 'images/qCorrect.png';
            document.getElementById('flFace').src = 'images/floydhappy.png';
            // scoreFill.splice(number-1, 1,  qCorrect);
            // floydIndex = 1;
            
        } else{
            //   floydIndex = 2;
            floyd.style.backgroundColor = '#ff5e55';
            alert.innerHTML = "Wrong! the answer is " + data.quotes[ranNums[id]].author + ".";
            alert.style.backgroundColor = '#ff5e55';
            incorrect++;
            document.getElementById("freud").disabled = true;
            document.getElementById("floyd").disabled = true;
            document.getElementById('q'+ qNum).src = 'images/qIncorrect.png';
            document.getElementById('flFace').src = 'images/floydmad.png';
            }
        }
        });
});
}

function getScore(){
    if (typeof(Storage) !== "undefined") {
        document.getElementById('high-score').innerHTML = 'Current Score: ' + thisScore + 
        ' | Highest Score: ' + localStorage.getItem('highScore');
    } else{
        document.getElementById('high-score').innerHTML = 'Current Score: ' + thisScore + 
        ' | Highest Score: 0';
    }
}

getScore();
loadQuotes();