const socket = io()
const url = new URL(window.location.href)
const battleID = url.searchParams.get('battleid')
const username = url.searchParams.get('username')
const activePlayer = { battleID, username }
const attackButton = document.querySelector('#attackButton')
const backButton = document.querySelector('#backButton')

socket.on('connect', () => {
    if (battleID) {
        socket.emit('newUser', activePlayer)
    }
})

socket.on('updateBattleInfo', (battle) => {
    // console.log('show players ', battle.players[0].id)
    console.log('battle info', battle)
    addPlayer(battle.players)
    const currentTurn = battle.players.filter((player) => player.id == battle.hasTurn)[0]
    // console.log(currentTurn)
    hasTurn(currentTurn.name, battle.id)
})

socket.on('end', () => {
    window.location = "/endbattle"
})

if (attackButton) {
    attackButton.addEventListener('click', (event) => {
        // console.log(activePlayer, 'doet aanval')
        socket.emit('attack', activePlayer)
        socket.emit('checkHitpoints', activePlayer)
    })
}

if (backButton) {
    backButton.addEventListener('click', (event) => {
        console.log('click!')
        window.location = "/joinbattle"
    })
}

function hasTurn(playerName, battleId) {
    const hasTurn = document.querySelector('#hasTurn')
    const roomId = document.querySelector('#battleId')
    hasTurn.innerText = playerName
    roomId.innerText = battleId
}

function addPlayer(players) {
    const playerOne = document.querySelector('#playerOne')
    const hpOne = document.querySelector('#hpOne')
    playerOne.innerText = players[0].name
    hpOne.innerText = players[0].hitpoints
    if (players.length === 2) {
        const playerTwo = document.querySelector('#playerTwo')
        const hpTwo = document.querySelector('#hpTwo')
        playerTwo.innerText = players[1].name
        hpTwo.innerText = players[1].hitpoints
    }
}