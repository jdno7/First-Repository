const gameContainer = document.getElementById("game");
const startBtn = document.querySelector('button');
const match = [];
let score = 0;
const gameScore = document.createElement('h2'); 
const bestScore = [];

document.addEventListener('DOMContentLoaded', function (e) {
  document.querySelectorAll('div div').forEach( unmatched => unmatched.id = 'unmatched')
});

startBtn.addEventListener('click', function(e){
  let bestScore = localStorage.getItem('bestScore')
  parseInt(bestScore);
  document.querySelector('#bestscore').innerText = `Best Score = ${bestScore}`;
  document.body.append(gameScore);
  gameScore.innerText = `Your Score = ${score}`; 
  if (startBtn.innerText === 'RE-START'){
      window.location.reload();
      document.body.append(gameScore);
      gameScore.innerText = `Game Score = ${score}`;
  } 
  })

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


function handleCardClick(event) {
  
  if (match.length === 2){
    // console.log('return');
    return;
  }
  
  if (match.length < 2){
    score++;
    gameScore.innerText = `Game Score = ${score}`;
    console.log(score);
    match.unshift(event.target.className);
    event.target.style.pointerEvents = 'none';
    event.target.style.backgroundColor = event.target.className;
    
  }
  console.log(match);

  if (match[0] === match [1]){
    let matched = document.querySelectorAll(`.${match[0]}`)
    matched.forEach(card => card.id = ('matched'));
    match.length = 0;
      let cards =  document.querySelectorAll('#matched');
      if(cards.length === COLORS.length) {
       
        gameComplete();
        
        
      }
    return;
  }
  
 
  
  setTimeout (function(){

    if (match[0] === match [1]){
      let matched = document.querySelectorAll(`.${match[0]}`)
      matched.forEach(card => card.id = ('matched'));
      match.length = 0;
      let cards =  document.querySelectorAll('#matched');
      if(cards.length === COLORS.length) {
        gameComplete();
      }
      return;
      
    }

          event.target.style.removeProperty('background-color') ;
          event.target.style.removeProperty('pointer-events') ;
          match.pop();
          // console.log(match);
  
},2000)

}

function gameComplete(){
  document.querySelector('button').innerText = 'RE-START';
        if (bestScore.length === 0){
          bestScore.push(score);
        }
       
        if (bestScore[0] > score){
          bestScore[0] === score;
        }
        localStorage.setItem('bestScore', score);
        console.log(localStorage);
}


// when the DOM loads
createDivsForColors(shuffledColors);

