$(function(){
	var colors = ["red","blue"];
	var colorIndex = 0;
	var game = new Game(doAiMove, gameEnded,"x");
	$(".cell").toArray().forEach(function(el,i){
		$(el).click(function(){
			try{
				game.userInput(i);
				$(el).css("background-color",colors[colorIndex++%2]);
			}catch(e){
				alert(e.message);
			}
		});
	});
	function doAiMove(move){
		$($(".cell")[move]).css("background-color",colors[colorIndex++%2]);
	}
	function gameEnded(score){
		setTimeout(function(){
			alert((score<0)?"You Lose!":(score>0)?"You Won!":"Tie!");
			reset();
		},100);
	}
	function reset(){
		$(".cell").css("background-color","");
		colorIndex = 0;
		game.reset();
	}
});