/*
 * Represents a player's hand
 */
function Hand () {
	this.handSize = 0;
	this.cards = new Array();
	/*
	 *
	 */
	this.addCard = function (card) {
		if (this.handSize < 3) {
			this.cards.push(card);
			this.handSize++;
		}
		else {
			console.log("Player has a full hand");
		}
	}
	/*
	 *
	 */
	this.removeCard = function (i) {
		this.handSize--;
		return this.cards.splice(i,1);
	}

	this.removeCard = function (card) {
		var i;
		for (i = 0; i < 3; i++) {
			if (this.cards[i].number == card.number && this.cards[i].suit == card.suit) {
				this.handSize--;
				return this.cards.splice(i,1);
			}
		}
	}

	this.clear = function () {
		this.cards.length = 0;
	}
	this.size = function (){
		return this.handSize;
	}
	this.getCard = function (i) {
		return this.cards[i];
	}
};