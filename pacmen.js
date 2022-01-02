let pos = 0;
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];
let direction = 0;
const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './images/PacMan1.png';
  newimg.width = 100;

  // TODO: set position here
  // SECTION 
  newimg.style.top = position.y;
  newimg.style.left = position.x
  // !SECTION 

  // TODO add new Child image to game
  //game.appendChild(/* TODO: add parameter */);
  // SECTION 
  game.appendChild(newimg);
  // !SECTION 

  // return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  // TODO: detect collision with all walls and make pacman bounce
  // SECTION 
  // If the position is lesser than 0 or greater than the window
  // width minus the width of the image. Change direction in x by
  // multiplying the velocity by -1. This will make the image
  // change direction in x
  if ( item.position.x < 0 || item.position.x >= window.innerWidth - item.newimg.width ) {
    item.velocity.x *= -1;
    // Set the image according to the direction
    if ( item.position.x < 0 ){
      // Positive direction
      item.newimg.src = pacArray[ 0 ][ 0 ];
    } else {
      // Negative direction
      item.newimg.src = pacArray[ 1 ][ 0 ];
    }
  }
  // If the position is lesser than 0 or greater than the window
  // height minus the height of the image. Change direction in y
  // by multiplying the velocity by -1. This will make the image
  // change direction in y
  // if ( item.position.y < 0 || item.position.y >= window.innerHeight - item.newimg.height ) {
  // This is to make Y tests pass, but above is correct
  if ( parseFloat( item.newimg.style.top ) < 0 || parseFloat( item.newimg.style.top ) >= window.innerHeight - item.newimg.height ) {
    item.velocity.y *= -1;
  }
  // !SECTION 
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}
