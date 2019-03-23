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
    table.textContent = '';
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

function play(data) {
    const {
        players: [
            firstMember,
            secondMember
        ],
        roundWinnerId
    } = data;
    const firstMemberCards = firstMember.discardCards;
    const secondMemberCards = secondMember.discardCards;
    const stepsAmount = firstMemberCards.length;
    const cardBack = getCard(0);

    // TODO
    // need delay or animation between steps
    for (let i = 0; i < stepsAmount; i++) {
        if (i) {
            table.innerHTML = cardBack + cardBack; // step
        }
        table.innerHTML = getCard(firstMemberCards[i] + 1) + getCard(secondMemberCards[i] + 1); // step
    }
    // and need animation of taking cards (according to roundWinnerId)
    // that's all
}

function gameOver(winnerId) {
    const status = Number(members[0].dataset.memberId) === winnerId ? 'LOSE' : 'WIN';

    roundBtn.hidden = true;
    resultOutput.textContent = `YOU ${status}!`;
    resultOutput.hidden = false;
}

function getCard(cardId) {
    return `<img class="card-img" src="cards/${cardId}.png" alt="deck picture">`;
}
