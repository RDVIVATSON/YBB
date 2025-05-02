let calledNumbers = [];
let lastClickedButton = null;
let primeRibBall = null; // Stores first number clicked after reset

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

    // Map pattern names to image file paths
    const patternMap = {
        "straight-line": "images/straight-line.jpg",
        "four-corners": "images/Bingo4C.gif",
        "full-house": "images/BingoBlackOut.gif",
        "Chair": "images/Bingochair.gif",
        "Hi": "images/Bingohi.gif",
        "Crown": "images/Bingocrown.gif",
        "large-diamond": "images/BingoLargeDiamond.gif",
        "small-diamond-house": "images/BingoSmallDiamond.gif"
    };

    // Get selected pattern and update image
    const selectedPattern = patternSelect.value;
    patternImage.src = patternMap[selectedPattern] || ""; // Set image source
    patternImage.style.display = patternMap[selectedPattern] ? "block" : "none"; // Show only if an image exists
}

function callNumber(column, number) {
    const calledNumber = column + number;
    const button = document.querySelector(`button[data-column="${column}"][data-number="${number}"]`);

    if (button) {
        // **Prime Rib Ball Selection** (Only updates once after reset)
        if (!primeRibBall) {
            primeRibBall = button;
            document.getElementById("primeRibBall").textContent = "Prime Rib Ball: " + calledNumber;
            button.classList.add('prime-rib'); // Adds yellow border styling
            return; // Do not toggle the Prime Rib Ball initially
        }

        button.classList.toggle('called');

        // Stop previous button from flashing and make it solid red
        if (lastClickedButton && lastClickedButton !== primeRibBall) {
            lastClickedButton.classList.remove('flashing');
            lastClickedButton.style.backgroundColor = 'red'; // Solid red
            lastClickedButton.style.color = 'white';
        }

        // If Prime Rib Ball is clicked again later, update the last number called and allow it to flash
        if (button === primeRibBall) {
            button.classList.add('flashing');
            flashEffect(button);
            lastClickedButton = button;
        } else {
            // Toggle the flashing effect for the new last number called
            if (button.classList.contains('called')) {
                button.classList.add('flashing');
                flashEffect(button);
                calledNumbers.push(calledNumber);
                lastClickedButton = button;
            } else {
                button.classList.remove('flashing');
                button.style.backgroundColor = '';
                button.style.color = '';
                calledNumbers = calledNumbers.filter(num => num !== calledNumber);
                lastClickedButton = calledNumbers.length > 0 
                    ? document.querySelector(`button[data-column="${calledNumbers[calledNumbers.length - 1]}"]`) 
                    : null;
                
                if (lastClickedButton) {
                    lastClickedButton.classList.add('flashing');
                    flashEffect(lastClickedButton);
                }
            }
        }

        updateLastNumber();
    }
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
    primeRibBall = null; // Reset Prime Rib Ball
    document.getElementById("primeRibBall").textContent = "Prime Rib Ball: None";

    document.querySelectorAll('.bingo-column button').forEach(button => {
        button.classList.remove('called', 'flashing', 'prime-rib');
        button.style.backgroundColor = '';
        button.style.color = '';
    });

    lastClickedButton = null;
    updateLastNumber();
}

function updateLastNumber() {
    const lastNumberDiv = document.getElementById('lastNumber');
    lastNumberDiv.textContent = calledNumbers.length > 0
        ? 'Last number: ' + calledNumbers[calledNumbers.length - 1]
        : 'Last number called: None';
}

// Initialize the board when the script loads
createBingoBoard();