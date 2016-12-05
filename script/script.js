/*
	we will use the minimax algorithms to which the arguments are
	- the current state (done)
	- the transformation function (done)
	- a function to calculate the available moves (done)
	- the score function (done)
	and which will return the move to perform

	models (done)
	1- state:(done)
		a nine element array of the board
		a char variable to indicate the current player
	2- move: (done)
		an integer indicating the cell to play into
*/
/*
	note:
		- score is calculated and reported as by the first player(human)
*/
var colors = ["blue","red"];
$(document).ready(function(){
	var game = new Game(function(move){// called when the ai has decided on a move
		$($(".cell")[move]).css("background-color",colors[0]);
	},function(score){// called when the game has ended
		setTimeout(function(){
			alert(score);
			reset();
		},100);
	});
	$(".cell").toArray().forEach(function(el,i){
		$(el).click(function(){
			game.userInput(i);
			$(el).css("background-color",colors[1]);
		});
	});
	function reset(){
		$(".cell").css("background-color","");
		game.reset();
	}
});

(function(){
	// constants
	var x = "x";
	var o = "o";
	// global object
	Game = function(play,nofifyGameEnd){
		var currentState = new State();
		function transform(state,move){
			try{
				if(state.board[move])throw new Error();
				state = state.clone();
				state.board[move] = state.currentPlayer;
				state.currentPlayer = state.nextPlayer();
			}catch(e){
				alert("Hey! Are you trying to waste my time!");
			}
			return state;
		}
		this.userInput = function(move){
			currentState = transform(currentState,move);
			if(currentState.gameEnded()) return nofifyGameEnd(currentState.score());
			var aiMove = currentState.availableMoves()[0];// todo: calculate the correct move according to minimax
			currentState = transform(currentState,aiMove);
			play(aiMove);
			if(currentState.gameEnded()) return nofifyGameEnd(currentState.score());
		}
		this.reset = function(){
			currentState = new State();
		}
	};
	// local object
	var State = function(board,currentPlayer){
		if(board) this.board = board.map(function(e){return e});
		else this.board = ["","","",	"","","",	"","",""];
		if(currentPlayer) this.currentPlayer = currentPlayer;
		else this.currentPlayer = x;
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
		this.score = function(){// for player x
			var board = this.board;
			for (var i = 0; i < 3; i++) {// rows
				if(board[i*3] == board[i*3+1] && board[i*3] == board[i*3+2]){
					if(board[i*3] == x)return 10;
					if(board[i*3] == o)return -10;
				}
			}
			for (var i = 0; i < 3; i++) {// cols
				if(board[i] == board[i+3] && board[i] == board[i+6]){
					if(board[i] == x)return 10;
					if(board[i] == o)return -10;
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
			if(board.join("").length==9) return 0;// tie
			throw new Error();// game not ended yet
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