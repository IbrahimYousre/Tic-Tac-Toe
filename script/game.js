/*
	models (done)
	1- state:(done)
		a nine element array of the board
		a char variable to indicate the current player
	2- move: (done)
		an integer [0:8] indicating the cell to play into
*/
(function(){
	// local constants
	var x = "x";
	var o = "o";
	var funnyErrors = [
		"Hey! Are you looking for something!",
		"Hey! I am here.",
		"Hey! Are you lost?",
		"Hey! Are you wasting my time!"
	];
	// global objects
	Game = function(aiPlay,notifyGameEnd,ai){
		var currentState = new State();
		var isAiThinking = false;
		ai = ai||"o";
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
			return (ai===x)?s:-s;
		}
		function allMoves(state){
			return state.availableMoves();
		}
		// these is used to ask ai to play
		function aiTurn(){
			isAiThinking = true;
			setTimeout(function(){
				var aiMove = Arrays.shuffle(minimax(currentState,transform,allMoves,score))[0];
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
			currentState = new State();
			if(ai===x) aiTurn();
		}
		if(ai===x) aiTurn();
	};
	State = function(board,player){
		if(board) this.board = board.map(function(e){return e});
		else this.board = ["","","",	"","","",	"","",""];
		this.currentPlayer = player||x;
		this.clone = function(){return new State(this.board,this.currentPlayer)};
		this.nextPlayer = function(){return (this.currentPlayer===x)?o:x};
		this.availableMoves = function(){
			var board = this.board;
			var moves = [];
			for (var i = 0; i < board.length; i++) {
				if(board[i]==="")moves.push(i);
			}
			return moves;
		};
		this.score = function(){// score for x
			var board = this.board;
			for (var i = 0; i < 3; i++) {// cols
				if(board[i] == board[i+3] && board[i] == board[i+6]){
					if(board[i] == x)return 10;
					if(board[i] == o)return -10;
				}
			}
			for (var i = 0; i < 3; i++) {// rows
				if(board[i*3] == board[i*3+1] && board[i*3] == board[i*3+2]){
					if(board[i*3] == x)return 10;
					if(board[i*3] == o)return -10;
				}
			}
			if(board[0] == board[4] && board[4] == board[8]){// first diagonal
					if(board[4] == x)return 10;
					if(board[4] == o)return -10;
			}
			if(board[2] == board[4] && board[4] == board[6]){// second diagonal
					if(board[4] == x)return 10;
					if(board[4] == o)return -10;
			}
			if(board.join("").length===9) return 0;// tie
			throw new Error("Game did't end yet!");
		};
		this.gameEnded = function (){
			try{
				this.score();
			}catch(e){
				return false;
			}
			return true;
		};
	};
})()