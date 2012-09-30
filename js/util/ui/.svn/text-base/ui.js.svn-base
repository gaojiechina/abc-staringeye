currentPage = "one";

function androidgoback(){
	if(currentPage == "one"){
		android.toExit();
	}else if(currentPage == "two"){
		gotopage_one();
	}else if(currentPage == "three"){
		leaveWarning();
	}else if(currentPage == "popup"){
		return_login();
	}else if(currentPage == "help"){
		gotopage_one();
	}else if(currentPage == "login"){
		return_to_one_from_login();
	}else if(currentPage == "editioninfo"){
		return_to_one_from_editioninfo();
	}else if(currentPage == "register"){
		return_to_login_from_register();
	}else if(currentPage == "chooseavatar"){
		return_to_register_from_chooseavatar();
	}else if(currentPage == "newroom"){
		return_to_two_from_newroom();
	}
}

function gotopage_one(){
	currentPage = "one";
	$.mobile.changePage($('#one'), 
	{
		transition : 'fade'
	}, true, true);
}

function gotopage_two(){
	currentPage = "two";
	$.mobile.changePage($('#two'), 
	{
		transition : 'fade'
	}, true, true);
}

function show_login(){
	currentPage = "login";
	$('#backtable').hide(0);
	$('#loginwindow').fadeIn(200);
}

function return_to_one_from_login(){
	currentPage = "one";
	$('#loginwindow').fadeOut(200);
	$('#backtable').show(0);
}

function show_editioninfo(){
	currentPage = "editioninfo";
	$('#backtable').hide(0);
	$('#aboutwindow').fadeIn(200);
}

function return_to_one_from_editioninfo(){
	currentPage = "one";
	$('#aboutwindow').fadeOut(200);
	$('#backtable').show(0);
}

function show_register(){
	currentPage = "register";
	$('#Registrationwindow').fadeIn(200);
}

function return_to_login_from_register(){
	currentPage = "login";
	$('#Registrationwindow').fadeOut(200);
	regAvatarId=0;
}

function show_chooseavatar(){
	currentPage = "chooseavatar";
	$('#PictureChoice').fadeIn(200);
}

function return_to_register_from_chooseavatar(){
	currentPage = "register";
	$('#PictureChoice').fadeOut(200);
	regAvatarId=0;
}

function show_newroom(){
	currentPage = "newroom";
	$('#newroomwindow').fadeIn(200);
}

function return_to_two_from_newroom(){
	currentPage = "two";
	$('#newroomwindow').fadeOut(200);
	regAvatarId=0;
}

function gotopage_three(){
	currentPage = "three";
	$.mobile.changePage($('#three'), 
	{
		transition : 'fade'
	}, true, true);
}

function gotopage_popup(){
	currentPage = "popup";
	$.mobile.changePage($('#popup'), 
	{
		transition : 'fade'
	}, true, true);
}

function return_login(){
	$.mobile.changePage($('#one'), 
	{
		transition : 'fade'
	}, true, true);
	$('#Registrationwindow').css("display","none");
	currentPage = "login";
}


function gotopage_help(){
	currentPage = "help";
	$.mobile.changePage($('#help'), 
	{
		transition : 'fade'
	}, true, true);
}

function container_add(s){
	var element = document.getElementById("container");
	element.innerHTML= s;
	$("#textContainer").css("display", "block");

}

function container_fadein(){
	$("#textContainer").fadeIn(200);
}

function container_fadeout(){
	$("#textContainer").fadeOut(200);
}

function container_intime(a,b){
	
	$("#textContainer").fadeIn(a);
	$("#textContainer").fadeOut(b);

}

function game_over_dis(player, real_score){
	if( player == null || player.length == 0 || real_score == null ){
		return;
	}
	
	var innerHtml = "<span style=\"display: inline-block; position: absolute; height: 50px; width: 120px; left: 0; border-right: 1px solid #777;\">头像<table width=\"100%\" style=\"text-align: center;\">";
	innerHtml += "<table width=\"100%\" style=\"text-align: center;\">";
	var urls = "";
	for( i in player ){
		if(player[i].userInfo.avatarId < 10 ){
			urls = "js/images/head/head0"+ player[i].userInfo.avatarId+".png";
		}else{
			urls = "js/images/head/head"+ player[i].userInfo.avatarId+".png";
		}
		innerHtml += "<tr><td width=\"100%\"><img src="+urls+" width=\"40\" /></td></tr>";
		
		if(player[i].userInfo.uid == userInfo.uid){
			updatemyscore(player[i].userInfo.score);
		}
	}			
	
	innerHtml += "</table></span><span style=\"display: inline-block; position: absolute; height: 50px; left: 120px; right: 220px; border-right: 1px solid #777;\">昵称<table width=\"100%\">";
							
	for( i in player ){
		innerHtml += "<tr><td style=\"color:\"width=\"50\">"+player[i].userInfo.niname+"</td></tr>";
	}
							
	innerHtml += "</table></span><span style=\"display: inline-block; position: absolute; height: 50px; width: 120px; right: 100px; border-left: 1px solid #777;\">本局得分<table width=\"100%\">";
	
	for( i in real_score ){
		innerHtml += "<tr><td width=\"50\">"+real_score[i]+"</td></tr>";
	}					
								
	innerHtml += "</table></span><span style=\"display: inline-block; position: absolute; height: 50px; width: 100px; right: 0; border-left: 1px solid #777;\">资产<table width=\"100%\">";
	
	for( i in player ){
		innerHtml += "<tr><td width=\"50\">"+player[i].userInfo.score+"</td></tr>";
	}
	
	innerHtml += "</table></span>";
	
	container_add("本局结束");
	
	container_intime(200, 500);
	
	$('#game_over_content').html(innerHtml);
	$('#game_over').fadeIn(1000);

}

function click_game_over(){
	
	if(isLocal == true){
		$('#game_over').fadeOut(200);
		refreshLocalGame();
		return false;
	}
	
	resetUi4NextGame();
	$('#game_over').fadeOut(200);$('#backtable').show(0);return false;
}

function add_warning_text(S){
	var element = document.getElementById("warning_text");
	element.innerHTML= S;
	$("#warningwindow").css("display", "block");
}
