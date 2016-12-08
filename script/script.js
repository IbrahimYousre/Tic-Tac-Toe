$(function(){
	var ai = confirm("Do you want to play as X ?")===true?Player.o:Player.x;
	var marks = ["X","O"];
	var markIndex = 0;
	var game = new Game(doAiMove, gameEnded,ai);
	$(".cell").toArray().forEach(function(el,i){
		$(el).click(function(){
			try{
				game.userInput(i);
				$(el).text(marks[markIndex++%2]);
			}catch(e){
				alert(e.message);
			}
		});
	});
	function doAiMove(move){
		$($(".cell")[move]).text(marks[markIndex++%2]);
	}
	function gameEnded(score){
		setTimeout(function(){
			alert((score<0)?"You Lose!":(score>0)?"You Won!":"Tie!");
			reset();
		},100);
	}
	function reset(){
		$(".cell").text("");
		markIndex = 0;
		game.reset();
	}
});