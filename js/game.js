'use strict'

var gTotalSeconds = 0;
var gIsFirstClick = true

var gBoard;
const MINE = '💣'
const FLAG = '🎏'
var gNumberOfMines = 2;
var gIsWin = false
var gLevelDifficulties = 4
var gInterval

var gGame = { 
    isOn: false, 
    shownCount: 0, 
    markedCount: 0, 
    secsPassed: 0 
}

function initGame(){
    gBoard = buildBoard(gLevelDifficulties)
    randomizeMinesLocation(gBoard)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
    hideModal()
    gTotalSeconds = 0
    gGame.isOn = true
    gIsWin = false
}

function buildBoard(level) {
    var board = [];
    for (var i = 0; i < level; i++) {
        board[i] = []
        for (var j = 0; j < level; j++) {
            board[i][j] = {
                isShown: false,
                isMine: false,
                isMarked: false
                }
        }
    }
    return board;
}


function cellClicked(event, elCell, i, j){
    var elDiv = elCell.querySelector('.divCell') 
    var curCell = gBoard[i][j]
    curCell.isShown = true

    if(gIsFirstClick){
        startTimer()
        gIsFirstClick = false
    }

    cellMarked(elCell, i, j)

    if(curCell.isMine && curCell.isMarked || curCell.isMarked) return

    if(elDiv.innerHTML === ''){
        elDiv.style.backgroundColor = 'white'
    }

    if(curCell.isMine){
        gameOver()
    }

    elDiv.style.display = 'block'

    checkGameOver()
    
    // if(elDiv.isMine){
    //     randomizeMinesLocation(gBoard)
    // }
    // expandCells(elCell, i, j, gBoard)
}



// function expandCells(elCell, i, j, gBoard) {
//     if (!onBoard(i, j, gBoard) || gBoard[i][j].minesAroundCount > 0) return;

//     var elDiv = elCell.querySelector(`.cell-${i}-${j}`)

//     elDiv.style.display = 'block'
//     expandCells(i + 1, j, gBoard)
//     expandCells(i - 1, j, gBoard)
//     expandCells(i, j + 1, gBoard)
//     expandCells(i, j - 1, gBoard)
 // }

// function onBoard(i, j, gBoard) {
//     return i >= 0 && j >= 0 && i <= gBoard.length && j <= gBoard[0].length
// }

function randomizeMinesLocation(board){
    for (var idx = 0 ; idx < gNumberOfMines ; idx ++) {
        var i = getRandomIntInclusive(0, gBoard.length - 1)
        var j = getRandomIntInclusive(0, gBoard.length - 1)
        board[i][j].isMine = true 
    }     
}

function cellMarked(elCell, i, j){
    var elTd = document.querySelectorAll('td') 
        elTd.forEach((div) => {
            div.addEventListener("contextmenu", e => {
                e.preventDefault()
                var splittedClassName = div.className.split('-');
                i = splittedClassName[1]
                j = splittedClassName[2]
                gBoard[parseInt(i)][parseInt(j)].isMarked = true
                div.innerHTML = FLAG
                checkGameOver()
            }, false);
        });
}

function gameOver(){
    for(var i = 0; i < gBoard.length; i++){
        for(var j = 0; j < gBoard[0].length; j++){
            var curCell = gBoard[i][j]
            curCell.isShown = true
        }
    }
    openModal(gIsWin)
    clearInterval(gInterval)
    renderBoard(gBoard)
}

function checkGameOver(){
    var markedMines = 0 ;
    var shownTiles = 0;
    var markedCell = 0
    var numTiles = gBoard.length * gBoard.length - gNumberOfMines
    // console.log(numTiles);
    // console.log(gNumberOfMines);
    for (var i = 0; i < gBoard.length; i++){
        for(var j = 0; j < gBoard.length; j++){
            if(gBoard[i][j].isMarked && gBoard[i][j].isMine){
                if(markedMines <= gNumberOfMines) markedMines++
            }
            if(gBoard[i][j].isShown) {
                if(shownTiles <= numTiles) shownTiles++;
            }
            if(gBoard[i][j].isMarked) {
                markedCell++
            }
        }
    }

    console.log('markedMines', markedMines);
    console.log('shownTiles', shownTiles);
    console.log('markedCell', markedCell);

    if(markedMines === gNumberOfMines && shownTiles === numTiles){
        gIsWin = true
        console.log('win');
        openModal(gIsWin)
        clearInterval(gInterval)
    }

    if(markedCell + shownTiles === gBoard.length * gBoard.length){
        openModal(gIsWin)
        clearInterval(gInterval)
    }
}

function openModal(gIsWin) {
    var elModal = document.querySelector('.modal')
    var elBtnRestart = document.querySelector('.restart')
    // elModal.innerHTML = '<button>Restart</button>'
    elModal.style.display = 'block';
    elBtnRestart.style.display = 'block'
    elModal.innerText = gIsWin ? 'You Win' : 'Game Over';
}

function hideModal(){
    var elModal = document.querySelector('.modal')
    var elBtnRestart = document.querySelector('.restart')
    elModal.style.display = 'none';
    elBtnRestart.style.display = 'none'
}

function chooseLevel(level){
    gLevelDifficulties = level
    if(gLevelDifficulties === 4){
        gNumberOfMines = 2
    }
    if(gLevelDifficulties === 8){
        gNumberOfMines = 12
    }
    if(gLevelDifficulties === 12){
        gNumberOfMines = 30
    }
    initGame()
}

function restartBun(){
    var timer = document.querySelector('.countUpTimer')
    timer.style.display = 'none'
    gIsFirstClick = true
    hideModal()
    initGame()
}

// function expandShown(board, elCell, i, j){

// }
