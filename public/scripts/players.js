export function addPlayer(activePlayers) {

    const board = document.querySelector("#players");
    board.innerHTML = "";

    activePlayers.forEach(user => {
        const newUser = `<li>${user.name}</li>`;
        board.insertAdjacentHTML('beforeend', newUser);
    });
}