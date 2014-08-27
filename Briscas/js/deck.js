//(function ($) {
	/*
	 * Frozen objects representing the possible cards and suits
	 */
	var theSuits = Object.freeze(new Array("Clubs", "Swords", "Cups", "Coin"));

	var theBriscas = Object.freeze({
		ONE 		: {name : "One", number: 1, value : 11},
		TWO 		: {name : "Two", number: 2, value : 0},
		THREE 	: {name : "Three", number: 3, value : 10},
		FOUR 		: {name : "Four", number: 4, value : 0},
		FIVE 		: {name : "Five", number: 5, value : 0},
		SIX 		: {name : "Six", number: 6, value : 0},
		SEVEN 	: {name : "Seven", number: 7, value : 0},
		EIGHT 	: {name : "Eight", number: 8, value : 0},
		NINE 		: {name : "Nine", number: 9, value : 0},
		TEN 		: {name : "Ten", number: 10, value : 2},
		ELEVEN  : {name : "Eleven", number: 11, value : 3},
		TWELVE  : {name : "Twelve", number: 12, value : 4}
	});

	/*
	 *
	 */
	function Card (card, suit){
		this.suit = suit;
		this.name = card.name;
		this.number = card.number;
		this.value = card.value;
	};

	/*
	 * Represents playing card deck
	 * @params: deckType is a 48 card deck if true; 40 card deck if false
	 */
	function Deck (deckType) {
		// num of used cards from deck
		this.cardsUsed = 0;
		// cards array holds all the cards in this deck
		this.cards = new Array();
		// stores the life card of the shuffled deck
		this.lifeCard = new Object();

		for (var s = 0; s < theSuits.length; s++) {
			this.cards.push(new Card(theBriscas.ONE, theSuits[s]));
			this.cards.push(new Card(theBriscas.TWO, theSuits[s]));
			this.cards.push(new Card(theBriscas.THREE, theSuits[s]));
			this.cards.push(new Card(theBriscas.FOUR, theSuits[s]));
			this.cards.push(new Card(theBriscas.FIVE, theSuits[s]));
			this.cards.push(new Card(theBriscas.SIX, theSuits[s]));
			this.cards.push(new Card(theBriscas.SEVEN, theSuits[s]));
			this.cards.push(new Card(theBriscas.TEN, theSuits[s]));
			this.cards.push(new Card(theBriscas.ELEVEN, theSuits[s]));
			this.cards.push(new Card(theBriscas.TWELVE, theSuits[s]));

			// 48 card deck if true
			if (deckType == true) {
				this.cards.push(new Card(theBriscas.EIGHT, theSuits[s]));
				this.cards.push(new Card(theBriscas.NINE, theSuits[s]));
			}
		}

		// deals one card from the deck instance
		this.dealCard = function(){
			if ((deckType == false && this.cardsUsed < 40) || (deckType == true && this.cardsUsed < 48)) {
				this.cardsUsed++;
				return this.cards[this.cards.length-this.cardsUsed];
			} else {
				console.log("Deck is empty");
			}
		}

		// shuffles cards in array
		this.shuffle = function () {
			// implement efficient sorting algorithm
			var theDeck = this.cards;
			var currentIndex = theDeck.length
				,	temp
				,	randomIndex
				;

			while (currentIndex !== 0) {
				// Picks a remaining element
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				// And swaps it with the current element
				temp = theDeck[currentIndex];
				theDeck[currentIndex] = theDeck[randomIndex];
				theDeck[randomIndex] = temp;
			}
			// Set life card (and thus suit) of the shuffled deck to be ready for game.
			this.lifeCard = this.dealCard();
			return theDeck;
		}

		// returns the deck
		this.getDeck = function () {
			return this.cards;
		}

		// returns the life suit
		this.getLifeSuit = function () {
			return this.lifeCard.suit;
		}

		// returns deck size
		this.deckSize = function () {
			return this.cards.length;
		}

		// returns remaining card amount
		this.cardsRemaining = function () {
			return (this.cards.length - this.cardsUsed);
		}
	};
//})(jQuery);