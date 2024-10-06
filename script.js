function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function populateBingoGrid(questions) {
    const grid = document.getElementById('bingoGrid');
    grid.innerHTML = ''; // Clear existing grid
    
    const savedState = JSON.parse(localStorage.getItem('bingoState')) || {};
    const shuffledQuestions = savedState.questions || shuffle(questions);
    
    shuffledQuestions.forEach((question, index) => {
        const cell = document.createElement('div');
        cell.classList.add('bingo-cell');
        cell.setAttribute('data-content', question);
        cell.textContent = question;
        if (savedState[index]) {
            cell.classList.add('toggled');
        }
        cell.onclick = () => toggleCell(cell, index);
        grid.appendChild(cell);
    });

    // Save the initial state if it doesn't exist
    if (!savedState.questions) {
        saveState(shuffledQuestions);
    }
}

function toggleCell(cell, index) {
    cell.classList.toggle('toggled');
    const state = JSON.parse(localStorage.getItem('bingoState')) || {};
    state[index] = cell.classList.contains('toggled');
    localStorage.setItem('bingoState', JSON.stringify(state));
}

function fetchQuestions() {
    fetch('questions.txt')
        .then(response => response.text())
        .then(data => {
            const questions = data.split('\n').filter(question => question.trim() !== '');
            populateBingoGrid(questions);
        })
        .catch(error => console.error('Error fetching questions:', error));
}

function inputQuestions() {
    const questions = [
"Was ist dein Lieblingsurlaubsziel?",
"Welches Haustier hast du oder würdest du gerne haben?",
"Hast du schon einmal einen Sprachkurs gemacht?",
"Welche Musikrichtung hörst du am liebsten?",
"Bist du ein Morgenmensch oder eine Nachteule?",
"Welches Buch hast du zuletzt gelesen?",
"Kannst du ein Musikinstrument spielen?",
"Hast du schon einmal ein Extremsportart ausprobiert?",
"In welchem Land warst du zuletzt im Urlaub?",
"Magst du lieber Kaffee oder Tee?",
"Was ist dein Lieblingsfilm oder deine Lieblingsserie?",
"Welches Hobby würdest du gerne mal ausprobieren?",
"Wie viele Geschwister hast du?",
"Hast du schon einmal bei einem Talentwettbewerb mitgemacht?",
"Was war dein erster Job?",
"Was ist dein Lieblingsessen?",
"Was ist dein Sternzeichen?",
"Hast du einen Spitznamen? Wenn ja, welchen?",
"Welchen Prominenten würdest du gerne einmal treffen?",
"Sprichst du mehrere Sprachen?",
"Was ist dein Lieblingssport?",
"Magst du lieber Berge oder Meer?",
"Hast du ein besonderes Talent?",
"Was ist deine Lieblingsjahreszeit?",
"Welche Stadt würdest du gerne einmal besuchen?"
    ];
    populateBingoGrid(questions);
}

function saveState(questions) {
    const state = { questions: questions };
    localStorage.setItem('bingoState', JSON.stringify(state));
}

function resetGame() {
    localStorage.removeItem('bingoState');
    inputQuestions();
}

window.onload = inputQuestions;

document.getElementById('resetButton').addEventListener('click', resetGame);

