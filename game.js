// Here's a big fat JS file for a Minesweeper game!
// Author: Coren Frankel 2022/23

let horde = 10; // ninja count

// 2D Array Gameboard rows, columns, and array initializer
let rows = 10, cols = 10;
let theDojo = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false));
// Div containing the gameboard
const dojoDiv = document.querySelector("#the-dojo");
// Container for the gameover message
const endgame = document.querySelector(".gameover");
// uncovered list of squares exposed
let uncovered = [];
// Renders all rows of theDojo as cute lil bushes with the clearBush() function for flagging or uncovering
function render(theDojo) {
  let result = "";
  for (let i = 0; i < theDojo.length; i++) {
    for (let j = 0; j < theDojo[i].length; j++) {
      // each square becomes a button with the bush
      result += `<button class="tatami bush" id="sq-${i}${j}" onclick="clearBush(${i}, ${j}, this)" 
            oncontextmenu="flag(this);return false;"></button>`;
    }
  }
  let x, y;
  // loop to create ninjas assigned to random squares
  for (let ninja = 1; ninja <= horde; ninja++) {
    // x and y random coordinates
    x = Math.floor(Math.random() * rows);
    y = Math.floor(Math.random() * cols);
    // if x and y randomly match a previous ninja square, try again
    if (theDojo[x][y] === true) {
      ninja--;
      // otherwise, place a ninja
    } else {
      theDojo[x][y] = true;
    }
  }
  return result;
}
// This function checks how many ninjas are hiding 
// under the adjacent (all sides and corners) squares,
// and either reveals the number of adjacent ninjas,
// reveals a ninja and ends the game,
// or on safe squares will recursively reveal adjacent safe squares.
function clearBush(i, j, element) {
  // i and j are the indexes to check theDojo 2D Array values
  // element refers to the dom element selected
  // If a shuriken is currently applied -- don't allow clearBush() to continue
  if (element.classList.contains("shuriken")) return null;
  // Adjacent ninjas count initiates at 0
  let adjacent = 0;
  if (theDojo[i][j] === false) {
    // If the box has already been cleared
    if (uncovered.includes(`${i}${j}`)) { // stop clearBush() from executing
      return null;
    } else { // otherwise, add the current square to the list of exposed squares
      uncovered.push(`${i}${j}`);
    }
    // Top Row
    if (i == 0) {
      if (theDojo[i][j + 1] === true) adjacent++;
      if (theDojo[i + 1][j + 1] === true) adjacent++;
      if (theDojo[i + 1][j] === true) adjacent++;
      if (theDojo[i][j - 1] === true) adjacent++;
      if (theDojo[i + 1][j - 1] === true) adjacent++;
      // Bottom Row
    } else if (i == theDojo.length - 1) {
      if (theDojo[i][j + 1] === true) adjacent++;
      if (theDojo[i][j - 1] === true) adjacent++;
      if (theDojo[i - 1][j + 1] === true) adjacent++;
      if (theDojo[i - 1][j] === true) adjacent++;
      if (theDojo[i - 1][j - 1] === true) adjacent++;
      // Corner
    } else if ((i == 0) && (j == 0)) {
      if (theDojo[i + 1][j] === true) adjacent++;
      if (theDojo[i][j + 1] === true) adjacent++;
      if (theDojo[i + 1][j + 1] === true) adjacent++;
      // Corner
    } else if ((i == 0) && (j == theDojo[i].length - 1)) {
      if (theDojo[i][j - 1] === true) adjacent++;
      if (theDojo[i + 1][j - 1] === true) adjacent++;
      if (theDojo[i + 1][j] === true) adjacent++;
      // Corner
    } else if ((i == theDojo.length - 1) && (j == 0)) {
      if (theDojo[i - 1][j] === true) adjacent++;
      if (theDojo[i - 1][j + 1] === true) adjacent++;
      if (theDojo[i][j + 1] === true) adjacent++;
      // Corner
    } else if ((i == theDojo.length - 1) && (j == theDojo[i].length - 1)) {
      if (theDojo[i - 1][j] === true) adjacent++;
      if (theDojo[i - 1][j - 1] === true) adjacent++;
      if (theDojo[i][j - 1] === true) adjacent++;
    } else {
      if (theDojo[i + 1][j - 1] === true) adjacent++;
      if (theDojo[i + 1][j + 1] === true) adjacent++;
      if (theDojo[i + 1][j] === true) adjacent++;
      if (theDojo[i][j + 1] === true) adjacent++;
      if (theDojo[i][j - 1] === true) adjacent++;
      if (theDojo[i - 1][j + 1] === true) adjacent++;
      if (theDojo[i - 1][j] === true) adjacent++;
      if (theDojo[i - 1][j - 1] === true) adjacent++;
    }
    element.classList.toggle("active");
    element.classList.remove("bush");
    if (adjacent == 0) {
      element.innerText = "";

      const up = document.querySelector(`#sq-${i - 1}${j}`);
      const upRight = document.querySelector(`#sq-${i - 1}${j + 1}`);
      const right = document.querySelector(`#sq-${i}${j + 1}`);
      const downRight = document.querySelector(`#sq-${i + 1}${j + 1}`);
      const down = document.querySelector(`#sq-${i + 1}${j}`);
      const downLeft = document.querySelector(`#sq-${i + 1}${j - 1}`);
      const left = document.querySelector(`#sq-${i}${j - 1}`);
      const upLeft = document.querySelector(`#sq-${i - 1}${j - 1}`);

      // Top-Left Corner clear
      if (i == 0 && j == 0) {
        clearBush(i + 1, j, down);
        clearBush(i, j + 1, right);
        clearBush(i + 1, j + 1, downRight);
        // Top-Right Corner clear
      } else if (i == 0 && j == 9) {
        clearBush(i, j - 1, left);
        clearBush(i + 1, j - 1, downLeft);
        clearBush(i + 1, j, down);
        // Bottom-Right Corner clear
      } else if (i == 9 && j == 9) {
        clearBush(i - 1, j, up);
        clearBush(i - 1, j - 1, upLeft);
        clearBush(i, j - 1, left);
        // Bottom-Left Corner clear
      } else if (i == 9 && j == 0) {
        clearBush(i - 1, j, up);
        clearBush(i - 1, j + 1, upRight);
        clearBush(i, j + 1, right);
        // Top row clearing
      } else if (i == 0) {
        clearBush(i, j + 1, right);
        clearBush(i + 1, j + 1, downRight);
        clearBush(i + 1, j, down);
        clearBush(i, j - 1, left);
        clearBush(i + 1, j - 1, downLeft);
        // Bottom row clearing
      } else if (i == 9) {
        clearBush(i, j + 1, right);
        clearBush(i, j - 1, left);
        clearBush(i - 1, j + 1, upRight);
        clearBush(i - 1, j, up);
        clearBush(i - 1, j - 1, upLeft);
        // Right column clearing
      } else if (j == 9) {
        clearBush(i - 1, j, up);
        clearBush(i + 1, j, down);
        clearBush(i + 1, j - 1, downLeft);
        clearBush(i, j - 1, left);
        clearBush(i - 1, j - 1, upLeft);
        // Left column clearing
      } else if (j == 0) {
        clearBush(i - 1, j, up);
        clearBush(i - 1, j + 1, upRight);
        clearBush(i, j + 1, right);
        clearBush(i + 1, j + 1, downRight);
        clearBush(i + 1, j, down);
        // Non-edge or corner clearing
      } else {
        clearBush(i - 1, j, up);
        clearBush(i - 1, j + 1, upRight);
        clearBush(i, j + 1, right);
        clearBush(i + 1, j + 1, downRight);
        clearBush(i + 1, j, down);
        clearBush(i + 1, j - 1, downLeft);
        clearBush(i, j - 1, left);
        clearBush(i - 1, j - 1, upLeft);
      }
    } else {
      element.innerText = adjacent;
    }
    theDojo[i][j] = adjacent;
    showScore();
    // When 90 safe squares have been uncovered
    if (uncovered.length == 90) {
      //Win message! Game OVER!
      console.log("Congratulations! You're safe... for now.");
      endgame.style.display = "flex";
      endgame.innerHTML =
        `<div class="bye">
          <h3>Success!</h3>
          <p>You evaded the ninja, and will live to see another day!</p>
          <p>You find a discarded sandwich and chomp cheerfully into the sunset!</p>
          <p>Vaya con Dios, soldier...</p>
        <div>`;
      endgame.style.color = "chartreuse";
      endgame.style.textStroke = "violet";
      play("chomp.wav");
      endgame.innerHTML += (`<button id="restart" onclick="location.reload()">Play Again?</button>`);
    }
    // If a ninja is on the square clicked
  } else if (theDojo[i][j] === true) {
    // Reveal all ninjas
    for (let p = 0; p < 10; p++) {
      for (let q = 0; q < 10; q++) {
        if (theDojo[p][q] === true) {
          //array of ninja PNG differentiation
          const ninjas = ["", "1", "2"];
          //random number between 0-2
          let rand = Math.floor(Math.random() * 3);
          let nin = document.querySelector(`#sq-${p}${q}`);
          // Apply randomized ninja to square
          nin.classList.remove("bush");
          nin.classList.add(`ninja${ninjas[rand]}`);
          nin.style.backgroundColor = "crimson";
        }
      }
    }
    showScore();
    var deliver = Math.floor(Math.random() * 3);
    const sound = ["twig.mp3", "sniff.mp3", "sneeze.mp3"];
    play(sound[deliver]);
    endgame.style.display = "flex";
    // Random 'loser' message from list of 3
    const loser = [
      `<div class="bye">
        <p>You come up behind a ninja eating a sandwich.</p>
        <p>A twig snaps beneath your toes.</p>
        <p>The sandwich falls to the ground.</p>
        <h3>Game Over!</h3>
      </div>`,
      `<div class="bye">
        <p>The breeze changes direction.</p>
        <p>They've caught your scent.</p>
        <p>The trees around you rustle as the ninja swarm!</p>
        <h3>Game Over!</h3>
      <div>`,
      `<div class="bye">
        <p>**Achoo!**</p>
        <p>Did that bush just sneeze?</p>
        <p>The ninja assasins hone in before you can flee!</p>
        <h3>Game Over!</h3>
      <div>`
    ];
    endgame.innerHTML = (loser[deliver]);
    // Add Restart button to the end of the message
    endgame.innerHTML += (`<button id="restart" onclick="location.reload()">Restart</button>`);
    endgame.style.display = "flex";
  }
}
// Flag or Shuriken fn: right-click to toggle a shuriken on a square
function flag(el) {
  // If it's a bush -- Allow Shuriken-flag
  if (el.classList.contains("bush")) el.classList.toggle("shuriken");
  if (el.classList.contains("shuriken")) play("shurikenThrow.mp3");
  showScore();
  return false;
}
dojoDiv.innerHTML = render(theDojo);
// Display leftover spaces to clear 
// & the difference of shuriken applied to ninja hiding
let showScore = () => {
  let leftover = rows * cols - horde - uncovered.length;
  let cntdwn = document.querySelector("#countdown");
  let shuri = 0;
  for (let p = 0; p < 10; p++) {
    for (let q = 0; q < 10; q++) {
      let nin = document.querySelector(`#sq-${p}${q}`)
      if (nin.classList.contains("shuriken")) shuri++;
    }
  }
  let ratio = horde - shuri;
  cntdwn.innerHTML = `
        <div class="numbers">${ratio}</div>
        <div class="numbers">${leftover}</div>
    `;

}

