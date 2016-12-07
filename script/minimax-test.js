(function(){
	function transform(state,move){
		state = state.clone();
		state.board[move] = state.currentPlayer;
		state.currentPlayer = state.nextPlayer();
		return state;
	}
	function score(state){
		return state.score();
	}
	function allMoves(state){
		return state.availableMoves();
	}
	function assertEquals(a,b,callBack){
		if(Arrays.equals(a,b))callBack();
	}
	function assertTrue(check,callBack){
		if(!check)callBack();
	}
	var testData = [
		// wining situations
		{
			state: new State([
				"","o","",
				"","x","",
				"","","",],"x"),
			score: 10,
			result: [0,2,3,5,6,8]
		},
		{
			state: new State([
				"","","",
				"o","x","",
				"","","",],"x"),
			score: 10,
			result: [0,1,2,6,7,8]
		},
		{
			state: new State([
				"","","",
				"","x","o",
				"","","",],"x"),
			score: 10,
			result: [0,1,2,6,7,8]
		},
		{
			state: new State([
				"","","",
				"","x","",
				"","o","",],"x"),
			score: 10,
			result: [0,2,3,5,6,8]
		},
		// losing situations
		{
			state: new State([
				"","x","",
				"o","o","",
				"","","",],"x"),
			score: -10,
			result: [0,2,5,6,7,8]
		},
		{
			state: new State([
				"","o","",
				"x","o","",
				"","","",],"x"),
			score: -10,
			result: [0,2,5,6,7,8]
		},
		{
			state: new State([
				"","o","",
				"","o","x",
				"","","",],"x"),
			score: -10,
			result: [0,2,3,6,7,8]
		},
		{
			state: new State([
				"","","",
				"o","o","",
				"","x","",],"x"),
			score: -10,
			result: [0,1,2,5,6,8]
		},
		// tie situations
		{
			state: new State([
				"","","",
				"","o","",
				"","","",],"x"),
			score: 0,
			result: [0,2,6,8]
		},
		{
			state: new State([
				"","","",
				"","","",
				"","","",],"x"),
			score: 0,
			result: [0,1,2,3,4,5,6,7,8]
		},
	]
	testData.forEach(testMiniMaxValue);
	console.log("minimaxValue test finished");
	function testMiniMaxValue(testData){
		var time = new Date();
		var value =  minimaxValue(0,testData.state,transform,allMoves,score);
		time = (new Date()-time)/1000;
		assertTrue(time<0.5&&testData.score == value,function(){
			console.log(testData.state.board.slice(0,3));
			console.log(testData.state.board.slice(3,6));
			console.log(testData.state.board.slice(6,9));
			console.log(value);
			console.log(testData.score);
			console.log("run time: "+time);
		});
	}

	testData.forEach(testMiniMax)
	console.log("minimax test finished");
	function testMiniMax(testData){
		var time = new Date();
		var move =  minimax(testData.state,transform,allMoves,score);
		time = (new Date()-time)/1000;
		assertTrue(Arrays.equals(testData.result,move)&&time<0.5,function(){
			console.log(testData.state.board.slice(0,3));
			console.log(testData.state.board.slice(3,6));
			console.log(testData.state.board.slice(6,9));
			console.log(move);
			console.log(testData.result);
			console.log("run time: "+time);
		})
	}
})()