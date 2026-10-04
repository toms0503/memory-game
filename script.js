let cards = [];
let flippedCards = [];
let pairsFound = 0;

const cardContainer = document.getElementById('game-board');

function generateCards() {
    const emojis = ['😊', '😎', '🤓', '🥳', '⚽', '🏀', '🍕', '🚀'];
    // הכפלת כל אימוג'י ליצירת זוג
    let deck = [...emojis, ...emojis];
    return shuffleArray(deck);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(emoji, index) {
    const card = document.createElement('div');
    card.classList.add(
        'w-20', 'h-20', 'bg-blue-500', 'text-white', 'text-3xl',
        'flex', 'items-center', 'justify-center', 'rounded-lg',
        'shadow-md', 'cursor-pointer', 'select-none', 'transition-all'
    );
    card.dataset.emoji = emoji;
    card.dataset.index = index;

    card.addEventListener('click', () => flipCard(card));
    return card;
}

function flipCard(card) {
    if (flippedCards.length === 2 || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }

    card.innerText = card.dataset.emoji;
    card.classList.remove('bg-blue-500');
    card.classList.add('bg-white', 'border-2', 'border-blue-500', 'flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        pairsFound++;
        flippedCards = [];

        if (pairsFound === 8) {
            setTimeout(() => alert('כל הכבוד! מצאת את כל הזוגות! 🎉'), 300);
        }
    } else {
        setTimeout(() => {
            card1.innerText = '';
            card2.innerText = '';
            card1.classList.remove('bg-white', 'border-2', 'border-blue-500', 'flipped');
            card2.classList.remove('bg-white', 'border-2', 'border-blue-500', 'flipped');
            card1.classList.add('bg-blue-500');
            card2.classList.add('bg-blue-500');
            flippedCards = [];
        }, 1000);
    }
}

function startGame() {
    cardContainer.innerHTML = '';
    cards = generateCards();
    cards.forEach((emoji, index) => {
        const cardElement = createCard(emoji, index);
        cardContainer.appendChild(cardElement);
    });
}

startGame();