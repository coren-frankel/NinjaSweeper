// 2D Array Gameboard rows, columns, and array initializer
const rows = 10, cols = 10;
const theDojo = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false));
// Div containing the gameboard
var dojoDiv = document.querySelector("#the-dojo");
// Container for the gameover message
var endgame = document.querySelector('#gameover');
// gameClock tracks how many squares are exposed/flagged to determine if the game is over.
var gameClock = 0;
// Renders all rows of theDojo as cute lil bushes with the howMany() function for flagging or uncovering
function render(theDojo) {
    // x and y will represent 10 random places on the board
    var x, y;
    var result = "";
    for (var i = 0; i < theDojo.length; i++) {
        for (var j = 0; j < theDojo[i].length; j++) {
            // each square becomes a button with the bush
            // onclick triggers the howMany fn
            // right click "flags" the square with a shuriken
            result += `<button class="tatami bush" onclick="howMany(${i}, ${j}, this)" 
            oncontextmenu="flag(this);return false;"></button>`;
        }
    }
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
function howMany(i, j, element) {
    var adjacent = 0;
    if (theDojo[i][j] == 0) {
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
            // return howMany(i+1,j+1,theDojo[i+1][j+1])
        } else {
            element.innerText = adjacent;
        }
        theDojo[i][j] = adjacent
        if (gameClock == 90) {//Game clock tracks non-ninja squares uncovered
            console.log("Congratulations! You're safe, for now.")
            endgame.style.display= 'flex';
            endgame.innerHTML = (`<div><h4>Game Over!</h4>You evaded the ninjas, and will live to see another day! You take a Ninja's half-eaten sandwich and chomp peacefully into the Sunset.<div>`)
            endgame.style.color = 'blue';
            endgame.innerHTML += (`<button id="restart" onclick="location.reload()">restart</button>`);
        }
    } else if (theDojo[i][j] == 'ninja') {
        // var doom = document.querySelectorAll('.tatami');
        element.style.backgroundImage = "url('assets/ninja.gif')";
        element.style.backgroundSize = "contain";
        // setTimeout(function () {
        //     for (var horde = 0; horde < 10; i++) {
        //         for (var ninja = 1; ninja <= 10; ninja++) {
        //         x = Math.floor(Math.random() * 9);
        //         y = Math.floor(Math.random() * 9);
        //         if (theDojo[x][y] == 'ninja') {
        //             ninja--;
        //         }
        //         if (theDojo[x][y] >= 0) {
        //             theDojo[x][y] = 'ninja';
        //         }
        //         }
        //     }
        // }, 0.5*1000);
        endgame.style.display= 'flex';
        var deliver = Math.floor(Math.random()*3);
        if (deliver == 0) {
            endgame.innerHTML = (`<div>You sneak up on a Ninja resting and eating a sandwich. A twig snaps beneath your toes and you\'re instantly spotted.<h4>Game Over!</h4><div>`)
        } else if (deliver == 1) {
            endgame.innerHTML = (`<div>It appears that you\'re up-wind, because they just smelled you. The trees around you rustle  as the ninja swarm.<h4>Game Over!</h4><div>`)
        } else if (deliver == 2) {
            endgame.innerHTML = (`<div>**Achoo** That smiling bush back there just sneezed. The ninja assasins hone in before you can get away from the bush.<h4>Game Over!</h4><div>`)
        }
        // endgame.innerHTML = (`<div><h4>Game Over!</h4>The Ninja Assasins have found you!<div>`)
        endgame.innerHTML += (`<button id="restart" onclick="location.reload()">Restart</button>`);
        endgame.style.display= 'flex';
    }
}
// Flag or Shuriken fn: right-click to toggle a shuriken on a square
function flag(element) {
    element.classList.toggle("shuriken")
    return false;
}
//    dojoDiv.innerHTML = `<button onclick="location.reload()">restart</button>`;

// start the game
// message to greet a user of the game
var style = "color:cyan;font-size:1.5rem;font-weight:bold;";
console.log("%c" + "IF YOU ARE A DOJO STUDENT...", style);
console.log("%c" + "GOOD LUCK THIS IS A CHALLENGE!", style);

// adds the rows of buttons into <div id="the-dojo"></div> 
dojoDiv.innerHTML = render(theDojo);
// setTimeout(function () {
//     alert('Welcome to NinjaSweeper!\r\nInstructions: Numbers under a bush square are the amount of ninjas adjacent to that square. Right click to throw shuriken at the Ninjas, and steer clear of their positions. Try to uncover all the bushes that the ninjas aren\'t hiding under. Good Luck!')
// },
//     0.5 * 1000)
// Uncomment below to display the hidden values in console on load ya cheater:
// console.table(theDojo);