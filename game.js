// 2D Array Gameboard rows, columns, and array initializer
const rows = 10, cols = 10;
const theDojo = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false));
// Div containing the gameboard
var dojoDiv = document.querySelector("#the-dojo");
// Container for the gameover message
var endgame = document.querySelector('#gameover');
// gameClock tracks how many squares are exposed/flagged to determine if the game is over.
var gameClock = 0;
// uncovered list holds squares exposed
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
    // x and y will comprise 10 random coordinates on the board
    var x, y;
    // loop to create 10 ninjas assigned to random squares
    for (var ninja = 1; ninja <= 10; ninja++) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        // if x and y randomly match a previous ninja square, try again
        if (theDojo[x][y] == 'ninja') {
            ninja--;
        // otherwise, place a ninja
        } else {
            theDojo[x][y] = 'ninja';
        }
    }
    return result;
}
// This function tells us how many ninjas are hiding 
// under the adjacent (all sides and corners) squares.
// Use i and j as the indexes to check theDojo.
function clearBush(i, j, element) {
    // If a shuriken is applied
    if (element.classList.contains('shuriken')) {
    // don't allow clearBush() to continue
        return null
    }
    var adjacent = 0;
    if (theDojo[i][j] == 0) {
        // If the box has already been cleared
        if (uncovered.includes(`${i}${j}`)) {
        // stop clearBush() from executing further
            return null
        } else {
        // otherwise, add the current square to the list of exposed squares
            uncovered.push(`${i}${j}`)
        }
        // Top Row
        if (i == 0) {
            if (theDojo[i][j + 1] === 'ninja') {
                adjacent++;
            }
            if (theDojo[i + 1][j + 1] === 'ninja') {
                adjacent++;
            }
            if (theDojo[i + 1][j] === 'ninja') {
                adjacent++;
            }
            if (theDojo[i][j - 1] === 'ninja') {
                adjacent++;
            }
            if (theDojo[i + 1][j - 1] === 'ninja') {
                adjacent++;
            }
        // Bottom Row
        } else if (i == 9) {
            if (theDojo[i][j + 1] === 'ninja') {
                adjacent++;
            }
            if (theDojo[i][j - 1] === 'ninja') {
                adjacent++;
            }
            if (theDojo[i - 1][j + 1] === 'ninja') {
                adjacent++;
            }
            if (theDojo[i - 1][j] === 'ninja') {
                adjacent++;
            }
            if (theDojo[i - 1][j - 1] === 'ninja') {
                adjacent++;
            }
        // Corner
        } else if ((i == 0) && (j == 0)) {
            if (theDojo[i + 1][j] === 'ninja') {
                adjacent++;
            }
            if (theDojo[i][j + 1] === 'ninja') {
                adjacent++;
            }
            if (theDojo[i + 1][j + 1] === 'ninja') {
                adjacent++;
            }
        // Corner
        } else if ((i == 0) && (j == 9)) {
            if (theDojo[i][j - 1] === 'ninja') {
                adjacent++;
            }
            if (theDojo[i + 1][j - 1] === 'ninja') {
                adjacent++;
            }
            if (theDojo[i + 1][j] === 'ninja') {
                adjacent++;
            }
        // Corner
        } else if ((i == 9) && (j == 0)) {
            if (theDojo[i - 1][j] === 'ninja') {
                adjacent++;
            }
            if (theDojo[i - 1][j + 1] === 'ninja') {
                adjacent++;
            }
            if (theDojo[i][j + 1] === 'ninja') {
                adjacent++;
            }
        // Corner
        } else if ((i == 9) && (j == 9)) {
            if (theDojo[i - 1][j] === 'ninja') {
                adjacent++;
            }
            if (theDojo[i - 1][j - 1] === 'ninja') {
                adjacent++;
            }
            if (theDojo[i][j - 1] === 'ninja') {
                adjacent++;
            }
        } else {
            if (theDojo[i + 1][j - 1] === 'ninja') {
                adjacent++;
            }
            if (theDojo[i + 1][j + 1] === 'ninja') {
                adjacent++;
            }
            if (theDojo[i + 1][j] === 'ninja') {
                adjacent++;
            }
            if (theDojo[i][j + 1] === 'ninja') {
                adjacent++;
            }
            if (theDojo[i][j - 1] === 'ninja') {
                adjacent++;
            }
            if (theDojo[i - 1][j + 1] === 'ninja') {
                adjacent++;
            }
            if (theDojo[i - 1][j] === 'ninja') {
                adjacent++;
            }
            if (theDojo[i - 1][j - 1] === 'ninja') {
                adjacent++;
            }
        }
        gameClock++;
        console.log(gameClock)
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
                uncovered.includes(`${i+1}${j}`) ? clearBush(i+1,j,down) : ""
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
        if (gameClock == 90) {//"gameClock" tracks non-ninja squares uncovered
            console.log("Congratulations! You're safe, for now.")
            endgame.style.display = 'flex';
            endgame.innerHTML = (`<div><h4>Game Over!</h4<br><br><br>You evaded the ninjas, and will live to see another day!<br><br> You find a discarded sandwich and chomp cheerfully into the Sunset!<div>`)
            // endgame.style.fontSize = "110%";
            endgame.style.color = 'violet';
            endgame.innerHTML += (`<button id="restart" onclick="location.reload()">Restart</button>`);
        }
    // If a ninja is on the square clicked
    } else if (theDojo[i][j] == 'ninja') {
        // Reveal all other ninjas
        for(let p = 0; p < 10; p++){
            for(let q = 0; q <10; q++){
                if (theDojo[p][q] == 'ninja'){
                    let nin = document.querySelector(`#sq-${p}${q}`)
                    // Apply Ninja gif to square
                    nin.style.backgroundImage = "url('assets/ninja.gif')";
                    nin.style.backgroundSize = "contain";
                }
            }
        }
        
        endgame.style.display= 'flex';
        // Random 'loser' message from list of 3
        const loser = [`<div>You sneak up on a Ninja resting and eating a sandwich.<br><br> A twig snaps beneath your toes and you\'re instantly spotted.<br><br><h3>Game Over!</h3>`, `<div>It seems that you\'re up-wind, because they just smelled you.<br><br> The trees around you rustle as the ninja swarm!<br><br><h3>Game Over!</h3><div>`, `<div>**Achoo**<br>That smiling bush back there just sneezed.<br><br> The ninja assasins hone in before you can get away from the bush! <br><br><h3>Game Over!</h3><div>`]
        var deliver = Math.floor(Math.random()*3);
        endgame.innerHTML = (loser[deliver])
        // Add Restart button to the end of the message
        endgame.innerHTML += (`<button id="restart" onclick="location.reload()">Restart</button>`);
        endgame.style.display= 'flex';
    }
}
// Flag or Shuriken fn: right-click to toggle a shuriken on a square
function flag(element) {
    element.classList.toggle("shuriken")
    return false;
}


dojoDiv.innerHTML = render(theDojo);

//Append instructions elsewhere -- alert() does not deliver tastefully
// setTimeout(function () {
    //     alert('Welcome to NinjaSweeper!\r\nInstructions: Numbers under a bush square are the amount of ninjas adjacent to that square. Right click to throw shuriken at the Ninjas, and steer clear of their positions. Try to uncover all the bushes that the ninjas aren\'t hiding under. Good Luck!')
    // },
    //     0.5 * 1000)
    
    
    
    // message to greet a clever developers
    var style = "color:cyan;font-size:1.5rem;font-weight:bold;";
    console.log("%c" + "What's this?", style);
    console.log("%c" + "You've discovered a strange map along the edge of the bush.", style);
    console.table(theDojo);
    console.log("%c" + "Perhaps it holds ninja secrets!", style);