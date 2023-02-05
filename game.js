// Here's a big fat JS file for a Minesweeper game!
// Author: Coren Frankel 2022/23
// 2D Array Gameboard rows, columns, and array initializer
const rows = 10, cols = 10;
const theDojo = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false));
// Div containing the gameboard
var dojoDiv = document.querySelector("#the-dojo");
// Container for the gameover message
var endgame = document.querySelector(".gameover");
// uncovered list of squares exposed
var uncovered = []
// Renders all rows of theDojo as cute lil bushes with the clearBush() function for flagging or uncovering
function render(theDojo) {
    var result = "";
    for (var i = 0; i < theDojo.length; i++) {
        for (var j = 0; j < theDojo[i].length; j++) {
            // each square becomes a button with the bush
            // onclick triggers the clearBush fn
            // right click "flags" the square with a shuriken
            result += `<button class="tatami bush" id="sq-${i}${j}" onclick="clearBush(${i}, ${j}, this)" 
            oncontextmenu="flag(this);return false;"></button>`;
        }
    }
    var x, y;
    // loop to create 10 ninjas assigned to random squares
    for (var ninja = 1; ninja <= 10; ninja++) {
        // x and y will comprise 10 random coordinates on the board
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
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
    // If a shuriken is currently applied
    if (element.classList.contains("shuriken")) {
    // don't allow clearBush() to continue
        return null
    }
    // Adjacent ninjas count initiates at 0
    var adjacent = 0;
    if (theDojo[i][j] === false) {
        // If the box has already been cleared
        if (uncovered.includes(`${i}${j}`)) {
        // stop clearBush() from executing
            return null
        } else {
        // otherwise, add the current square to the list of exposed squares
            uncovered.push(`${i}${j}`)
        }
        // Top Row
        if (i == 0) {
            if (theDojo[i][j + 1] === true) {
                adjacent++;
            }
            if (theDojo[i + 1][j + 1] === true) {
                adjacent++;
            }
            if (theDojo[i + 1][j] === true) {
                adjacent++;
            }
            if (theDojo[i][j - 1] === true) {
                adjacent++;
            }
            if (theDojo[i + 1][j - 1] === true) {
                adjacent++;
            }
        // Bottom Row
        } else if (i == 9) {
            if (theDojo[i][j + 1] === true) {
                adjacent++;
            }
            if (theDojo[i][j - 1] === true) {
                adjacent++;
            }
            if (theDojo[i - 1][j + 1] === true) {
                adjacent++;
            }
            if (theDojo[i - 1][j] === true) {
                adjacent++;
            }
            if (theDojo[i - 1][j - 1] === true) {
                adjacent++;
            }
        // Corner
        } else if ((i == 0) && (j == 0)) {
            if (theDojo[i + 1][j] === true) {
                adjacent++;
            }
            if (theDojo[i][j + 1] === true) {
                adjacent++;
            }
            if (theDojo[i + 1][j + 1] === true) {
                adjacent++;
            }
        // Corner
        } else if ((i == 0) && (j == 9)) {
            if (theDojo[i][j - 1] === true) {
                adjacent++;
            }
            if (theDojo[i + 1][j - 1] === true) {
                adjacent++;
            }
            if (theDojo[i + 1][j] === true) {
                adjacent++;
            }
        // Corner
        } else if ((i == 9) && (j == 0)) {
            if (theDojo[i - 1][j] === true) {
                adjacent++;
            }
            if (theDojo[i - 1][j + 1] === true) {
                adjacent++;
            }
            if (theDojo[i][j + 1] === true) {
                adjacent++;
            }
        // Corner
        } else if ((i == 9) && (j == 9)) {
            if (theDojo[i - 1][j] === true) {
                adjacent++;
            }
            if (theDojo[i - 1][j - 1] === true) {
                adjacent++;
            }
            if (theDojo[i][j - 1] === true) {
                adjacent++;
            }
        } else {
            if (theDojo[i + 1][j - 1] === true) {
                adjacent++;
            }
            if (theDojo[i + 1][j + 1] === true) {
                adjacent++;
            }
            if (theDojo[i + 1][j] === true) {
                adjacent++;
            }
            if (theDojo[i][j + 1] === true) {
                adjacent++;
            }
            if (theDojo[i][j - 1] === true) {
                adjacent++;
            }
            if (theDojo[i - 1][j + 1] === true) {
                adjacent++;
            }
            if (theDojo[i - 1][j] === true) {
                adjacent++;
            }
            if (theDojo[i - 1][j - 1] === true) {
                adjacent++;
            }
        }
        element.classList.toggle("active");
        element.classList.remove("bush");
        if (adjacent == 0){
            element.innerText = ""
            
            var up = document.querySelector(`#sq-${i-1}${j}`)
            var upRight = document.querySelector(`#sq-${i-1}${j+1}`)
            var right = document.querySelector(`#sq-${i}${j+1}`)
            var downRight = document.querySelector(`#sq-${i+1}${j+1}`)
            var down = document.querySelector(`#sq-${i+1}${j}`)
            var downLeft = document.querySelector(`#sq-${i+1}${j-1}`)
            var left = document.querySelector(`#sq-${i}${j-1}`)
            var upLeft = document.querySelector(`#sq-${i-1}${j-1}`)
            
            // Top-Left Corner clear
            if (i == 0 && j == 0) {
                clearBush(i+1,j,down)
                clearBush(i,j+1,right)
                clearBush(i+1,j+1,downRight)
            // Top-Right Corner clear
            } else if (i == 0 && j == 9) {
                clearBush(i,j-1,left)
                clearBush(i+1,j-1,downLeft)
                clearBush(i+1,j,down)
            // Bottom-Right Corner clear
            } else if (i == 9 && j == 9) {
                clearBush(i-1,j,up)
                clearBush(i-1,j-1,upLeft)
                clearBush(i,j-1,left)
            // Bottom-Left Corner clear
            } else if (i == 9 && j == 0) {
                clearBush(i-1,j,up)
                clearBush(i-1,j+1,upRight)
                clearBush(i,j+1,right)
            // Top row clearing
            } else if (i == 0) {
                clearBush(i,j+1,right)
                clearBush(i+1,j+1,downRight)
                clearBush(i+1,j,down)
                clearBush(i,j-1,left)
                clearBush(i+1,j-1,downLeft)
            // Bottom row clearing
            } else if (i == 9) {
                clearBush(i,j+1,right)
                clearBush(i,j-1,left)
                clearBush(i-1,j+1,upRight)
                clearBush(i-1,j,up)
                clearBush(i-1,j-1,upLeft)
            // Right column clearing
            } else if (j == 9) {
                clearBush(i-1,j,up)
                clearBush(i+1,j,down)
                clearBush(i+1,j-1,downLeft)
                clearBush(i,j-1,left)
                clearBush(i-1,j-1,upLeft)
            // Left column clearing
            } else if (j == 0) {
                clearBush(i-1,j,up)
                clearBush(i-1,j+1,upRight)
                clearBush(i,j+1,right)
                clearBush(i+1,j+1,downRight)
                clearBush(i+1,j,down)
            // Non-edge or corner clearing
            } else {
                clearBush(i-1,j,up)
                clearBush(i-1,j+1,upRight)
                clearBush(i,j+1,right)
                clearBush(i+1,j+1,downRight)
                clearBush(i+1,j,down)
                clearBush(i+1,j-1,downLeft)
                clearBush(i,j-1,left)
                clearBush(i-1,j-1,upLeft)
            }
        } else {
            element.innerText = adjacent;
        }
        theDojo[i][j] = adjacent
        // When 90 safe squares have been uncovered
        if (uncovered.length == 90) {
            //Win message! Game OVER!
            console.log("Congratulations! You're safe, for now.")
            endgame.style.display = "flex";
            endgame.innerHTML = (`<div class="bye"><h3>Game Over!</h3><p>You evaded the ninjas, and will live to see another day!</p><p>You find a discarded sandwich and chomp cheerfully into the Sunset!</p><p>Vaya con Dios, soldier...</p><div>`)
            endgame.style.color = "violet";
            play("chomp.wav")
            endgame.innerHTML += (`<button id="restart" onclick="location.reload()">Play Again?</button>`);
        }
    // If a ninja is on the square clicked
    } else if (theDojo[i][j] === true) {
        // Reveal all other ninjas
        for(let p = 0; p < 10; p++){
            for(let q = 0; q <10; q++){
                if (theDojo[p][q] === true){
                    //array of ninja PNG differentiation
                    let ninjas = ["","(1)","(2)"]
                    //random number between 0-2
                    let rand = Math.floor(Math.random()*3)
                    let nin = document.querySelector(`#sq-${p}${q}`)
                    // Apply randomized ninja to square
                    nin.style.backgroundImage = `url("assets/ninja${ninjas[rand]}.png")`;
                    nin.style.backgroundColor = "crimson";
                }
            }
        }
        
        var deliver = Math.floor(Math.random()*3);
        const sound = ["twig.mp3","sniff.mp3","sneeze.mp3"]
        play(sound[deliver])
        endgame.style.display= "flex";
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
        ]
        endgame.innerHTML = (loser[deliver])
        // Add Restart button to the end of the message
        endgame.innerHTML += (`<button id="restart" onclick="location.reload()">Restart</button>`);
        endgame.style.display= "flex";
    }
}
// Flag or Shuriken fn: right-click to toggle a shuriken on a square
function flag(element) {
    // If it's a bush
    if (element.classList.contains("bush")){
        // Allow Shuriken-flag
        element.classList.toggle("shuriken")
    }
    return false;
}


