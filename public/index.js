/** @type {HTMLElement} */
const restartBtn = document.getElementById('restart-btn');
/** @type {HTMLElement} */
const roundBtn = document.getElementById('round-btn');
/** @type {HTMLElement} */
const table = document.getElementById('table');
/** @type {HTMLElement} */
const resultOutput = document.getElementById('game-result');
/** @type {HTMLCollectionOf} */
const members = document.getElementsByClassName('member');

restartBtn.onclick = () => {
    table.innerHTML = '';
    resultOutput.hidden = true;
    initGame();
};

roundBtn.onclick = () => {
    startRound();
};

function initGame() {
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
        const { playersIds } = JSON.parse(xhr.response);
        playersIds.forEach((id, index) =>
            members[index].dataset.memberId = id
        );
        roundBtn.hidden = false;
    };

    xhr.open('get', '/api/init');
    xhr.send();
}

function startRound() {
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
        const data = JSON.parse(xhr.response);
        play(data);
        data.isEnd && gameOver(data.roundWinnerId);
    };

    xhr.open('get', '/api/round');
    xhr.send();
}

function play() {

}

function gameOver(winnerId) {
    const status = Number(members[0].dataset.memberId) === winnerId ? 'LOSE' : 'WIN';

    roundBtn.hidden = true;
    resultOutput.textContent = `YOU ${status}!`;
    resultOutput.hidden = false;
}
