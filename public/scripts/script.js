
// const moveTwo = document.querySelector("moveTwo")
// const moveThree = document.querySelector("moveThree")
// const moveFour = document.querySelector("moveFour")

const socket = io()
const attackButton = document.querySelector(".attack")
const url = new URL(window.location.href);
const battleID = url.searchParams.get('battleid');
const username = url.searchParams.get('username');

const activePlayer = { battleID, username }

socket.on('connect', () => {
    if (battleID) {
        socket.emit('newUser', activePlayer)
    }
})

socket.on("updateBattleInfo", (battle) => {
    console.log("show players ", battle.players)
    addPlayer(battle.players)
})

// attackButton.addEventListener('click', (activePlayer) => {
//     console.log('click!')
//     socket.emit("attack", activePlayer)

// })

function addPlayer(activePlayer) {
    const playerOne = document.querySelector("#playerOne");
    const playerTwo = document.querySelector("#playerTwo");
    const hpOne = document.querySelector("#hpOne");
    const hpTwo = document.querySelector("#hpTwo");
    playerOne.innerText = activePlayer[0].name
    hpOne.innerText = activePlayer[0].hitpoints
    if (activePlayer.length === 2) {
        playerTwo.innerText = activePlayer[1].name
        hpTwo.innerText = activePlayer[1].hitpoints
    }
}

// socket.on("updateBattleInfo", (battle) => {
//     console.log(battle)
//     addPlayer(battle.players)
// })