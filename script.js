let calledNumbers = [];
let lastClickedButton = null;
let primeRibBall = null;

function createBingoBoard() {
    const columns = ['B', 'I', 'N', 'G', 'O'];

    columns.forEach((col, index) => {
        const columnDiv1 = document.getElementById(col + '1');
        const columnDiv2 = document.getElementById(col + '2');

        for (let i = 1; i <= 15; i++) {
            const number = index * 15 + i;
            const numberButton = document.createElement('button');
            numberButton.textContent = number;
            numberButton.onclick = () => callNumber(col, number);
            numberButton.setAttribute('data-column', col);
            numberButton.setAttribute('data-number', number);

            if (i <= 8) {
                columnDiv1.appendChild(numberButton);
            } else {
                columnDiv2.appendChild(numberButton);
            }
        }
    });
}

function displayPattern() {
    const patternSelect = document.getElementById("patterns");
    const patternImage = document.getElementById("pattern-image");
    const selectedPattern = patternSelect.value.toLowerCase();
    patternImage.src = patternMap[selectedPattern] || "";
    patternImage.style.display = patternMap[selectedPattern] ? "block" : "none";
}

function callNumber(column, number) {
    const button = document.querySelector(`button[data-column="${column}"][data-number="${number}"]`);
    if (!button) return;

    const calledNumber = column + number;

    // Prime Rib Ball logic
    if (!primeRibBall) {
        primeRibBall = button;
        document.getElementById("primeRibBall").textContent = "Prime Rib Ball: " + calledNumber;
        button.classList.add('prime-rib');
        return;
    }

    // Stop all flashing effects
    document.querySelectorAll('.flashing').forEach(btn => {
        btn.classList.remove('flashing');
        btn.style.backgroundColor = 'red';
        btn.style.color = 'white';
    });

    button.classList.toggle('called');

    if (lastClickedButton && lastClickedButton !== primeRibBall) {
        lastClickedButton.classList.remove('flashing');
        lastClickedButton.style.backgroundColor = 'red';
        lastClickedButton.style.color = 'white';
    }

    if (button === primeRibBall) {
        button.classList.add('flashing');
        flashEffect(button);
        lastClickedButton = button;
    } else {
        if (button.classList.contains('called')) {
            button.classList.add('flashing');
            flashEffect(button);
            calledNumbers.push({ column, number, button });
            lastClickedButton = button;

            // Wildcard check
            if (calledNumbers.length >= 3) {
                const lastThree = calledNumbers.slice(-3);
                const lastDigits = lastThree.map(n => n.number % 10);
                const allSame = lastDigits.every(d => d === lastDigits[0]);
                if (allSame) {
                    triggerWildcard(lastDigits[0]);
                }
            }

        } else {
            button.classList.remove('flashing');
            button.style.backgroundColor = '';
            button.style.color = '';
            calledNumbers = calledNumbers.filter(obj => obj.number !== number || obj.column !== column);

            const last = calledNumbers[calledNumbers.length - 1];
            lastClickedButton = last
                ? document.querySelector(`button[data-column="${last.column}"][data-number="${last.number}"]`)
                : null;

            if (lastClickedButton) {
                lastClickedButton.classList.add('flashing');
                flashEffect(lastClickedButton);
            }
        }
    }

    updateLastNumber();
    updateBallCounter();
}

function triggerWildcard(digit) {
    const banner = document.createElement('div');
    banner.textContent = `Wildcard Activated: All ${digit}'s Called!`;
    banner.className = 'wildcard-banner';
    document.body.appendChild(banner);

    setTimeout(() => banner.remove(), 5000);

    const spray = document.createElement('div');
    spray.className = 'graffiti-spray';
    document.body.appendChild(spray);

    anime({
        targets: spray,
        scale: [0, 1.5],
        opacity: [1, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        complete: () => spray.remove()
    });

    document.querySelectorAll('.bingo-column button').forEach(button => {
        const numStr = button.getAttribute('data-number');
        if (!numStr) return;
        const num = parseInt(numStr);
        if (!isNaN(num) && num % 10 === digit && !button.classList.contains('called')) {
            button.classList.add('called', 'flashing');
            flashEffect(button);
            calledNumbers.push({
                column: button.getAttribute('data-column'),
                number: num,
                button: button
            });
        }
    });

    updateLastNumber();
    updateBallCounter();
}

function flashEffect(button) {
    let flashing = true;
    const interval = setInterval(() => {
        if (!button.classList.contains('flashing')) {
            clearInterval(interval);
            return;
        }
        button.style.backgroundColor = flashing ? 'yellow' : 'red';
        button.style.color = flashing ? 'black' : 'white';
        flashing = !flashing;
    }, 500);
}

function resetBoard() {
    const confirmReset = confirm("Are you sure you want to reset the board?");
    if (!confirmReset) return;

    calledNumbers = [];
    primeRibBall = null;
    document.getElementById("primeRibBall").textContent = "Prime Rib Ball: None";

    document.querySelectorAll('.bingo-column button').forEach(button => {
        button.classList.remove('called', 'flashing', 'prime-rib');
        button.style.backgroundColor = '';
        button.style.color = '';
    });

    lastClickedButton = null;
    updateLastNumber();
    updateBallCounter();
}

function updateLastNumber() {
    const lastNumberDiv = document.getElementById('lastNumber');
    const last = calledNumbers[calledNumbers.length - 1];
    lastNumberDiv.textContent = last
        ? 'Last number: ' + last.column + last.number
        : 'Last number called: None';
}

function updateBallCounter() {
    const counterDiv = document.getElementById('ballCounter');
    const count = calledNumbers.filter(obj => obj.button !== primeRibBall).length;
    counterDiv.textContent = `Balls Called: ${count}`;
}

// Initialize the board
createBingoBoard();

