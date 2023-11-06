const mainMenu = document.querySelector(".main-menu");
const modeMenu = document.querySelector(".mode-menu");
const gameMenu = document.querySelector(".game-menu");

const playBtn = mainMenu.querySelector(".play-btn");
playBtn.addEventListener("click", () => {
	mainMenu.classList.remove("show");
	modeMenu.classList.add("show");
});
const normalModeBtn = document.querySelector(".normal-mode-btn");
normalModeBtn.addEventListener("click", () => {
	modeMenu.classList.remove("show");
	gameMenu.classList.add("show");
});
const advancedModeBtn = document.querySelector(".advanced-mode-btn");
advancedModeBtn.addEventListener("click", () => {
	modeMenu.classList.remove("show");
	gameMenu.classList.add("show");
});

/* GAME SYSTEM */
let cardOne, cardTwo;
let disableGame = false;
let matchedCards = 0;

const cards = document.querySelectorAll(".card");

const flipCard = (e) => {
	let clickedCard = e.target;

	if (clickedCard !== cardOne && !disableGame) {
		clickedCard.classList.add("flip");

		if (!cardOne) {
			return (cardOne = clickedCard);
		}
		cardTwo = clickedCard;

		disableGame = true;
		let cardOneImg = cardOne.querySelector("img").src,
			cardTwoImg = cardTwo.querySelector("img").src;
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

		cardOne.removeEventListener("click", flipCard);
		cardTwo.removeEventListener("click", flipCard);
		cardOne = cardTwo = "";

		return (disableGame = false);
	}

	setTimeout(() => {
		cardOne.classList.add("shake");
		cardTwo.classList.add("shake");
	}, 300);
	setTimeout(() => {
		cardOne.classList.remove("shake", "flip");
		cardTwo.classList.remove("shake", "flip");
		cardOne = cardTwo = "";
		disableGame = false;
	}, 1000);
};

const shuffleCards = () => {
	matchedCards = 0;
	cardOne = cardTwo = "";

	let array = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
	array.sort(() => (Math.random() > 0.5 ? 1 : -1));

	cards.forEach((card, index) => {
		card.classList.remove("flip");

		let imgTag = card.querySelector("img");
		imgTag.src = `./images/img-${array[index]}.png`;

		card.addEventListener("click", flipCard);
	});
};
shuffleCards();

cards.forEach((card) => {
	card.addEventListener("click", flipCard);
});

/* MODE DROPDOWN */
const modeBtns = document.querySelectorAll(".mode button");
modeBtns.forEach((btn) => {
	window.addEventListener("mouseover", (e) => {
		const dropdown = btn.nextElementSibling;
		const dropdownHeight = dropdown.getBoundingClientRect().height;
		const dropdownContent = dropdown
			.querySelector("ul")
			.getBoundingClientRect().height;
		if (e.target === btn && dropdownHeight == 0) {
			console.log(dropdownContent);
			dropdown.style.height = `${dropdownContent}px`;
		} else if (e.target !== btn && dropdownHeight > 0) {
			dropdown.style.height = 0;
		}
	});
});
