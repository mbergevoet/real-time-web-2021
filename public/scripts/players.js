export function addPlayer(activePlayers) {

    const playerOne = document.querySelector("#playerOne");
    const playerTwo = document.querySelector("#playerTwo");
    playerOne.innerHTML = "";
    playerTwo.innerHTML = "";

    console.log("player: ", activePlayers[0].name)

    // const newUser = `<span>${user[1].name}<span>`;
    const newUser = `<span>${activePlayers[0].name}<span>`;
    playerOne.appendChild(newUser);
}