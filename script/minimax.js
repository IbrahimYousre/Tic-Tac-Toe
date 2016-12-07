/*
	The minimax algorithms to which the arguments are
	- the current state
	- the transformation function
	- a function to calculate all the available moves
	- the score function
	and which will return the move to perform
*/
(function(){
	minimax = function(currentState, transform, allMoves, score){
		var moves = allMoves(currentState);
		var scores = moves.map(function(move){
			return minimaxValue(1,transform(currentState,move),transform,allMoves,score);
		});
		var maxScore = Arrays.max(scores);
		return moves.filter(function(move,i){
			return scores[i]==maxScore;
		});
	}
	minimaxValue = function(depth, currentState, transform, allMoves, score){
		var s = score(currentState);
		if(!isNaN(s)){
			return s;
		}else{
			var scores = allMoves(currentState).map(function(move){
				return minimaxValue(depth+1,transform(currentState,move),transform,allMoves,score);
			});
			if(depth%2==0)
				return Arrays.max(scores);
			else
				return Arrays.min(scores);
		}
	}
})()