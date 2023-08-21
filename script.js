// ---------------- CONSTANTS AND VARIABLES ---------------- //
// Constants
const username = document.getElementById('username');
const name = prompt("Enter your name.", "Guest");
// const name = "Guest";
const card = document.querySelectorAll('.card');
const turnBox = document.querySelectorAll('.turn');
const modal = document.getElementById('modal');
const winStatus = document.getElementById('winStatus');
const modalDisplay = document.getElementById('modalDisplay');

// Let Variables
let winCountX = 0;
let winCountO = 0;
let gameOver = false;
let draw = true;
let turn = 'X';
let turns = 0;

// ----------------------- DEFAULTS ----------------------- //
// Username 
if (name === "Guest") {
    let randomNumber = Math.floor((1 + Math.random() * 10000));
    username.innerHTML = "Welcome, " + name + randomNumber;
} else {
    username.innerHTML = "Welcome, " + name;
}


// ------------------------ LOGICS ------------------------ //
// Game Logic
card.forEach(element => {
    element.addEventListener('click', () => {
        // ---------------- CREATING GAME ELEMENTS ---------------- //
        // Creating the CIRCLE Element.
        const circle = document.createElement('div');
        circle.className = 'circle';

        // Creating the CROSS Element.
        const cross = document.createElement('div');
        const bar1 = document.createElement('div');
        const bar2 = document.createElement('div');
        cross.appendChild(bar1);
        cross.appendChild(bar2);
        cross.className = 'cross';
        bar1.className = 'bar1';
        bar2.className = 'bar2';

        if (element.innerHTML === '') {
            // Gameover Logic
            if (turns >= 9) {
                gameOver = true;
            }

            if (turn === 'X') {
                element.appendChild(cross);
            } else {
                element.appendChild(circle);
            }
            checkWin();
            if (!gameOver) {
                changeTurn();
            } else {
                if (draw) {
                    modalDisplay.appendChild(cross);
                    modalDisplay.appendChild(circle);
                    winStatus.innerHTML = 'DRAW!';
                    modal.showModal();
                } else {
                    if (turn === 'X') {
                        modalDisplay.appendChild(cross);
                    } else {
                        modalDisplay.appendChild(circle);
                    }
                    winStatus.innerHTML = 'WINNER!';
                    modal.showModal();
                }
            }
        }
    });
});

// Turn Change Logic
function changeTurn() {
    if (turn === 'X') {
        turn = 'O';
        turns++;
        turnBox[0].classList.remove('active');
        turnBox[1].classList.add('active');
    } else {
        turn = 'X';
        turns++;
        turnBox[1].classList.remove('active');
        turnBox[0].classList.add('active');
    }
}

// Winning Logic
function checkWin() {
    let cardText = document.getElementsByClassName('card');
    let winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    winningConditions.forEach(e => {
        if ((cardText[e[0]].innerHTML === cardText[e[1]].innerHTML) && (cardText[e[1]].innerHTML === cardText[e[2]].innerHTML) && (cardText[e[0]].innerHTML !== "")) {
            if (turn === 'X') {
                winCountX++;
            } else {
                winCountO++;
            }
            draw = false;
            gameOver = true;
            document.getElementById('gameGrid').classList.add('hide-grid');
            document.getElementById('winCountX').innerHTML = winCountX;
            document.getElementById('winCountO').innerHTML = winCountO;
        }
    });
}

// Resetting Logic
function reset() {
    card.forEach(element => {
        element.innerHTML = '';
    });
    draw = true;
    gameOver = false;
    turn = 'X';
    turns = 1;
    modal.close();
    modalDisplay.innerHTML = '';
    turnBox[1].classList.remove('active');
    turnBox[0].classList.add('active');
}

function closeModal() {
    winCountO = 0;
    winCountX = 0;
    document.getElementById('winCountX').innerHTML = winCountX;
    document.getElementById('winCountO').innerHTML = winCountO;
    reset();
}

function showResults() {
    // ------------- GENERATING RESULTS ------------- //
    const result = document.createElement('div');
    const pX = document.createElement('p');
    const pO = document.createElement('p');
    const winner = document.createElement('h2');
    let winnerElement;

    if (winCountX > winCountO) {
        winnerElement = 'X';
    } else {
        winnerElement = 'O';
    }

    result.className = 'result';
    pX.className = 'result-text';
    pO.className = 'result-text';
    winner.className = 'winner-name';

    pX.innerHTML = "X's wins: " + winCountX;
    pO.innerHTML = "O's wins: " + winCountO;
    winner.innerHTML = winnerElement + ' WINS';

    result.append(pX, pO, winner);
    modalDisplay.innerHTML = '';
    winStatus.innerHTML = '';
    modalDisplay.appendChild(result);
}
