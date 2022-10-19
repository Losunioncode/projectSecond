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
            }else{
                declareWinner('draw')
            }
        }
    }


    const checkWin = (board, player) => {
        let places = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, [])
        let gameWon = null

        for (let [index, win] of winCombats.entries()){
            if (win.every(elem => places.indexOf(elem) > -1)){
                gameWon = {index: index, player: player}
                break
            }
        }
        return gameWon
    }

    const checkSpot = () => {
        return minimax(board, _aiPlayer).index
    }

    const playerTurn = (index) => {
        const cell = gameBoard.getField(index)
        gameBoard.setField(cell, _playerFirst)
        const gameWon = checkWin(board, _playerFirst.getAssign())
        if (gameWon) gameOver(gameWon)

    }
    const emptySquares = () => {
        return board.filter((s) => typeof s == 'number')
    }


    const aiTurn = (index) => {
        const cell = gameBoard.getField(index)
        gameBoard.setField(cell, _aiPlayer)
        const gameWon = checkWin(board, _aiPlayer.getAssign())
        if (gameWon) {
            gameOver(gameWon)
        }
    }


    const minimax = (newBoard, player) => {
        const availableSpots = emptySquares()
        if (checkWin(newBoard, _playerFirst.getAssign())){
            return {score: -10};
        }else if(checkWin(newBoard, _aiPlayer.getAssign())){
            return {score: 10};
        } else if (availableSpots.length === 0){
            return {score: 0}
        }

        const moves = []

        for(let i = 0; i < availableSpots.length; i++){
            const move = {};
            move.index = newBoard[availableSpots[i]]
            newBoard[availableSpots[i]] = player.getAssign()

            if (player.getAssign() == _aiPlayer.getAssign()){
                const result = minimax(newBoard, _playerFirst)
                move.score = result.score
            } else{
                const result = minimax(newBoard, _aiPlayer)
                move.score = result.score
            }

            newBoard[availableSpots[i]] = move.index
            moves.push(move)
        }

        let bestMove

        if(player === _aiPlayer){
            let bestScore = -10000
            for(let i = 0; i < moves.length; i++){
                if (moves[i].score > bestScore){
                    bestScore = moves[i].score
                    bestMove = i
                }
            }
        } else{
            let bestScore = 10000;
            for(let i = 0; i < moves.length; i++){
                if (moves[i].score < bestScore){
                    bestScore = moves[i].score
                    bestMove = i
                }
            }
        }
        return moves[bestMove]

    }




    const gameOver = (gameWon) => {
        declareWinner(gameWon.player)
        return true
    }

    const checkTie = () => {
        if (emptySquares().length == 0) {
            return true
        }
        return false
    }


    const declareWinner = (assign) => {
        display.style.display = 'block'
        if (assign === 'draw'){
            text.textContent = 'Draw game'
            return true
        }
        text.textContent = assign + ' has won this game'
    }
    const restart = () => {
        displayController.clear()
        gameBoard.clear()
        display.style.display = 'none'
    }

    return {getFirstPlayer, restart, checkWin, gameOver, turnClick, getAiPlayer, playerTurn}
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

        }

        btnReset.addEventListener('click', gameController.restart)

    })();

    return {clear}
})()





