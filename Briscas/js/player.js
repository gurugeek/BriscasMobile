//(function ($) {
	/*
	 *
	 */
	function Player () {
		this.id = null;
		this.name = "";
		this.hand = new Hand();
		this.pile = new Array();

		this.setName = function(name){
			this.name = name;
		}
		this.getName = function(){
			return this.name;
		}
/*		this.setHand = function (hand) {
			this.hand = hand;
		}*/
		this.getHand = function(){
			return this.hand;
		}
		this.setId = function(id){
			this.id = id;
		}
		/*
		 * Adds a card won to a player's pile
		 * @params: card is a card won in current turn. pile is the player's won cards pile
		 */
		this.addToPile = function(card){
			return this.pile.push(card);
		}
		//
		this.emptyPile = function(){
			this.pile = [];
		}
		/*
		 * Adds up point totals of all cards in pile
		 * @params: pile is the player or team's won cards pile
		 */
		this.pileValue = function(){
			var total = 0;
			for (var i = 0; i < this.pile.length; i++) {
				total += Number(this.pile[i].value);
			}
			return total;
		}
	};
//})(jQuery);