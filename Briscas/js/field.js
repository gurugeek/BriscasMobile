function CardField (lifeSuit) {
	this.field = new Array();
	this.lifeSuit = lifeSuit;

	this.getCardCount = function(){
		return this.field.length;
	}
	// Places card player chooses from hand on Field.
	// there can't be more than two cards in the field at any given time
	this.playCard = function (thePlayer, theCard) {
		if (this.field.length < 2){
			var thePlay = {"player" : thePlayer, "card" : theCard};
			this.field.push(thePlay);
		} else {
			console.log("Field is full");
		}
	}
	// removes all cards from field
	this.removeCards = function () {
		if (this.field.length > 0){
			this.field = [];
		} else {
			console.log("Field is empty");
		}
	}
	// can only remove last card played
	this.removePlayedCard = function () {
		if (this.field.length > 0){
			return this.field.pop();
		} else {
			console.log("Field is empty");
		}
	}
	//
	this.compareCards = function(){
		var winner = null; // true means first card wins turn; false means second card wins
		if (this.field.length < 2){
			return console.log("ERROR: Cant compare cards in field when there is less than two cards");
		} else {
			//
			var card1 = this.field[0].card;
			var card2 = this.field[1].card;
			//
			var suitComparison = compareSuit(card1.suit, card2.suit, this.lifeSuit);
			switch (suitComparison){
				case true:
				case "different": // card1 is winner because it was the first card placed on field
					winner = true;
					break;
				case false:
					winner = false;
					break;
				case "equal":
					var valueComparison = compareValue(card1, card2);
					if(valueComparison){
						winner = true;
					} else if (!valueComparison){
						winner = false;
					} else {
						console.log("ERROR: This case is impossible");
					}
			}
			return winner;
		}

		/*
		 *
		 * returns true if card1 wins; false if card2 wins, "equal" if values are equal
		 */
		function compareValue(card1, card2){
			if(card1.value > card2.value){
				return true;
			} else if(card1.value < card2.value){
				return false;
			} else {
				if(card1.number > card2.number){
					return true;
				} else if(card1.number < card2.number) {
					return false;
				} else {
					return "equal";
				}
			}
		}	
		/*
		 *
		 * returns true if card1 wins; false if card2 wins, "equal" if suits are equal, or "different" if suits are different
		 */
		function compareSuit(suit1, suit2, lifeSuit){
			if(suit1 == suit2) {
				return "equal";
			} else if(suit1 == lifeSuit){
				return true;
			} else if(suit2 == lifeSuit){
				return false;
			} else {
				return "different";
			}
		}
	}
	// pos = position
	this.getPlay = function (position) {
		return this.field[position];
/*		for(var i = 0; i < this.field.length; i++){
			if(player == this.field[i].player){
				return this.field[i];
			}
		}
		console.log("ERROR: Player's play not found");*/
	}
	// gets all the cards currently on the field
	this.showPlayedCards = function (turn) {
		console.log("Field contains: ");
		$("#game-summary").append("<ul><b>Turn "+ turn +"</b>");
		for (var i = 0; i < this.field.length; i++){
			var currentPlay = this.field[i];
			console.log("Player " + currentPlay.player + " played the " + currentPlay.card.name + " of " + currentPlay.card.suit);
			$("#game-summary").append("<li>Player " + currentPlay.player + " played the " + currentPlay.card.name + " of " + currentPlay.card.suit + "</li>");
		}
		$("#game-summary").append("</ul>");
	}
};