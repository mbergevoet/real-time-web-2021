// const socket = io()
// const moveOne = document.querySelector("moveOne")
// const moveTwo = document.querySelector("moveTwo")
// const moveThree = document.querySelector("moveThree")
// const moveFour = document.querySelector("moveFour")

// moveOne.addEventListener("click", (event) => {

//     socket.emit('move')
// })

// import { addPlayer } from "./player.js";

const socket = io()

// const test = "ik ben een test"

// socket.emit("newUser", (test))

// console.log(socket)

const url = new URL(window.location.href);
const battleID = url.searchParams.get('battleid');
const username = url.searchParams.get('username');

const activePlayers = { battleID, username }

socket.on('connection', () => {

    socket.emit("newBattle", (activePlayers))

    socket.on("updateUserList", (list) => {
        addPlayer(list)
    })

    socket.on("updateBattleInfo", (battle) => {
        console.log(battle)
        addPlayer(battle.players)
    })
})