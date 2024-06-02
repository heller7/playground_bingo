function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function populateBingoGrid(questions) {
    const grid = document.getElementById('bingoGrid');
    const shuffledQuestions = shuffle(questions);
    
    shuffledQuestions.forEach(question => {
        const cell = document.createElement('div');
        cell.classList.add('bingo-cell');
        cell.textContent = question;
        cell.onclick = () => toggleCell(cell);
        grid.appendChild(cell);
    });
}

function toggleCell(cell) {
    cell.classList.toggle('toggled');
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
        "eine Sprache spricht, die du überhaupt nicht sprichst.",
        "ein Haustier hat.",
        "in einer Band/Chor ist/war.",
        "den gleichen Lieblingsfilm hat wie du.",
        "das gleiche Lieblingsessen hat wie du.",
        "gleich viele Geschwister hat wie du.",
        "sich ehrenamtlich engagiert.",
        "mindestens ein Jahr außerhalb Deutschlands gelebt hat.",
        "im gleichen Monat wie du Geburtstag hat.",
        "in einem Land war, indem du noch nie warst.",
        "denselben Sport betreibt wie du.",
        "mehr als 2 Sprachen spricht.",
        "nicht über persönliche Kontakte zu Co-Fox gekommen ist.",
        "schon in einer Pathologie vor Co-Fox war.",
        "ein außergewöhnliches Hobby hat.",
        "die den gleichen/ähnliches Musikgeschmack hat wie du.",
        "die letzten Monat im Kino war.",
        "die gerne Witze erzählt.",
        "die letzten Monat ein Konzert besucht hat.",
        "die mehr als 2 Jahre bei Co-Fox ist.",
        "die einen grünen Daumen hat.",
        "die gerne kocht.",
        "die schon vor Co-Fox remote gearbeitet hat.",
        "die einen Stehschreibtisch benutzt.",
        "die kein Jabra-Headset nutzt.",
        "das gleiche Lieblingsbuch hat wie du."
    ]
    populateBingoGrid(questions);
}

window.onload = inputQuestions();
