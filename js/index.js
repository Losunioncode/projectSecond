const gameBoard = (() => {

    let board = Array.from(Array(9).keys())
    const cellField = document.querySelectorAll('.cell')

    const getField = (index) => board[index]

    const setField = (index, player) => {
        cellField[index].textContent = player.getAssign()
        board[index] = player.getAssign()
    }

    const clear = () => {
        for(let i = 0; i < board.length; i++){
            board[i] = i
        }
    }

    console.log(board)
    const getBoard = () => board

    return {getField, setField, clear, getBoard}
})();


let Player = (playerAssign) => {

    let _playerAssign = playerAssign

    const getAssign = () => _playerAssign
    const setAssign = (playerAssign) => {
        _playerAssign = playerAssign
    }

    return {getAssign, setAssign}

}



let gameController = (() => {
    const _playerFirst = Player('X')
    const _aiPlayer = Player('O')
    const board = gameBoard.getBoard()
    const  playerStep = (index) => {
        const field = gameBoard.getField(index)
    }
    const winCombats = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]
    const display = document.querySelector('.endgame')
    const text = document.querySelector('.text')
    const getFirstPlayer = () => _playerFirst

    const getAiPlayer = () => _aiPlayer

    const turnClick = (index) => {
        if (typeof board[index] == 'number'){
            playerTurn(index)
            if (!checkTie()) {
                aiTurn(checkSpot())
            } else{
                declareWinner('draw')
            }
        }
    }


    const playerTurn = (index) => {
        const cell = gameBoard.getField(index)
        gameBoard.setField(cell, _playerFirst)
        const gameWon = checkWin(board, _playerFirst.getAssign())
        if (gameWon) gameOver()

    }
    const emptySquares = () => {
        return board.filter((s) => typeof s == 'number')
    }

    const aiTurn = (index) => {
        const cell = gameBoard.getField(index)
        gameBoard.setField(cell, _aiPlayer)
        const gameWon = checkWin(board, _aiPlayer.getAssign())
        if (gameWon) gameOver()
    }

    const checkSpot = () => emptySquares()[0]

    const checkWin = (board, player) => {
        let places = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, [])
        console.log(places)
        let gameWon = null

        for (let [index, win] of winCombats.entries()){
            if (win.every(elem => places.indexOf(elem) > -1)){
                gameWon = {index: index, player: player}
                declareWinner(gameWon.player)
                break
            }
        }
        return gameWon
    }

    const gameOver = (gameWon) => {
        display.style.display = 'block'
        gameBoard.clear()
        return true
    }

    const checkTie = () => {
        if (emptySquares().length == 0) {

            return true
        }
        return false
    }
    const declareWinner = (assign) => {
        if (assign === 'draw'){
            text.textContent = 'Draw game'
            return true
        }
        text.textContent = assign + ' has won this game'
    }
    const restart = () => {
        displayController.clear()
        display.style.display = 'none'

    }

    return {getFirstPlayer, restart, checkWin, gameOver, turnClick, checkTie, getAiPlayer, checkSpot,playerTurn}
})()

let displayController = (() => {
    const gameFields = document.querySelectorAll('.cell')
    const btnReset = document.querySelector('.btn_reset')
    const board = gameBoard.getBoard()

    const clear = () => {
        for (let i = 0; i < gameFields.length; i++){
            gameFields[i].textContent = ''
        }
    }
    const init = (() => {

        for (let i = 0; i < gameFields.length; i++){
            gameFields[i].addEventListener('click', gameController.turnClick.bind(gameFields[i], i))
            if(gameController.gameOver){
                gameFields[i].removeEventListener('click', gameController.turnClick)
            }

        }
        btnReset.addEventListener('click', gameController.restart)
    })();

    return {clear}
})()





