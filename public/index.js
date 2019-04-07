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

async function play(data) {
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
    const queue = [];

    for (let i = 0; i < stepsAmount; i++) {
        i && queue.push(cardBack + cardBack);
        queue.push(getCard(firstMemberCards[i] + 1) + getCard(secondMemberCards[i] + 1));
    }
    queue.push(resultText(roundWinnerId));

    restartBtn.disabled = true;
    roundBtn.disabled = true;

    await delayQueue(
        queue,
        html => table.innerHTML = html,
        1000
    );

    restartBtn.disabled = false;
    roundBtn.disabled = false;
}

function delayQueue(queue, handler, delay) {
    return new Promise(async resolve => {

        handler(queue[0]);
        for (let i = 1; i < queue.length; i++) {
            await new Promise(resolve => {
                const id = setTimeout(() => {
                    handler(queue[i]);
                    clearTimeout(id);
                    resolve();
                }, delay);
            });
        }

        resolve();
    });
}

function gameOver(winnerId) {
    roundBtn.hidden = true;
    resultOutput.textContent = resultText(winnerId);
    resultOutput.hidden = false;
}

function resultText(winnerId) {
    if (winnerId === null) {
        return 'DRAW GAME';
    }
    return `YOU ${Number(members[0].dataset.memberId) === winnerId ? 'LOSE' : 'WIN'}`;
}

function getCard(cardId) {
    return `<img class="card-img" src="cards/${cardId}.png" alt="deck picture">`;
}
