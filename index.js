

// 0-1-2
// -5-6
// 7-8-9

let squares = [];
let playerXMoves = [];
let playerOMoves = [];
const size = {rows: 3, cols: 3};
let winPatterns = [
    ["0","1","2"],
    ["3","4","5"],
    ["6","7","8"],
    ["0","3","6"],
    ["1","4","7"],
    ["2","5","8"],
    ["0","4","8"],
    ["2","4","6"]
];

// SETUP BOARD
function setup() {
    const gameboard = document.getElementById("game");
    document.getElementById("turn").textContent = "X";
    document.getElementById("winner").textContent = "";
    
    for (let i = 0; i < size.rows; i++ ) {
        let trow = document.createElement('tr')
        trow.classList.add('row')
        gameboard.appendChild(trow);
        for (let j = 0; j < size.cols; j++) {
            let td = document.createElement('td');
            let sq = (i*3) + j;
            td.classList.add('td');
            td.id = sq.toString();
            td.addEventListener("click", onclick)
            trow.appendChild(td);
        }
    }
}

function onclick(e) {
    let target = e.target;
    id = target.id;
    if (target.textContent !== "") {
        return null;
    }

    let player = document.getElementById("turn").textContent;
    if (player === "X") {
        playerXMoves.push(id);
        target.textContent = "X";
        checkForWinner();
        document.getElementById("turn").textContent = "O";
    } else {
        playerOMoves.push(id);
        target.textContent = "O";
        checkForWinner();
        document.getElementById("turn").textContent = "X";
    }
};

function check(arr1, arr2) {
    return arr2.every(val => arr1.includes(val))
}

function checkForWinner() {
    let player = document.getElementById("turn").textContent;
    let moves;
    if (player === "X") {
        moves = playerXMoves;
    } else {
        moves = playerOMoves;
    }


    for (let i = 0; i < winPatterns.length; i++) {
        if (check(moves, winPatterns[i])) {
            document.getElementById("winner").textContent = player;
            let td = document.querySelectorAll(".td");
            td.forEach(sq => sq.removeEventListener("click", onclick));
            let tryagainBtn = document.createElement("button");
            tryagainBtn.textContent = "Try Again";
            tryagainBtn.addEventListener("click", tryAgain);
            document.querySelector(".container").appendChild(tryagainBtn);
        } 
    }
}

function tryAgain() {
    let btn = document.querySelector("button");
    btn.parentNode.removeChild(btn);
    let trows = document.querySelectorAll("tr");
    trows.forEach(trow => {
        trow.parentNode.removeChild(trow);
    });
    playerXMoves = [];
    playerOMoves = [];
    setup();
}

setup();
// 