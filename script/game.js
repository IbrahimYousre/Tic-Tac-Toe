(function(){
	// local constant
	var funnyErrors = [
		"Hey! Are you looking for something!",
		"Hey! I am here.",
		"Hey! Are you lost?",
		"Hey! Are you wasting my time!"
	];
	// global object
	Game = function(aiPlay,notifyGameEnd,ai){
		var currentState = new State();
		var isAiThinking = false;
		ai = ai||Player.o;
		// these 3 functions are used as arguments to the minimax algorithm
		function transform(state,move){
			if(state.board[move])throw new Error(funnyErrors[Math.floor(Math.random()*funnyErrors.length)]);
			state = state.clone();
			state.board[move] = state.currentPlayer;
			state.currentPlayer = state.nextPlayer();
			return state;
		}
		function score(state){// for ai
			var s = state.score();
			return (ai===Player.x)?s:-s;
		}
		function allMoves(state){
			return state.availableMoves();
		}
		// these is used to ask ai to play
		function aiTurn(){
			isAiThinking = true;
			setTimeout(function(){
				moves = minimax(currentState,State.transform,State.allMoves,State.score(ai));
				console.log(moves);
				var aiMove = Arrays.shuffle(moves)[0];
				isAiThinking = false;
				currentState = transform(currentState,aiMove);
				aiPlay(aiMove);
				if(currentState.gameEnded()) return notifyGameEnd(-score(currentState));
			},100);
		}
		this.userInput = function(move){
			if(isAiThinking)throw new Error("I am thinking!");
			currentState = transform(currentState,move);
			if(currentState.gameEnded()) return notifyGameEnd(-score(currentState));
			if(ai) aiTurn();
		}
		this.reset = function(){
			var currentState = new State();
			var isAiThinking = false;
			if(ai===Player.x) aiTurn();
		}
		this.reset();
	};
})()