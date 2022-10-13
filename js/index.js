


const gameBoard = (() => {
    let board = Array.from(Array(9).keys())


    const getField = (index) => _board[index]

    const setField = (player) => gameController.turnClick(player)

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
    const cellField = document.querySelectorAll('.cell')

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


    const turnClick = (player) => {
        cellField.forEach(cell => {
            cell.addEventListener('click', turn)

            function turn(){
                cell.textContent = player.getAssign()
                let board = gameBoard.getBoard()
                let num = cell.id
                board[num] = player.getAssign()
                let gameWon = gameController.checkWin(board, player.getAssign())
                if (gameWon) gameController.gameOver(gameWon)
            }
        })
    }


    const checkWin = (board, player) => {
        let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, [])
        console.log(plays)
        let gameWon = null

        for (let [index, win] of winCombats.entries()){
            if (win.every(elem => plays.indexOf(elem) > -1)){
                gameWon = {index: index, player: player}
                text.innerHTML = `The player ${gameWon.player} has won`

                break

            }
        }
        // text.innerHTML = `The player ${gameWon.player} won`
        return gameWon
    }

    const gameOver = (gameWon) => {
        display.style.display = 'block'
        gameBoard.clear()
    }

    const restart = function(){
        displayController.clear()
        display.style.display = 'none'

    }


    return {getFirstPlayer, restart, checkWin, gameOver, turnClick}

})()

let displayController = (() => {
    const gameFields = document.querySelectorAll('.cell')
    const btnReset = document.querySelector('.btn_reset')

    const clear = () => {
        for (let i = 0; i < gameFields.length; i++){
            gameFields[i].textContent = ''

        }
    }
    const init = (() => {
        gameBoard.setField(gameController.getFirstPlayer())
        // gameBoard.clear()
        btnReset.addEventListener('click', gameController.restart)
        // gameController.checkWin(gameBoard.getBoard(),  gameController.getFirstPlayer())
    })();

    return {clear}
})()





