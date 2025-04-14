let calledNumbers = [];

function createBingoBoard() {
    const columns = ['B', 'I', 'N', 'G', 'O'];
    
    columns.forEach((col, index) => {
        const columnDiv1 = document.getElementById(col + '1');
        const columnDiv2 = document.getElementById(col + '2');
        for (let i = 1; i <= 15; i++) {
            const number = index * 15 + i;
            const numberButton = document.createElement('button');
            numberButton.textContent = number;
            numberButton.style.width = '255px'; // Adjusted width
            numberButton.style.height = '60px'; // Adjusted height
            numberButton.style.fontSize = '40px'; // Adjusted font size
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

function callNumber(column, number) {
    const calledNumber = column + number;
    const button = document.querySelector(`button[data-column="${column}"][data-number="${number}"]`);

    if (button) {
        if (calledNumbers.includes(calledNumber)) {
            calledNumbers = calledNumbers.filter(num => num !== calledNumber);
            button.classList.remove('called');
            button.style.backgroundColor = '';
            button.style.color = '';
        } else {
            calledNumbers.push(calledNumber);
            if (calledNumbers.length > 3) {
                calledNumbers.shift();
            }
            button.classList.add('called');
            button.style.backgroundColor = 'red';
            button.style.color = 'white';
        }
        updateLastNumber(calledNumber);
    } else {
        console.error(`Button not found for ${calledNumber}`);
    }
}

function updateLastNumber(calledNumber) {
    const lastNumberDiv = document.getElementById('lastNumber');
    lastNumberDiv.textContent = 'Last number called: ' + calledNumber;
}

function resetBoard() {
    if (confirm('Are you sure you want to reset the board?')) {
        calledNumbers = [];
        
        const numberButtons = document.querySelectorAll('.bingo-column button');
        
        numberButtons.forEach(button => {
            button.classList.remove('called');
            button.style.backgroundColor = '';
            button.style.color = '';
        });
        
        updateLastNumber('');
    }
}

function displayPattern() {
    const patternImage = document.getElementById('pattern-image');
    const selectedPattern = document.getElementById('patterns').value;

    let imagePath = '';

    switch (selectedPattern) {
        case 'straight-line':
            imagePath = 'images/straight-line.png'; // Path to the straight line image
            break;
        case 'four-corners':
            imagePath = 'images/Bingo4C.gif'; // Path to the four corners image
            break;
        case 'full-house':
            imagePath = 'images/BingoBlackout.gif'; // Path to the full house image
            break;
        case 'Chair':
            imagePath = 'images/BingoChair.gif'; // Path to the letter T image
            break;
        case 'Hi':
            imagePath = 'images/BingoHI.gif'; // Path to the letter X image
            break;
			case 'Crown':
            imagePath = 'images/BingoCrown.gif'; // Path to the letter T image
            break;
        case 'large-diamond':
            imagePath = 'images/BingoLargeDiamond.gif'; // Path to the letter X image
            break;
        default:
            imagePath = '';
    }

    if (imagePath) {
        patternImage.src = imagePath;
        patternImage.style.display = 'block';
    } else {
        patternImage.style.display = 'none';
    }
}

createBingoBoard();