// let changeChallenge = (mode) => {
//     switch(mode){
//         case 0:
//             // Default mode is 10x10 with 10 ninja
//             horde = 10;
//             rows = 10;
//             cols = 10;
//             theDojo = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false))
//             dojoDiv.innerHTML = render(theDojo);
//             break;
//         case 1:
//             // Easy mode is 8x8 with 5 ninja
//             horde = 5;
//             rows = 8;
//             cols = 10;
//             theDojo = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false))
//             dojoDiv.style.width = "256px";
//             dojoDiv.innerHTML = render(theDojo);
//             break;
//         case 2:
//             // Hard mode is 30x16 with 25 ninja?
//             horde = 25;
//             rows = 20;
//             cols = 10;
//             theDojo = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false))
//             dojoDiv.innerHTML = render(theDojo);
//             dojoDiv.style.width = "512px";
//             break;
//     }
// }
// changeChallenge(2)

wowList = ["wowc.mp3", "wowd.mp3", "wowf.mp3", "wowh.mp3", "wowi.mp3", "wowl.mp3", "wown.mp3", "wowq.mp3", "wowr.mp3", "wows.mp3", "wowy.mp3", "wowz.mp3"];
const wow = () => {
  let rand = Math.floor(Math.random() * wowList.length);
  play(wowList[rand]);
}
const play = (mp3) => {
  var audio = new Audio("./assets/" + mp3);
  audio.loop = false;
  audio.play();
}
//Instructions hover on game title function:
const showInstructions = () => {
  instr = document.querySelector("#instr");
  title = document.querySelector("#title");
  const displayInstructions = () => instr.style.display = "flex";
  const disappear = () => instr.style.display = "none";
  //On hover, display
  title.addEventListener("mouseover", displayInstructions);
  title.addEventListener("touchstart", displayInstructions);
  //On exit, hide
  title.addEventListener("mouseleave", disappear);
  title.addEventListener("touchend", disappear);

}
showInstructions();

