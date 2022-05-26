'use strict'

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var className = 'cell cell-' + i + '-' + j;
            strHTML += `<td onclick="cellClicked(event, this, ${i} ,${j})" class=" ${className} ">`

            if(!cell.isShown){
                strHTML += `<div class=" ${className} divCell" style="display:none;">`
            }else{
                strHTML += `<div class=" ${className} divCell" style="display:block;">`
            }
            
            if (cell.isMine) {
                strHTML += MINE
            }
            if (cell.minesAroundCount) {
                strHTML += `${cell.minesAroundCount}`
            }

            // if(cell.isMarked){
            //     strHTML += FLAG
            // }

            strHTML += '</div></td>';
        }
        strHTML += '</tr>'
    }
    var elTable = document.querySelector('table');
    elTable.innerHTML = strHTML;
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            if (!cell.isMine) {
                var numNeighbors = countNeighbors(i, j, board)
                cell.minesAroundCount = numNeighbors
            }
        }
    }
}


function countNeighbors(cellI, cellJ, mat) {
    var neighborsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;

            if (mat[i][j].isMine || mat[i][j].isMine) neighborsCount++;
        }
    }
    return neighborsCount;
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startTimer(){
    var timer = document.querySelector('.countUpTimer')
        timer.style.display = 'block'
        timer.innerText = '00:00:00'
        gInterval = setInterval(countUpTimer, 1000);
}

function countUpTimer() {
  ++gTotalSeconds;
  var hour = Math.floor(gTotalSeconds / 3600);
  var minute = Math.floor((gTotalSeconds - hour * 3600) / 60);
  var seconds = gTotalSeconds - (hour * 3600 + minute * 60);
  document.querySelector('.countUpTimer').innerHTML = hour + ":" + minute + ":" + seconds;
}













// // location such as: {i: 2, j: 7}
// function renderCell(location, value) {
//     // Select the elCell and set the value
//     var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
//     elCell.innerHTML = value;
// }

// function copyMat(mat) {
//     var newMat = [];
//     for (var i = 0; i < mat.length; i++) {
//         newMat[i] = [];
//         for (var j = 0; j < mat[0].length; j++) {
//             newMat[i][j] = mat[i][j];
//         }
//     }
//     return newMat;
// }
