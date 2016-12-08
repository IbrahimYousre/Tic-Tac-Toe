$(function(){
	var situations = [
		// the center opening
		new State([
				"","","",
				"","x","",
				"o","","",],"x"),
		new State([
				"","","",
				"","x","",
				"","o","",],"x"),
		// the corner opening
		new State([
				"","","",
				"","o","",
				"x","","",],"x"),
		new State([
				"","","o",
				"","","",
				"x","","",],"x"),
		new State([
				"","o","",
				"","","",
				"x","","",],"x"),
		new State([
				"o","","",
				"","","",
				"x","","",],"x"),
		new State([
				"","","",
				"o","","",
				"x","","",],"x"),
		// the edge opening
		new State([
				"","","",
				"","o","",
				"","x","",],"x"),
		new State([
				"","o","",
				"","","",
				"","x","",],"x"),
		new State([
				"","","o",
				"","","",
				"","x","",],"x"),
		new State([
				"","","",
				"","","o",
				"","x","",],"x"),
		new State([
				"","","",
				"","","",
				"","x","o",],"x"),
	];
	var rows = [];
	situations.forEach(function(state){
		value = minimaxValue(0,state,State.transform,State.allMoves,State.score(state.currentPlayer));
		var result;
		if(value>0){
			result = "X wins";
		}else if(value<0){
			result = "O wins";
		}else{
			result = "Draw";
		}
		var cells = state.board.map(function(a){
			return "<div class='cell'>"+a.toUpperCase()+"</div>";
		}).join("");
		rows.push({
			value:value,
			html:"<div class='row'>\
			<div class='col-xs-6'>\
			<div class='board clearfix'>"+cells+"</div>\
			</div>\
			<div class='col-xs-6'>\
			<div class='result-container'><div>"+result+" <a href='#'>[How?]</a></div></div>\
			</div>\
			</div>"});
	});
	var table = $("#table");
	rows.forEach(function(row){
		table.append(row.html);
	});
	$("#win").click(function(){
		table.empty();
		rows.forEach(function(row){
			if(row.value>0){
				table.append(row.html);
			}
		});
	});
	$("#all").click(function(){
		table.empty();
		rows.forEach(function(row){
			table.append(row.html);
		});
	});
})