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
        "regular4c": "images/regular4c.gif",
        "fourcorners": "images/fourcorners.gif",
        "blackout": "images/blackout.gif",
        "airplane": "images/airplane.gif",
        "alien": "images/alien.gif",
		"ambersand": "images/ambersand.gif",
        "ant": "images/ant.gif",
        "appletree": "images/appletree.gif",
		"astrisk": "images/astrisk.gif",
        "bag": "images/bag.gif",
        "barbell": "images/barbell.gif",
        "baseballdiamond": "images/baseballdiamond.gif",
        "basket": "images/basket.gif",
        "bib": "images/bib.gif",
        "bird": "images/bird.gif",
        "block9": "images/block9.gif",
        "bowtie": "images/bowtie.gif",
        "campertrailer": "images/campertrailer.gif",
        "candlestick": "images/candlestick.gif",
        "chair": "images/Chair.gif",
        "car": "images/car.gif",
        "champaineglass": "images/champaineglass.gif",
        "checkmark": "images/checkmark.gif",
        "crazyc": "images/crazyc.gif",
        "crazyh": "images/crazyh.gif",
        "crazyt": "images/crazyt.gif",
        "crazyl": "images/crazyl.gif",
        "crown": "images/crown.gif",
        "daisy": "images/daisy.gif",
        "dog": "images/dog.gif",
        "dollarsign": "images/dollarsign.gif",
        "doublel": "images/doublel.gif",
        "doubleplus": "images/doubleplus.gif",
        "duck": "images/duck.gif",
		"eyeball": "images/eyeball.gif",
		"fireplace": "images/fireplace.gif",
        "fishhook": "images/fishhook.gif",
        "flag": "images/flag.gif",
		"foursquare": "images/foursquare.gif",
        "fox": "images/fox.gif",
		"fullmoon": "images/fullmoon.gif",
        "giftbag": "images/giftbag.gif",
		"grape": "images/grape.gif",
		"halfmoon": "images/halfmoon.gif",
        "hat": "images/hat.gif",
		"headstone": "images/headstone.gif",
        "hi": "images/hi.gif",
		"hotcocoa": "images/hotcocoa.gif",
        "house": "images/house.gif",
        "icicles": "images/icicles.gif",
        "ladder": "images/ladder.gif",
        "largediamond": "images/largediamond.gif",
		"lettera": "images/lettera.gif",
		"letterb": "images/letterb.gif",
		"letterc": "images/letterc.gif",
		"letterd": "images/letterd.gif",
		"lettere": "images/lettere.gif",
		"letterf": "images/letterf.gif",
		"letterg": "images/letterg.gif",
		"letterh": "images/letterh.gif",
		"letteri": "images/letteri.gif",
		"letterj": "images/letterj.gif",
		"letterk": "images/letterk.gif",
		"letterl": "images/letterl.gif",
		"letterm": "images/letterm.gif",
		"lettern": "images/lettern.gif",
		"lettero": "images/lettero.gif",
		"letterp": "images/letterp.gif",
		"letterq": "images/letterq.gif",
		"letterr": "images/letterr.gif",
		"letters": "images/letters.gif",
		"lettert": "images/lettert.gif",
		"letteru": "images/letteru.gif",
		"letterv": "images/letterv.gif",
		"letterw": "images/letterw.gif",
		"letterx": "images/letterx.gif",
		"lettery": "images/lettery.gif",
		"letterz": "images/letterz.gif",
        "light": "images/light.gif",
        "lobster": "images/lobster.gif",
        "loveletter": "images/loveletter.gif",
        "mapleleaf": "images/mapleleaf.gif",
        "motorcycle": "images/motorcycle.gif",
        "mask": "images/mask.gif",
        "mushroom": "images/mushroom.gif",
		"musicnote": "images/musicnote.gif",
		"number0": "images/number0.gif",
		"number1": "images/number1.gif",
		"number2": "images/number2.gif",
		"number3": "images/number3.gif",
		"number4": "images/number4.gif",
		"number5": "images/number5.gif",
		"number6": "images/number6.gif",
		"number7": "images/number7.gif",
		"number8": "images/number8.gif",
		"number9": "images/number9.gif",
		"number10": "images/number10.gif",
		"number11": "images/number11.gif",
		"number12": "images/number12.gif",
		"number13": "images/number13.gif",
		"number14": "images/number14.gif",
		"number15": "images/number15.gif",
		"number16": "images/number16.gif",
		"number17": "images/number17.gif",
		"number18": "images/number18.gif",
		"number19": "images/number19.gif",
		"owl": "images/owl.gif",
        "paraderoute": "images/paradeRoute.gif",
        "pin": "images/pin.gif",
        "pinwheel": "images/pinwheel.gif",
		"rainboat": "images/rainboat.gif",
        "raindrop": "images/raindrop.gif",
		"rake": "images/rake.gif",
        "readytokiss": "images/readytokiss.gif",
        "rectangle": "images/rectangle.gif",
		"reindeer": "images/reindeer.gif",
		"sailboat": "images/sailboat.gif",
        "shorts": "images/shorts.gif",
		"shark": "images/shark.gif",
		"sign": "images/sign.gif",
		"skiis": "images/skiis.gif",
		"skull": "images/skull.gif",
        "smallc": "images/smallc.gif",
        "smalldiamond": "images/smalldiamond.gif",
        "smalle": "images/smalle.gif",
        "snorkel": "images/snorkel.gif",
		"snowmobile": "images/snowmobile.gif",
		"spiderweb": "images/spiderweb.gif",
		"sweater": "images/sweater.gif",
        "table": "images/table.gif",
        "thunderbird": "images/thunderbird.gif",
        "tictactoe": "images/tictactoe.gif",
        "topv": "images/topv.gif",
        "torch": "images/torch.gif",
		"tornado": "images/tornado.gif",
        "train": "images/train.gif",
        "trophy": "images/trophy.gif",
        "tulip": "images/tulip.gif",
        "umbrella": "images/umbrella.gif",
        "upsidedownt": "images/upsidedownt.gif",
		"vampire": "images/vampire.gif",
		"wasp": "images/wasp.gif",
        "windmill": "images/windmill.gif",
        "windowpane": "images/windowpane.gif",
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