// Tutorial slide array
tutortSlides = [
  `
    <p><em>Click anywhere!</em></p>
    <p>The 1st move is always blind luck...</p>
    <p>Not every click will reveal enough to use against the ninja.</p>
    <p>Blank spaces are safe, numbers indicate how many ninjas touch that square adjacently, and you'll know when you've clicked a ninja. It happens.</p>
  `,
  `
    <p>Basic Strategy:</p>
    <em><ul id="tips">
    <li>Approach islands and corners first</li>
    <li>Look for number squares that only touch the same amount of bushes</li>
    <li>Right-Click on a bush to flag it as a ninja square</li>
    <li>With ninja squares marked, you can deduce which squares are safe to clear</li>
    </ul></em>
  `,
  `
    <p><em>Vague Counters</em></p>
    <p>No minesweeper game is complete without mysterious number boxes outside of the grid</p>
    <p>The left shows how many shuriken are applied, minus the total number of hidden ninja</p>
    <p>The right marks the remaining safe spaces to clear, 0 marking a game win</p>
  `,
  `
    <p>Pitfalls: Hubris</p>
    <p><em>Trust the numbers!</em></p>
    <p>If you flag a square that isn't hiding a ninja, it's up to you to correct it and clear it to win the game.</p>
    <p><em>Remove a shuriken with another right-click (long-press).</em></p>
  `,
  `
    <p>Pitfalls: Chance</p>
    <p><em>Luck may end the game</em></p>
    <p>Chance might place a set of bush that can't be cleared with deduction alone.</p>
    <p><em>Deal with it</em></p>
    <p>Sometimes you'll need to leave it to chance, pick one and go for it.</p>
  `
];
// Tutorial slide index
let current = 0;
tut = document.querySelector("#tutorialWindow");
// Display tutorial over game and initiate keyboard navigation
const showTutorial = () => {
  let tutImage = document.querySelector('.tutImage');
  tutImage.id = `tutImage${current + 1}`; // Set the image id based on the current slide
  const back = document.querySelector("#back");
  back.title = current === 0 ? "close tutorial" : "back";
  back.onclick = current === 0 ? closeTutorial : lastSlide;
  const next = document.querySelector("#next");
  next.title = current === tutortSlides.length - 1 ? "close tutorial" : "next";
  next.onclick = current === tutortSlides.length - 1 ? closeTutorial : nextSlide;
  const cap = document.querySelector("#cap");
  cap.innerHTML = tutortSlides[current];
  tut.style.display = "flex";
  //-accept or spacebar progression
  document.addEventListener("keydown", tutorialNavigator);

  // Swipeable navigation of tutorial for touchscreens/mobile
  let touchstartX = 0, touchendX = 0;
  function checkDirection() {
    if (touchendX < touchstartX) nextSlide();
    if (touchendX > touchstartX) lastSlide();
  }
  document.addEventListener("touchstart", e => touchstartX = e.changedTouches[0].screenX)
  document.addEventListener("touchend", e => {
    touchendX = e.changedTouches[0].screenX;
    checkDirection();
  })
}

// Keystrokes for tutorial navigation
const tutorialNavigator = (e) => {
  e.preventDefault();
  if (e.key === "ArrowLeft") {
    return lastSlide();
  } else if (e.key === "Escape") {
    return closeTutorial();
  } else if (e.key === "ArrowRight") {
    return nextSlide();
  } else if (e.key === " ") {
    if (current == tutortSlides.length - 1) {
      return closeTutorial();
    }
    return nextSlide();
  }
}

//forward or close tutorial
const nextSlide = () => {
  if (current == tutortSlides.length - 1) {
    closeTutorial();
  } else {
    current++;
    showTutorial();
  }
}

//backwards or close tutorial
const lastSlide = () => {
  if (current == 0) {
    closeTutorial();
  } else {
    current--;
    showTutorial();
  }
}

const closeTutorial = () => {
  tut.style.display = "none";
  current = 0;
  document.removeEventListener("keydown", tutorialNavigator);
}

// message to console when the game loads
const style = "color:cyan;font-size:1.5rem;font-weight:bold;";
console.log("%c" + "What's this?", style);
console.log("%c" + "You've discovered a strange map along the edge of the bush.", style);
console.table(theDojo);
console.log("%c" + "Perhaps it holds ninja secrets!", style);