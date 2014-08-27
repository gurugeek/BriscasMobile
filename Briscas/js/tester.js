	//START: FOR TESTING PURPOSES ONLY
	var deck = new Deck(false);	
	var player = new Player();

	//deck.shuffle();
	console.log("Card total in deck before dealing: " + deck.deckSize());
	console.log("Cards left: " + deck.cardsLeft());

	for (var x =0; x < deck.deckSize(); x++) {
		var myCard = deck.dealCard();
		player.hand.addCard(myCard);
		console.log(myCard.name + " of " + myCard.suit + "; value of "+ myCard.value);
	}
	console.log("Card total in deck after dealing: " + deck.deckSize());
	console.log("Cards left: " + deck.cardsLeft());
	console.log("Player's hand before removing a card is: ");
	for (var y = 0; y <player.hand.size(); y++) {
		console.log(y+": "+player.hand.getCard(y).name + " of " + player.hand.getCard(y).suit + "; value of "+ player.hand.getCard(y).value);
	}
	player.hand.removeCard(1);
	console.log("Player's hand after removing a card is: ");
	for (var y = 0; y <player.hand.size(); y++) {
		console.log(y+": "+player.hand.getCard(y).name + " of " + player.hand.getCard(y).suit + "; value of "+ player.hand.getCard(y).value);
	}

function testRandomness (theDeck) {
	console.log("---------------TESTING RANDOMNESS---------------");
	var coinAmount = 0, 
			clubsAmount = 0, 
			swordsAmount = 0, 
			cupsAmount = 0;

	for (var i = 0; i < 1000; i++) {
		theDeck.shuffle();
		switch(theDeck.getLifeSuit()) {
			case "Coin" :
				coinAmount++;
				break;
			case "Swords" :
				swordsAmount++;
				break;
			case "Clubs" :
				clubsAmount++;
				break;
			case "Cups" :
				cupsAmount++;
				break;
		}
	}
	console.log("Coin amount: " + coinAmount);
	console.log("Swords amount: " + swordsAmount);
	console.log("Clubs amount: " + clubsAmount);
	console.log("Cups amount: " + cupsAmount);
}
	//END: FOR TESTING PURPOSES ONLY

	/*
	Testing out mustache templating
*/
	var Cards = [
		{
			id : 20,
			value : 2,
			suit : "Cups"
		},
		{
			id : 10,
			value : 10,
			suit : "Swords"
		}
	];

	var the_player = {
		id : 9001,
		name : "Foo Bar",
		hand : Cards
	}
	var hand_template = '<h4 data-player-id="{{id}}">Player: {{name}}</h4>{{#hand}}<button type="button" class="card btn btn-primary" data-card-id="{{id}}" data-card-value="{{value}}" data-card-suit="{{suit}}">{{value}} of {{suit}}</button><hr />{{/hand}}';
	var player_hand = Mustache.to_html(hand_template, the_player);
	$("#player-hand").html(player_hand);

/*	End of Mustache Test*/