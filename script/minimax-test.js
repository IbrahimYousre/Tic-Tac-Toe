
function assertEquals(a,b,callBack,message){
	if(!Arrays.equals(a,b)) callBack();
	else if(message) console.log(message);
}

function assertTrue(check,callBack,message){
	if(!check) callBack();
	else if(message) console.log(message);
}

(function(){
	var testData = [
		// wining situations
		{
			state: new State([
				"","o","",
				"","x","",
				"","","",],"x"),
			score: 10,
			moves: [0,2,3,5,6,8]
		},
		{
			state: new State([
				"","","",
				"o","x","",
				"","","",],"x"),
			score: 10,
			moves: [0,1,2,6,7,8]
		},
		{
			state: new State([
				"","","",
				"","x","o",
				"","","",],"x"),
			score: 10,
			moves: [0,1,2,6,7,8]
		},
		{
			state: new State([
				"","","",
				"","x","",
				"","o","",],"x"),
			score: 10,
			moves: [0,2,3,5,6,8]
		},
		// losing situations
		{
			state: new State([
				"","x","",
				"o","o","",
				"","","",],"x"),
			score: -10,
			moves: [0,2,5,6,7,8]
		},
		{
			state: new State([
				"","o","",
				"x","o","",
				"","","",],"x"),
			score: -10,
			moves: [0,2,5,6,7,8]
		},
		{
			state: new State([
				"","o","",
				"","o","x",
				"","","",],"x"),
			score: -10,
			moves: [0,2,3,6,7,8]
		},
		{
			state: new State([
				"","","",
				"o","o","",
				"","x","",],"x"),
			score: -10,
			moves: [0,1,2,5,6,8]
		},
		// tie situations
		{
			state: new State([
				"x","","",
				"","o","",
				"","","",],"x"),
			score: 0,
			moves: [1,2,3,5,6,7,8]
		},
		{
			state: new State([
				"","","",
				"","","",
				"","","",],"x"),
			score: 0,
			moves: [0,1,2,3,4,5,6,7,8]
		},
		// more situations
		{
			state: new State([
				"","x","",
				"","o","",
				"","x","",],Player.o),
			score: 10,
			moves: [0,2,3,5,6,8]
		},
		{
			state: new State([
				"","","",
				"x","o","",
				"","","",],Player.x),
			score: 0,
			moves: [0,1,2,6,7,8]
		},
		{
			state: new State([
				"","","",
				"x","","o",
				"","","",],Player.x),
			score: 0,
			moves: [0,1,2,4,6,7,8]
		},
		{
			state: new State([
				"o","","",
				"x","","",
				"","","",],Player.x),
			score: 0,
			moves: [1,2,4,8]
		},
		{
			state: new State([
				"","o","",
				"x","","",
				"","","",],Player.x),
			score: 0,
			moves: [0,2,4,5,6,7,8]
		},
		{
			state: new State([
				"","","o",
				"x","","",
				"","","",],Player.x),
			score: 0,
			moves: [0,1,4,5,6,7,8]
		},
	]
	function printBoard(state){
		console.log(state.board.slice(0,3));
		console.log(state.board.slice(3,6));
		console.log(state.board.slice(6,9));
		console.log("current: "+state.currentPlayer);
	}
	function testMiniMaxValue(testData,i){
		var time = new Date();
		var value =  minimaxValue(0,testData.state,State.transform,State.allMoves,State.score(testData.state.currentPlayer));
		time = (new Date()-time)/1000;
		assertTrue(time<0.5&&testData.score == value,function(){
			console.log("failed test #"+i);
			printBoard(testData.state);
			console.log(testData.score);
			console.log(value);
			console.log("run time: "+time);
		});
	}
	function testMiniMax(testData,i){
		var time = new Date();
		var calculatedMoves =  minimax(testData.state,State.transform,State.allMoves,State.score(testData.state.currentPlayer));
		time = (new Date()-time)/1000;
		assertTrue(Arrays.equals(testData.moves,calculatedMoves)&&time<0.5,function(){
			console.log("failed test #"+i);
			printBoard(testData.state);
			console.log(testData.moves);
			console.log(calculatedMoves);
			console.log("run time: "+time);
		})
	}
	var totalTime = new Date();
	console.log("------ minimaxValue test started  ------");
	testData.forEach(testMiniMaxValue);
	console.log("------ minimaxValue test finished ------");
	console.log("------    minimax test started    ------");
	testData.forEach(testMiniMax)
	console.log("------   minimax test finished    ------");
	console.log("Total Time: "+(new Date()-totalTime)/1000+"s");
})()