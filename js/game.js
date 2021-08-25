const listImages = [
    "images/p1.png",
    "images/p2.png",
    "images/p3.png",
    "images/p4.png",
    "images/p5.png",
    "images/p6.png",
    "images/p7.png",
    "images/p8.png"
];
const GAME_SIZE = 4;
let gameMap = {};
let nextId = 0;
let selectedCellId;
let redFlag = false;

function newGame() {
    initGame();
}

function initGame() {
    let gameTable = document.getElementById("gameField");
    gameTable.innerHTML = ""; // delete everything inside "game" table

    let gameImages = [];
    gameMap = {};
    let maxLength = GAME_SIZE * GAME_SIZE / 2;
    for (let i = 0; i < maxLength; i++) {
        let prevId = nextId;
        gameImages.push({
            id: nextId,
            image: listImages[i]
        });
        nextId++;        
        // push the same element twice
        gameImages.push({
            id: nextId,
            image: listImages[i]
        });
        gameMap["img" + prevId] = "img" + nextId;
        gameMap["img" + nextId] = "img" + prevId;

        nextId++;
    }        
    shuffle(gameImages);

    for (let i = 0; i < GAME_SIZE; i++) {
        let tr = document.createElement('tr');

        for (let j = 0; j < GAME_SIZE; j++) {
            let td = document.createElement('td');
            td.className = "closed";
            td.onclick = checkCell;

            let cellDiv = document.createElement('div');
            cellDiv.className = "gameCell";

            let img = document.createElement("img");
            let imageObject = gameImages.pop();
            img.src = imageObject.image;
            td.id = "img" + imageObject.id;

            cellDiv.appendChild(img);
            td.appendChild(cellDiv);
            tr.appendChild(td);
        }
        gameTable.appendChild(tr);
    }
}

// Fisher-Yates (aka Knuth) Shuffle
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function checkCell() {
    if (redFlag)
        return;
    redFlag = true;
    let thisCell = this;
    let otherCell = document.getElementById(selectedCellId);
    let cellId = thisCell.id;

    if (selectedCellId) {
        if (gameMap[selectedCellId] == cellId) {
            selectedCellId = undefined;
            thisCell.className = "";
            // stay open
            otherCell.onclick = '';
            thisCell.onclick = '';
            redFlag = false;
        } else {
            thisCell.className = "";
            selectedCellId = undefined;
            setTimeout(function () {
                thisCell.className = "closed";
                otherCell.className = "closed";
                redFlag = false;
            }, 1000);
        }
    } else {
        selectedCellId = cellId;
        thisCell.className = "";
        redFlag = false;
    }
}

initGame();