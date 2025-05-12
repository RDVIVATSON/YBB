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

    // Map pattern names to image file paths (all lowercase)
    const patternMap = {
        "straight-line": "images/regular4c.gif",
        "four-corners": "images/fourcorners.gif",
        "full-house": "images/blackout.gif",
        "airplane": "images/airplane.gif",
        "alien": "images/alien.gif",
        "ant": "images/ant.gif",
        "appletree": "images/appletree.gif",
        "bag": "images/bag.gif",
        "barbell": "images/barbell.gif",
        "baseball-diamond": "images/baseballdiamond.gif",
        "basket": "images/basket.gif",
        "bib": "images/bib.gif",
        "bikinitop": "images/bikiniTop.gif",
        "bird": "images/bird.gif",
        "bowtie": "images/bowtie.gif",
        "campertrailer": "images/campertrailer.gif",
        "candlestick": "images/candlestick.gif",
        "chair": "images/Chair.gif",
        "car": "images/car.gif",
        "champaine-glass": "images/champaineglass.gif",
        "checkmark": "images/checkmark.gif",
        "crazyc": "images/crazyc.gif",
        "crazyh": "images/crazyh.gif",
        "crazyt": "images/crazyt.gif",
        "crazyl": "images/crazyl.gif",
        "crown": "images/crown.gif",
        "daisy": "images/daisy.gif",
        "dog": "images/dog.gif",
        "dollar-sign": "images/dollarsign.gif",
        "doublel": "images/doublel.gif",
        "double-plus": "images/doubleplus.gif",
        "duck": "images/duck.gif",
        "fish-hook": "images/fishhook.gif",
        "flag": "images/flag.gif",
        "fox": "images/fox.gif",
        "gift-bag": "images/giftbag.gif",
        "hat": "images/hat.gif",
        "hi": "images/hi.gif",
        "house": "images/house.gif",
        "icicles": "images/icicles.gif",
        "ladder": "images/ladder.gif",
        "large-diamond": "images/largediamond.gif",
        "light": "images/light.gif",
        "lobster": "images/lobster.gif",
        "loveletter": "images/loveletter.gif",
        "maple-leaf": "images/mapleleaf.gif",
        "motorcycle": "images/motorcycle.gif",
        "mask": "images/mask.gif",
        "mushroom": "images/mushroom.gif",
        "music-note": "images/musicnote.gif",
        "parade-route": "images/paradrRoute.gif",
        "pin": "images/pin.gif",
        "pinwheel": "images/pinwheel.gif",
        "quinella": "images/quinella.gif",
        "raindrop": "images/raindrop.gif",
        "readytokiss": "images/readytokiss.gif",
        "rectangle": "images/rectangle.gif",
        "shorts": "images/shorts.gif",
        "smallc": "images/smallc.gif",
        "small-diamond-house": "images/smalldiamond.gif",
        "smalle": "images/smalle.gif",
        "snorkel": "images/snorkel.gif",
        "table": "images/table.gif",
        "thunderbird": "images/thunderbird.gif",
        "tictactoe": "images/tictactoe.gif",
        "topv": "images/topv.gif",
        "torch": "images/torch.gif",
        "train": "images/train.gif",
        "trophy": "images/trophy.gif",
        "tulip": "images/tulip.gif",
        "umbrella": "images/umbrella.gif",
        "upsidedownt": "images/upsidedownt.gif",
        "windmill": "images/windmill.gif",
        "window-pane": "images/windowpane.gif",
        "windowshade": "images/windowshade.gif",
        "wineglass": "images/wineglass.gif",
        "worm": "images/worm.gif"
    };

    const selectedPattern = patternSelect.value;
    patternImage.src = patternMap[selectedPattern] || ""; // Set image source
    patternImage.style.display = patternMap[selectedPattern] ? "block" : "none"; // Show image only if it exists
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
