/*
	models (done)
	1- state:(done)
		a nine element array of the board
		a char variable to indicate the current player
	2- move: (done)
		an integer [0:8] indicating the cell to play into
*/
(function(){
	// local constant
	var funnyErrors = [
		"Hey! Are you looking for something!",
		"Hey! Are you wasting my time!",
		"Hey! Are you lost?"
	];
	// global constant better to be static memeber of State
	Player = {
		x:"x",
		o:"o"
	}
	// constructor
	State = function(board,player){
		if(board) this.board = board.map(function(e){return e});
		else this.board = ["","","",	"","","",	"","",""];
		this.currentPlayer = player||Player.x;
	};
	// instance methods
	State.prototype.clone = function(){return new State(this.board,this.currentPlayer)};
	State.prototype.nextPlayer = function(){return (this.currentPlayer===Player.x)?Player.o:Player.x};
	State.prototype.availableMoves = function(){
		var board = this.board;
		var moves = [];
		for (var i = 0; i < board.length; i++) {
			if(board[i]==="")moves.push(i);
		}
		return moves;
	};
	State.prototype.score = function(){// score for x
		var board = this.board;
		for (var i = 0; i+6 < 9; i++) {// cols
			if(board[i] == board[i+3] && board[i] == board[i+6]){
				if(board[i] == Player.x)return 10;
				if(board[i] == Player.o)return -10;
			}
		}
		for (var i = 0; i+2 < 9; i+=3) {// rows
			if(board[i] == board[i+1] && board[i] == board[i+2]){
				if(board[i] == Player.x)return 10;
				if(board[i] == Player.o)return -10;
			}
		}
		if(board[0] == board[4] && board[4] == board[8]){// first diagonal
				if(board[4] == Player.x)return 10;
				if(board[4] == Player.o)return -10;
		}
		if(board[2] == board[4] && board[4] == board[6]){// second diagonal
				if(board[4] == Player.x)return 10;
				if(board[4] == Player.o)return -10;
		}
		if(board.join("").length===9) return 0;// tie
		return NaN;
	};
	State.prototype.gameEnded = function (){
		return !isNaN(this.score());
	};
	// static methods
	State.transform = function(state,move){
		if(state.board[move])throw new Error(funnyErrors[Math.floor(Math.random()*funnyErrors.length)]);
		state = state.clone();
		state.board[move] = state.currentPlayer;
		state.currentPlayer = state.nextPlayer();
		return state;
	}
	State.score = function(player){
		if(player==Player.x){
			return function(state){
				return state.score();
			}
		}else{
			return function(state){
				return -state.score();
			}
		}
	}
	State.advancedScore = function(player){
			return function(state){
				var scoreX = state.score();
				scoreX-=state.board.reduce(function(acc,e){
					if(e!==""&&e!=player)return acc+1;
					return acc;
				},0);
				return scoreX*((player===Player.x)?1:-1);
			}
	}
	State.allMoves = function(state){
		return state.availableMoves();
	}
})()