let Player = {
    name: "You",
    health: 100,
    attackPwr: 35,
};

let Enemies = [{
    name: "Trump",
    health: 80,
    attackPwr: 42,
    imageSrc:'../assets/img/enemytrump.jpg',
    moves: [
        { attack: 'head', defense: ['neck', 'body'] },
        { attack: 'neck', defense: ['body', 'legs'] },
        { attack: 'body', defense: ['legs', 'head'] },
        { attack: 'neck', defense: ['head', 'legs'] },
    ]
}, {
    name: "von der Leyen",
    health: 95,
    attackPwr: 38,
    imageSrc:'../assets/img/vdr.jpg',
    moves: [
        { attack: 'head', defense: ['neck', 'body'] },
        { attack: 'legs', defense: ['head', 'legs'] },
        { attack: 'neck', defense: ['body', 'legs'] },
        { attack: 'head', defense: ['head', 'neck'] }
    ]
}];

let currentEnemy = null;
let turnCounter = 0;
const maxTurns = 4;

const fightButton = document.querySelector('.enter-button');
const attackCheckboxes = document.querySelectorAll('.att-controls input[type="checkbox"]');
const defenseCheckboxes = document.querySelectorAll('.def-controls input[type="checkbox"]');

const playerStatsEl = document.getElementById('player-stats');
const enemyStatsEl = document.getElementById('enemy-stats');
const gameLogEl = document.getElementById('game-log');
const turnIndicatorEl = document.getElementById('turn-indicator');
const enemyImageEl = document.getElementById('enemyImage');

function updateDisplay() {
    if (!currentEnemy) return;
    playerStatsEl.innerHTML = `<h3>${Player.name}</h3><p>Health: ${Player.health}</p>`;
    enemyStatsEl.innerHTML = `<h3>${currentEnemy.name}</h3><p>Health: ${currentEnemy.health > 0 ? currentEnemy.health : 'Defeated'}</p>`;
      enemyImageEl.src = currentEnemy.imageSrc;
        
        enemyImageEl.alt = `Image of ${currentEnemy.name}`;
        turnIndicatorEl.textContent = `Turn ${turnCounter + 1}`;
     
    }


function logMessage(message) {
    if (!gameLogEl) {
        console.error("Error: Element with ID 'game-log' not found!");
        return;
    }
    const p = document.createElement('p');
    p.textContent = message;
    gameLogEl.appendChild(p);
    gameLogEl.scrollTop = gameLogEl.scrollHeight;
}

function executeTurn() {
    const playerAttackChoice = getSelected(attackCheckboxes);
    const playerDefenseChoices = getSelected(defenseCheckboxes);

    if (playerAttackChoice.length !== 1) {
        alert('Choose exactly one attack point!');
        return;
    };
    if (playerDefenseChoices.length !== 2) {
        alert('Choose two defence points!');
        return;
    };

    logMessage(`--- Turn ${turnCounter + 1} ---`);
    const enemyMoves = currentEnemy.moves[turnCounter];

    const playerTarget = playerAttackChoice[0];
    if (currentEnemy.health > 0) {
        if (enemyMoves.defense.includes(playerTarget)) {
            logMessage(`${currentEnemy.name} blocked your attack to ${playerTarget}`);
        } else {
            currentEnemy.health -= Player.attackPwr;
            logMessage(`YOU hit ${currentEnemy.name} in the ${playerTarget} and dealt ${Player.attackPwr} damage!`);
        }
    }

    const enemyTarget = enemyMoves.attack;
    if (currentEnemy.health > 0) {
        if (playerDefenseChoices.includes(enemyTarget)) {
            logMessage(`You blocked ${currentEnemy.name}'s attack to your ${enemyTarget}!`);
        } else {
            Player.health -= currentEnemy.attackPwr;
            logMessage(`${currentEnemy.name} hits you in the ${enemyTarget} for ${currentEnemy.attackPwr} damage!`);
        }
    }

    updateDisplay();
    checkGameOver();
    turnCounter++;
    resetCheckboxes();
}

function checkGameOver() {
    if (Player.health <= 0) {
        logMessage('You died!!!');
        fightButton.disabled = true;
    } else if (currentEnemy.health <= 0) {
        logMessage(`${currentEnemy.name} is DEAD. Congrats!!!`);
        fightButton.disabled = true;
    } else if (turnCounter >= maxTurns - 1) {
        logMessage(`${currentEnemy.name} got too tired and went to sleep. Congrats!!!`);
        fightButton.disabled = true;
    }
}

function getSelected(checkboxes) {
    return Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.id.split('-')[1]);
}

function resetCheckboxes() {
    attackCheckboxes.forEach(cb => cb.checked = false);
    defenseCheckboxes.forEach(cb => cb.checked = false);
}

function initializeBattle() {
    const randomIndex = Math.floor(Math.random() * Enemies.length);
    currentEnemy = Enemies[randomIndex];
    logMessage(`The battle begins! Your opponent is ${currentEnemy.name}.`);
    updateDisplay();
}

fightButton.addEventListener('click', executeTurn);

initializeBattle();