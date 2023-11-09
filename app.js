// ROOT
let flip = 0;
let time = 60;

const mainMenu = document.querySelector('.main-menu');
const modeMenu = document.querySelector('.mode-menu');
const ruready = document.querySelector('.ruready');
const gameMenu = document.querySelector('.game-menu');
const goBackBtn = document.querySelector('.go-back-btn');

const playBtn = mainMenu.querySelector('.play-btn');
playBtn.addEventListener('click', () => {
  mainMenu.classList.remove('show');
  modeMenu.classList.add('show');
  goBackBtn.classList.remove('hide');
});

goBackBtn.addEventListener('click', () => {
  goBackBtn.classList.add('hide');
  mainMenu.classList.add('show');
  modeMenu.classList.remove('show');
});

// NORMAL - ADVANCE
const normalModeBtn = document.querySelector('.normal-mode-btn');
const exitBtn = document.querySelector('.exit-btn');
const level = document.querySelector('#level');
const gameboard = document.querySelector('.gameboard');

normalModeBtn.addEventListener('click', () => {
  modeMenu.classList.remove('show');
  gameboard.style.height = '400px';
  gameMenu.classList.add('show');

  level.textContent = `Normal`;

  goBackBtn.classList.add('hide');
  exitBtn.classList.remove('hide');
});

const advanceContain = document.querySelector('.advance-features');
const advancedModeBtn = document.querySelector('.advanced-mode-btn');
advancedModeBtn.addEventListener('click', () => {
  modeMenu.classList.remove('show');

  gameboard.style.height = '450px';
  advanceContain.classList.remove('hide');
  ruready.classList.add('show');

  level.textContent = `Advance`;

  goBackBtn.classList.add('hide');
  exitBtn.classList.remove('hide');
});

exitBtn.addEventListener('click', () => {
  exitBtn.classList.add('hide');
  gameMenu.classList.remove('show');
  mainMenu.classList.add('show');
});

/* COUNTDOWN */
const rureadyQ = ruready.querySelector('.ruready-header');
const countdown = ruready.querySelector('#countdown');
const readyBtn = rureadyQ.querySelector('.ready-btn');
readyBtn.addEventListener('click', () => {
  rureadyQ.classList.add('hide');
  setTimeout(() => {
    countdown.textContent = 3;
    countdown.classList.remove('hide');
    countdown.classList.add('fade');
  }, 500);
  setTimeout(() => {
    countdown.classList.remove('fade');
    countdown.classList.add('hide');
  }, 2000);
  setTimeout(() => {
    countdown.textContent = 2;
    countdown.classList.remove('hide');
    countdown.classList.add('fade');
  }, 2500);
  setTimeout(() => {
    countdown.classList.remove('fade');
    countdown.classList.add('hide');
  }, 4000);
  setTimeout(() => {
    countdown.textContent = 1;
    countdown.classList.remove('hide');
    countdown.classList.add('fade');
  }, 4500);
  setTimeout(() => {
    countdown.classList.remove('fade');
    countdown.classList.add('hide');
  }, 6000);
  setTimeout(() => {
    gameMenu.classList.add('show');
  }, 6500);
});

/* GAME SYSTEM */
let cardOne, cardTwo;
let disableGame = false;
let matchedCards = 0;

const cards = document.querySelectorAll('.card');

const flipCard = (e) => {
  let clickedCard = e.target;

  if (clickedCard !== cardOne && !disableGame) {
    clickedCard.classList.add('flip');

    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;

    disableGame = true;
    let cardOneImg = cardOne.querySelector('img').src,
      cardTwoImg = cardTwo.querySelector('img').src;
    matchCard(cardOneImg, cardTwoImg);
  }
};

const matchCard = (imgOne, imgTwo) => {
  if (imgOne === imgTwo) {
    matchedCards++;
    if (matchedCards == 8) {
      setTimeout(() => {
        return shuffleCards();
      }, 1000);
    }

    cardOne.removeEventListener('click', flipCard);
    cardTwo.removeEventListener('click', flipCard);
    cardOne = cardTwo = '';

    return (disableGame = false);
  }

  setTimeout(() => {
    cardOne.classList.add('shake');
    cardTwo.classList.add('shake');
  }, 300);
  setTimeout(() => {
    cardOne.classList.remove('shake', 'flip');
    cardTwo.classList.remove('shake', 'flip');
    cardOne = cardTwo = '';
    disableGame = false;
  }, 1000);
};

const shuffleCards = () => {
  matchedCards = 0;
  cardOne = cardTwo = '';

  let array = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  array.sort(() => (Math.random() > 0.5 ? 1 : -1));

  cards.forEach((card, index) => {
    card.classList.remove('flip');

    let imgTag = card.querySelector('img');
    imgTag.src = `./images/img-${array[index]}.png`;

    card.addEventListener('click', flipCard);
  });
};
shuffleCards();

cards.forEach((card) => {
  card.addEventListener('click', flipCard);
});

/* MODE DROPDOWN */
const modeBtns = document.querySelectorAll('.mode button');
modeBtns.forEach((btn) => {
  window.addEventListener('mouseover', (e) => {
    const dropdown = btn.nextElementSibling;
    const dropdownHeight = dropdown.getBoundingClientRect().height;
    const dropdownContent = dropdown.querySelector('ul').getBoundingClientRect().height;
    if (e.target === btn && dropdownHeight == 0) {
      dropdown.style.height = `${dropdownContent}px`;
    } else if (e.target !== btn && dropdownHeight > 0) {
      dropdown.style.height = 0;
    }
  });
});
