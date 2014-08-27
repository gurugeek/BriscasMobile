(function ($) {

var playerSelect = true;
var players = new Array();

/*while (playerSelect) {
	var playerCount = prompt("How many players?");
	if (playerCount == 2 || playerCount == 4) {
		playerSelect = false;
		for (var i = 0; i < playerCount; i++) {
			players[i] = new Player();
			players[i].setName(prompt("Please set your player names. Who is Player " + i)); 
			players[0].setId(i);
		}
	} else {
		alert("Invalid player amount. Please try again");
	}
}*/

////////////// TEMP FOR DEV PURPOSES //////////////
playerCount = 2;

players[0] = new Player();
players[0].setName("Foo");
players[0].setId(0);

players[1] = new Player();
players[1].setName("Bar");
players[1].setId(1);

for (var i = 0; i < playerCount; i++) {
	console.log("Welcome to Briscas " + players[i].getName());
}
///////////////////// END /////////////////////////

//the following block will have to go be modified and go inside a function before gameLogic;
/****************************** INITIALIZATION BLOCK ********************************/
var deckType = false;
//if (prompt("40 or 48 card deck?") == 48) {
//	deckType = true;
//}

// pass it true to get a 48 card deck
var deck = new Deck(deckType);
deck.shuffle();
console.log("The life suit is: " + deck.getLifeSuit());
$("#life-suit").html(deck.getLifeSuit());

var field = new CardField(deck.getLifeSuit());
var currentTurn = 1;
$("#turn-total").html(currentTurn); //to show initial turn count
/*************************** END BLOCK ***********************************************/

/********************************** MAIN FUNCTION ************************************/
gameLogic();
/********************************** END FUNCTION *************************************/

// main function
function gameLogic () {
	// initial dealing
	dealCards(3);
	displayHand();
	playCard();
	//compareCards();
}

// Fill up the player's hands with cards
function dealCards(cardAmount){
	for (var i=0; i < cardAmount; i++) {
		for (var j=0; j < playerCount; j++) {
			players[j].getHand().addCard(deck.dealCard());
		}
	}
}

// given the winning player's id, deal the cards in the proper order
function dealCardsEndOfTurn(id){
	var dealt_to_winner = false;
	for(var i = 0; i < players.length; i++){
		if(id == players[i].id){
			dealt_to_winner = true;
		}
		if(dealt_to_winner){
			players[i].getHand().addCard(deck.dealCard());
		}
	}
}

// not the best way but it's just for testing purposes
function displayHand() {
	var hand_template = "";
	for (var i = 0; i < players.length; i++){
		hand_template = '<h4>Player: {{name}}</h4><div id="player-cards-'+i+'"class="btn-group-vertical" data-player-id="{{id}}">{{#hand}}{{#cards}}<button type="button" class="card btn btn-primary" data-card-name="{{name}}" data-card-suit="{{suit}}" data-card-number="{{number}}" data-card-value="{{value}}">{{name}} of {{suit}}</button><hr />{{/cards}}{{/hand}}</div>';
		$("#player-hand-"+i).html(Mustache.to_html(hand_template, players[i]));
	}
}

//
function playCard() {
	$('.card').on("click", function(){
		var thePlayer = $(this).parent().attr("data-player-id");
		var theCard = {
			name : $(this).attr("data-card-name"),
			suit : $(this).attr("data-card-suit"),
			number : Number($(this).attr("data-card-number")),
			value : Number($(this).attr("data-card-value"))
		}

		field.playCard(thePlayer, theCard); // add card to field
		players[thePlayer].getHand().removeCard(theCard); // remove card from hand
		$(this).remove(); // remove card from GUI

		compareCards();
	});
}

//
function compareCards() {
	if(field.getCardCount() == 2){
		field.showPlayedCards(currentTurn);
		/*	winning_play = {
				player_id,
				card
		}*/
		var winning_play = {};
		var winner = field.compareCards();
		var p = null;
		if (winner){
			p = 0;
		} else if (!winner){
			p = 1;
		}
		winning_play.player_id = field.getPlay(p).player;
		winning_play.card = field.getPlay(p).card;

		//display game summary code
		$("#game-summary").append("<p><i>Winner: </i> Player " + winning_play.player_id + ", with the " + winning_play.card.name + " of " + winning_play.card.suit + "</p>");

		//add cards to winning player's pile
		for(var i = 0; i < players.length; i++){
			if(players[i].id == winning_play.player_id){
				for (var j = 0; j < 2; j++){
					players[i].addToPile(field.getPlay(j).card);
				}
				console.log("Player " + winning_play.player_id + "'s pile value total is now " + players[i].pileValue());
			}
		}

		//remove cards from field
		field.removeCards();

/* Following Code probably does not go here but put here for TODO purposes */
		updateScore();
		updateTurn();

		//deal cards for winner first, then other player; needs to be redone for more than 2 players
		dealCardsEndOfTurn(winning_play.player_id);

		//refresh players hands to show added cards
		//displayHand(); //freezes logic for some reason
/* End of code that probably dsnt go here */
	}
}

// display score on screen; needs to be modified for more than two players
function updateScore(){
	$("#player-one-score").html(players[0].pileValue());
	$("#player-two-score").html(players[1].pileValue());
}

//updates turn count
function updateTurn(){
		currentTurn++;
	$("#turn-total").html(currentTurn);
}

// Show an individual player's cards in his hand
function showHand (thePlayer) {
	console.log("Player " + thePlayer.getName() + " hand: ");
	for (var i = 0; i < 3; i++) {
		var theCard = thePlayer.getHand().getCard(i);
		console.log("  " + theCard.name + " of " + theCard.suit);
	}
}

// Shows all player's cards in their hands, by player
function showHands (numOfPlayers) {
	for (var i = 0; i < numOfPlayers; i++) {
		showHand(players[i]);
	}
}

})(jQuery);