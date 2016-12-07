(function(){
	// global object
	Game = function(aiPlay,notifyGameEnd,ai){
		var currentState;
		var isAiThinking;
		ai = ai||Player.o;
		// these is used to ask ai to play
		function aiTurn(){
			isAiThinking = true;
			setTimeout(function(){
				moves = minimax(currentState,State.transform,State.allMoves,State.advancedScore(ai));
				var aiMove = Arrays.shuffle(moves)[0];
				isAiThinking = false;
				currentState = State.transform(currentState,aiMove);
				aiPlay(aiMove);
				if(currentState.gameEnded()) return notifyGameEnd(-State.score(ai)(currentState));
			},100);
		}
		this.userInput = function(move){
			if(isAiThinking)throw new Error("I am thinking!");
			currentState = State.transform(currentState,move);
			if(currentState.gameEnded()) return notifyGameEnd(-State.score(ai)(currentState));
			if(ai) aiTurn();
		}
		this.reset = function(){
			currentState	 = new State([
				"","","",
				"","","",
				"","",""
			]);
			isAiThinking = false;
			if(ai===Player.x) aiTurn();
		}
		this.reset();
	};
})()