dojoDiv.innerHTML = render(theDojo);


wowList = ["wowc.mp3","wowd.mp3","wowf.mp3","wowh.mp3","wowi.mp3","wowl.mp3","wown.mp3","wowq.mp3","wowr.mp3","wows.mp3","wowy.mp3","wowz.mp3"]
const wow = () => {
    let rand = Math.floor(Math.random()*wowList.length)
    play(wowList[rand])
}
const play = (mp3) => {
    var audio = new Audio("./assets/"+mp3);
    audio.loop = false;
    audio.play();
}
//Instructions hover on game title function:
const showInstructions = () => {
    instr = document.querySelector("#instr");
    title = document.querySelector("#title")
    const displayInstructions = () => {
        instr.style.display="block"
        instr.style.padding="20px"
        instr.innerHTML = "<h3>Welcome to Ninja Sweeper!</h3>\
            <p>How to Play:</p> \
            <ul>\
            <li>Click(press) the lil bushsters <img src=\"./assets/bush.png\" alt=\"bushster\" class=\"tatami\"> to clear the board</li>\
            <li>Right-click(long press) on bushels to place shuriken <img src=\"./assets/star.png\" alt=\"shuriken\" class=\"tatami\"> or \"flags\" on suspected ninja locations</li>\
                <ul>\
                    <li class=\"sub\">Squares with shuriken placed on them are unclickable</li>\
                    <li class=\"sub\">Right-click(long press) again to remove the shuriken</li>\
                </ul>\
            <li id=\"numbs\"><span>Numbers on a square (i.e.</span><div class=\"tatami\" id=\"ex\">4</div><span>) indicate how many ninjas are surrounding it.</span></li>\
            <li>Use the numbers to deduce and uncover all the unoccupied squares to win!</li>\
            </ul><br>\
            <p>For a more in depth tutorial, find the <span class=\"info\">i</span> button.</p>\
            <h3><em>Good Luck!</em></h3>"
    }
    const disappear = () => {
        instr.style.display="none"
    }
    //On hover, display
    title.addEventListener("mouseenter",displayInstructions)
    title.addEventListener("click",displayInstructions)
    //On exit, hide
    title.addEventListener("mouseleave",disappear)
}
showInstructions()

tut = document.querySelector("#tutorialWindow");
const showTutorial = () => {
    //To-Do: 
    //-reveal gif of the starting moves
    //-render a description side-bar
    tut.innerHTML = "\
        <div id=\"cap\">\
            <p>The 1st move is always blind luck...</p>\
            <p>Click anywhere!</p>\
            <p>Not every click will reveal enough to use against the ninja.</p>\
            <p>But once you've cleared some bushes you can get to work!</p>\
        </div>\
        <div id=\"tutImage\"></div>\
        <button class=\"info\" id=\"close\" onclick=\"closeTutorial()\">x</button>\
    "
    //-accept clicks or spacebar progression
    //-make "x" close button to ditch the tutorial
}
const closeTutorial = () => {
    tut.style.display = "none";
}
    // message to greet a clever developers
    var style = "color:cyan;font-size:1.5rem;font-weight:bold;";
    console.log("%c" + "What's this?", style);
    console.log("%c" + "You've discovered a strange map along the edge of the bush.", style);
    console.table(theDojo);
    console.log("%c" + "Perhaps it holds ninja secrets!", style);