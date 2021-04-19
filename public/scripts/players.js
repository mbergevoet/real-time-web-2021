export default function addPlayer(activePlayers) {
    const playerOne = document.querySelector("#playerOne");
    const playerTwo = document.querySelector("#playerTwo");
    const hpOne = document.querySelector("#hpOne");
    const hpTwo = document.querySelector("#hpTwo");
    // playerOne.innerHTML = "";
    // playerTwo.innerHTML = "";
    console.log("addPlayer function ", activePlayers)
    playerOne.innerText = activePlayers[0].name
    playerTwo.innerText = activePlayers[1].name
    hpOne.innerText = activePlayers[0].hitpoints
    hpTwo.innerText = activePlayers[1].hitpoints
}

// export { addPlayer }